const express = require('express');
const dotenv = require('dotenv');
const chats = require('./data');
const connectDB = require('./config/db');
const colors = require("colors");
const userRoutes = require('./routes/userRoutes');

// .env configuration
dotenv.config();

//connecting the database
connectDB();

const app = express();

// To accept the json data from the frontend
app.use(express.json());



const PORT = process.env.PORT || 5000;

// api
app.get('/',(req,res)=>{
    res.send("API is running!");
});

app.use('/api/user',userRoutes)


// app.get("/api/chat/:id",(req,res)=>{
//     const singleChat = chats.find((c)=>c._id == req.params.id);
//     res.send(singleChat);
// });


app.listen(5000,console.log(`Server running on port ${PORT}`.yellow.bold));