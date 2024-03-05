const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userModel = mongoose.Schema({
    name : {type : String, required: true},  // username of the user
    email : { type: String , required : true, unique: true},
    password : {type: String, required : true},
    pic : {
        type : String,
        default : "https://th.bing.com/th/id/OIP.fqSvfYQB0rQ-6EG_oqvonQHaHa?rs=1&pid=ImgDetMain",
    },
},
{
    timestamps : true,
}
);

userModel.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
};

// hash the password before saving it to the database
userModel.pre('save',async function(next){
    if(!this.isModified('password')){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
});

const User = mongoose.model("User",userModel);
module.exports = User;