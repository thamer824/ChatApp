const express = require('express');
const path  = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoute');
const messagesRoute = require('./routes/messagesRoute');
const app = express();
const socket = require("socket.io");
require('dotenv').config();// sehla
//app.use(cors()); // This policy is used to secure a certain web server from access by other website or domain
app.use(express.json());
app.use("/api/auth",userRoutes);
app.use("/api/messages",messagesRoute); 
// mongoose.connect(process.env.MONGO_URL,{
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// }).then(()=>{console.log('connected db')});

const whitelist = ['http://localhost:3000', 'https://reactappie.herokuapp.com'];
const corsOptions = {
  credentials: true, // This is important.
  origin: (origin, callback) => {
    if(whitelist.includes(origin))
      return callback(null, true)

      callback(new Error('Not allowed by CORS'));
  }
}

app.use(cors(corsOptions));






const mongo = async()=>{
    try {
        const con = await mongoose.connect(process.env.MONGO_URL,{
            useNewUrlParser:true,//The underlying MongoDB driver has deprecated their current connection string parser. Because this is a major change, they added the useNewUrlParser flag to allow users to fall back to the old parser if they find a bug in the new parser 
            useUnifiedTopology: true, //Set to true to opt in to using the MongoDB driver's new connection management engine
            // useFindAndModify:false,
            // useCreateIndex:true
        })
        console.log(`Mongo Connected on : ${con.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
} 
mongo();


if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = process.env.PORT || 5000
const server = app.listen(PORT, () =>{
    console.log('Server is running on port', PORT)
});


// this is haw we do a sockets connection
//CORS is shorthand for Cross-Origin Resource Sharing. It is a mechanism to allow or restrict requested resources on a web server depend on where the HTTP request was initiated. This policy is used to secure a certain web server from access by other website or domain
const io = socket(server,{ 
    cors:{
        origin:"http://localhost:3000",
        credentials: true,
    }
});

// l Map HEDI testori feha chtheb weli testorih yetstora bl tartiib
global.onlineUsers = new Map();
// first we had the conneection and whenever there is a conenction will store the chat socket inside the gloal chatsocket and now wehnever we emit adduser from the frontend whnever the user is loged.in will establis a socket cnx by add usr so will grab the suer id and the current socket id and will set it inside the map 

io.on("connection",(socket)=>{
    global.chatSocket = socket;
    socket.on("add-user",(userId)=>{
        onlineUsers.set(userId,socket.id);
    })
    // grab data
    // whener this is emited we will pass data which have the to first we check if the msg is get from an nline user if its online then we emmi the msg to user by msg receive event or it will be stored the data base w kenouu online it be stored in the dataabse and u will get the msg fisaa zeda 
 socket.on("send-msg",(data)=>{
    const sendUserSocket = onlineUsers.get(data.to)
    if(sendUserSocket){
        socket.to(sendUserSocket).emit("msg-receive",data.message);
    }
 })
}) 