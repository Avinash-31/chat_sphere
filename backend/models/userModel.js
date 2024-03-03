const mongoose = require('mongoose');

const userModel = mongoose.Schema({
    name : {type : String, required: true},  // username of the user
    email : { type: String , required : true},
    password : {type: String, required : true},
    pic : {
        type : String, 
        required : true,
        default : "https://th.bing.com/th/id/OIP.fqSvfYQB0rQ-6EG_oqvonQHaHa?rs=1&pid=ImgDetMain",
    },
},
{
    timestamps : true
}
);

const User = mongoose.model("User",userModel);
module.exports = User;