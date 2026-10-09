
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET;

// Create token
export  function createToken(userId) {
    return jwt.sign(
        { id: userId },
        SECRET_KEY,
        { expiresIn: "1h" }
    );
}

// Verify token
export function verifyToken(token) {
    return jwt.verify(token, SECRET_KEY);
}

