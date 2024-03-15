const expressAsyncHandler = require("express-async-handler");
const Message = require("../models/messageModel");
const User = require("../models/userModel");
const Chat = require("../models/chatModel");

const sendMessage=expressAsyncHandler(async(req,res)=>{
    const {content,chatId} = req.body;
    if(!content || !chatId){
        res.status(400);
        throw new Error("Please provide all the details");
    }

    var newMessage = {
        sender : req.user._id,
        content : content,
        chat : chatId,
    };

    try {
        var message = await Message.create(newMessage);
        message = await message.populate("sender","name pic");
        message = await message.populate("chat");
        message = await User.populate(message,{
            path: 'chat.users',
            select: "name pic email",
        });

        var temp =await Chat.findByIdAndUpdate(req.body.chatId,{
            latestMessages: message,
        });
        // console.log(temp);
        res.json(message);
    } catch (error) {
        res.status(400)
        throw new Error(error.message);
    }
});

module.exports = {sendMessage};