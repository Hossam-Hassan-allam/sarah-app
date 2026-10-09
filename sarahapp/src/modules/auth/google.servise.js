
import { verifyGoogleToken } from "../../utiles/verfiygoogle.js";
import {User} from "../../DB/models/user.model.js"; // مسار موديل المستخدم الخاص بك
import jwt from "jsonwebtoken";

export async function googleLogin(req, res, next) {
    try {
        const { token } = req.body;

        if (!token) {
            return res.status(400).json({ message: "Google token is required" });
        }

        // 1. التحقق من الـ Token عبر Google Service
        const googleUser = await verifyGoogleToken(token);
        const { sub: googleId, email, name } = googleUser;

        // 2. البحث عن المستخدم في قاعدة البيانات
        let user = await User.findOne({ where: { googleId } });

        if (!user) {
            // التحقق مما إذا كان البريد مسجلاً سابقاً بكلمة سر عادية
            user = await User.findOne({ where: { email } });

            if (user) {
                // ربط حساب Google بالحساب الحالي
                user.googleId = googleId;
                await user.save();
            } else {
                // 3. إنشاء مستخدم جديد (Register)
                user = await User.create({
                    name: name || "Google User",
                    email: email,
                    googleId: googleId,
                    password: null // لا نحتاج كلمة سر للحسابات المسجلة عبر Google
                });
            }
        }

        // 4. إنشاء JWT الخاص بتطبيقك
        const appToken = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        // 5. إرجاع النتيجة
        return res.status(200).json({
            message: "Google login successful",
            token: appToken,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        console.error("Google Authentication Error:", error);
        return res.status(401).json({ message: "Invalid or expired Google token" });
    }
}