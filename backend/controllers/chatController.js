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

const createGroup = asyncHandler(async(req,res)=>{
    if(!req.body.users || !req.body.name){
        return res.status(400).send({message : `Please fill all the details ${req.body}`});
    }

    var users = JSON.parse(req.body.users);

    if(users.length<2){
        return res.status(400).send({message : "Please add more than 2 users"});
    }

    // curr user
    users.push(req.user);

    try {
        const groupChat = await Chat.create({
            chatUser : req.body.name,
            users:users,
            isGroupChat:true,
            groupAdmin : req.user,
        });

        // populating the users and group admin in new group chat
        const fullChat = await Chat.findOne({_id:groupChat._id})
        .populate("users","-password")
        .populate("groupAdmin","-password");
        
        res.status(200).send(fullChat);
    } catch (error) {
        res.status(400);
        throw new Error(`Group not created : ${error}`);
    }
});


module.exports = {accessChat,getChats,createGroup};