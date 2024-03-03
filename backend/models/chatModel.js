const mongoose = require('mongoose');

const chatModel = mongoose.Schema(
    {
        chatUser:{type:String,trim:true},
        isGroupChat : {type:Boolean, default:false},
        users: [{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        },
    ],
    latestMessages : {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Message",
    },
    groupAdmin:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    },
    {
        timeStamps : true,
    }
)

const Chat = mongoose.model("Chat",chatModel);

module.exports = Chat; 

// chatName
// isGrp Chat
// GRp admin
// grp members

