const asyncHandler = require('express-async-handler');
const Chat = require('../models/chatModel');
const User = require('../models/userModel');

const accessChat = asyncHandler(async(req,res,)=>{
    const { userId } = req.body;
    
    if(!userId){
        console.log("User Id not sent in the params");
        return res.sendStatus(400);
    }

    var isChat = await Chat.find({
        isGroupChat : false,
        $and : [
            {users:{$elemMatch:{$eq:req.user._id}}},
            {users:{$elemMatch:{$eq:userId}}},
        ],
    }).populate("users","-password").populate("latestMessages");

    isChat = await User.populate(isChat,{
        path:'latestMessages.sender',
        select:'name pic email',
    });

    if(isChat.length > 0){
        res.send(isChat[0]);
    }else{
        var chatData = {
            chatName : "sender",
            isGroupChat:false,
            users:[req.user._id,userId],
        };

        try {
            const createdChat = await Chat.create(chatData);
            const fullChat = await Chat.findOne({_id: createdChat._id}).populate("users","-password");
            res.status(200).send(fullChat);
        } catch (error) {
            throw new Error(`Chat not created : ${error}`);
        }
    }
});

const getChats = asyncHandler(async(req,res)=>{
    try {
        const results = await Chat.find({
            users:{$elemMatch:{$eq:req.user._id}},
        })
        .populate("users","-password")
        .populate("groupAdmin","-password")
        .populate("latestMessages")
        .sort({updatedAt:-1});

        await User.populate(results,{
            path:'latestMessages.sender',
            select:'name pic email',
        });

        res.status(200).send(results);
    } catch (error) {
        res.status(400);
        throw new Error(`Chats not found : ${error}`);
    }
});

module.exports = {accessChat,getChats};

module.exports = {accessChat,getChats};