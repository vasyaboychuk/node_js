const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    name: {type: String, require: true, default: ''},
    age: {type: Number, default: 18},
    email: {type: String, require: true, trim: true, lowercase: true, unique: true},
    password:{type:String,require:true,trim:true}
}, {
    timestamps: true
})

module.exports = model('User', userSchema);