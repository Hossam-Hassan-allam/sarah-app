import cloudinary from "../../../config/cloudinary.js"
import fs from "fs/promises";
import path from "path";
import { User } from "../../DB/models/user.model.js"
import { checkPassword, hashPassword } from "../../utiles/hash.js";
import { uploadImage } from "../../utiles/uploadToCloude.js"
export async function deleteuser(req,res,next) {
const user=await User.findOneAndDelete({email:req.UserData.email})
if(user.profileImage){
user.profileImageId? await cloudinary.uploader.destroy(user.profileImageId):await fs.unlink(`uploads/${user.profileImage}`)
}
res.status(200).json({message:"user deleted",success:true})
}
export async function uploadimages(req, res, next) {
  if (req.UserData.profileImage) {
    const oldImagePath = path.join(
      process.cwd(),
      req.UserData.profileImage
    );
    console.log("Trying to delete:", oldImagePath);
    await fs.unlink(oldImagePath);
  }
  await User.updateOne(
    { email: req.UserData.email },
    { profileImage: req.file.path }
  );
  res.status(201).json({
    message: "photo updated success"
  });
}
export async function uploedtocloud(req,res,next) {
  if(!req.file){
  throw new Error("uploud image",{cause:400});
  }
  if(req.UserData.profileImageId){ 
    await cloudinary.uploader.destroy(req.UserData.profileImageId);
  }
  const result=await uploadImage(req.file.buffer);
  const user=await User.findByIdAndUpdate(req.UserData.id,{profileImage:result.secure_url,profileImageId:result.public_id},
{ returnDocument: "after" });
  res.status(200).json({message:"upload image success",image:user.profileImage})
}
export async function updateuser(req, res, next) {
  const { name } = req.body;
  let user
  if(req.file){
    if(req.UserData.profileImageId){ 
    await cloudinary.uploader.destroy(req.UserData.profileImageId);
  }else {if (req.UserData.profileImage) {
    const oldImagePath = path.join(
      process.cwd(),
      req.UserData.profileImage
    );
    console.log("Trying to delete:", oldImagePath);
    await fs.unlink(oldImagePath);
  }}
  const result=await uploadImage(req.file.buffer);
  user=await User.findOneAndUpdate({email:req.UserData.email},{profileImage:result.secure_url,profileImageId:result.public_id,name},{new:true})
  }else user=await User.findOneAndUpdate({email:req.UserData.email},{name:name},
  { returnDocument: "after" })
  res.status(200).json({
    message: "user updated",
    success: true,
    user
  });
}
export async function changepassword(req, res, next) {

  const { oldPassword, newPassword } = req.body;
  const match = await checkPassword(oldPassword,req.UserData.password)
  if (!match) {
    throw new Error("write coorect password");
  }
  const newpass=await hashPassword(newPassword);
  await User.updateOne({email:req.UserData.email},{password:newpass})
  res.status(200).json({
    message: "password changed",
    success: true
  });
}
