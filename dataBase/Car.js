const {Schema,model, Types} = require('mongoose');

const carSchema = new Schema({
    model: {type: String, require: true, default: '', trim: true},
    year: {type: Number, require: true, trim: true},
    price:{type: Number, require: true, trim: true},
    user: {type: Types.ObjectId, ref: 'User'}
}, {
    timestamps: true
});

module.exports = model('Car', carSchema);