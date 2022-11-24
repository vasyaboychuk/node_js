const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const userRouter = require('./router/user.router');
const config = require('./config/config');

const app = express();


app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use('/users', userRouter);

//для обробки помилок
app.use((err,req,res,next)=>{
    res.status(err.status || 500).json({
        message: err.message || 'unknown error',
        status: err.status || 500,

    });
})

app.listen(config.PORT ,()=>{
    console.log(`server listen ${config.PORT}`);
    mongoose.connect(config.MONGO_URL);
})