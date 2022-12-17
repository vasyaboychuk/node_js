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


app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use(fileUpload());

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerJson));

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
    cronRunner()
})