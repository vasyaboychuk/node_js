const {Schema, model} = require('mongoose');
const oauthService = require('../service/oauth.service');


const userSchema = new Schema({
    name: {type: String, require: true, default: ''},
    age: {type: Number, default: 18},
    email: {type: String, require: true, trim: true, lowercase: true, unique: true},
    password: {type: String, require: true, trim: true}
}, {
    timestamps: true,
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
})

//віртуальні поля
userSchema.virtual('fullName').get(function (){
    return `${this.name} Boichuk`
})



//STATICS
userSchema.statics = {   //for Schema //THIS-MODEL
    testStatic() {
        console.log('i am static');

    },
     async createWithHashPassword(userObject={}){
         const hashPassword = await oauthService.hashPassword(userObject.password);

         return this.create({...userObject,password:hashPassword})
    }
}
//METHODS
userSchema.methods={    //for single record //THIS - SINGLE RECORD
    testMethod() {
        console.log('i am method');
    },
    async comparePasswords(password){
       await oauthService.comparePasswords(this.password,password)
    }
}
module.exports = model('User', userSchema);