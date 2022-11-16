const express = require('express');

const userDb = require('./dataBase/users');

const app = express();

//ці дві строки коду знизу для того щоб запрацював парсинг вхідних даних json
app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.get('/',(req,res)=>{
    res.json('Hello world')
})

app.get('/users',(req,res)=>{
    // console.log('users endpoint!');
    // res.json({name:'vasyl',age:24})
    res.json(userDb)
})
// app.get('/users/1',(req,res)=>{
//     res.json(userDb[0])
// })
// app.get('/users/2',(req,res)=>{
//     res.json(userDb[1])
// })
app.get('/users/:userId',(req,res)=>{
    // console.log(req.params);
    const {userId} = req.params;
    res.json(userDb[userId])
})

app.get('/cars',(req,res)=>{
    res.json({model:'bmw',price:20000})
})

//тут ми створюємо нових юзерів
app.post('/users',(req,res)=>{
    const userInfo = req.body;
    console.log(userInfo);

    userDb.push(userInfo)
    res.status(201).json('created')
})
app.put('/users/:userId',(req,res)=>{
    const newUserInfo = req.body;
    const userId=req.params.userId;

    userDb[userId] = newUserInfo;

    res.json('updated')
})


app.listen(5000 ,()=>{
    console.log('server listen 5000')

})