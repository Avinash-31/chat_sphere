const mongoose = require('mongoose');
const connectDB = async () =>{
    try{
        const conn= await mongoose.connect(process.env.MONGO_URI,{});
        console.log(`Database connection successful ${conn.connection.host}`.cyan.bold);
    }
    catch(err){
        console.log(`Error connecting to the database ${err}`.red.underline);
        process.exit();
    }
};

module.exports = connectDB;