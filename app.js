const http = require('http');
const socketIO = require('socket.io');
const express = require('express');
const mongoose = require('mongoose');
const swaggerUI = require('swagger-ui-express');
const fileUpload = require('express-fileupload');
require('dotenv').config();


const userRouter = require('./router/user.router');
const authRouter = require('./router/auth.router');
const swaggerJson = require('./swagger.json');

const config = require('./config/config');
const {cronRunner} = require("./cron");

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use(fileUpload());

const io = socketIO(server,{cors:'http://localhost:63342'});

io.on('connection',(socket)=>{
    console.log(socket.id);

    console.log(socket.handshake.auth);
    console.log(socket.handshake.query);

    socket.on('message:send', (messageData) => {
        console.log(messageData.text);

        //send one to one event
        //socket.emit('message:new',messageData.text);

        //send event to all except emitter
        // socket.broadcast.emit('message:new',messageData.text)

        //send event to all clients
        io.emit('message:new', messageData.text)
    });

    socket.on('room:join',(roomInfo)=>{
        socket.join(roomInfo.roomId);//socket join room
        // socket.leave(roomInfo.roomId);//socket leave room

        //send to all in room except new member
        // socket.to(roomInfo.roomId).emit('user:room:join',socket.id)

        //send to all room members
        io.to(roomInfo.roomId).emit('user:room:join',socket.id)
    })
})

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerJson));

//для обробки помилок
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message || 'unknown error',
        status: err.status || 500,

    });
})

server.listen(config.PORT, () => {
    console.log(`server listen ${config.PORT}`);
    mongoose.connect(config.MONGO_URL);
    cronRunner()
})