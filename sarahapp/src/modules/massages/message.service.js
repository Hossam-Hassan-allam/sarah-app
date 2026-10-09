import { Message } from "../../DB/models/message.model.js";
import { User } from "../../DB/models/user.model.js";

export async function sendMessage(req, res, next) {
  
    const { id } = req.params;
    const { content } = req.body;
    if(!content){
    throw new Error("write your mesage");
    }
    // Check receiver exists
    console.log(id);
    
    const user = await User.findById(id);
    if (!user) {
      throw new Error("user not found");
    }

    // Create anonymous message
    const message = await Message.create({
      content,
      receiver: id,
    });

    return res.status(201).json({
      message: "Message sent successfully",
      success: true
    });

  } 
export async function getMyMessages(req, res, next) {
    const messages = await Message.find({
      receiver:req.UserData.id
    }).sort({ createdAt: -1 }).select("content createdAt updatedAt");

    return res.status(200).json({
      success: true,
      messages
    });
  }
export async function deleteMessage(req, res, next) {
const { id } = req.params;
    const message = await Message.findOneAndDelete({
      _id: id,
      receiver: req.UserData.id
    });

    if (!message) {
     throw new Error("message not found",{cause:404});
    }

    return res.status(200).json({
      message: "Message deleted successfully",
      success: true
    });

  }
export async function deleteAllMessages(req, res, next) {
    const result = await Message.deleteMany({
      receiver: req.UserData.id
    });

    return res.status(200).json({
      message: "Messages deleted successfully",
      success: true,
      deletedCount: result.deletedCount
    });
  }
  