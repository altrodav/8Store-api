const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
name: { 
    type: String, 
    required: true 
},
mobileNumber: { 
    type: String, 
    required: true
},
address: {
    type: String,
    required: true,
},
nearByLocation:{
    type: String,
    required: true,
},
city:{
    type: String,
    required: true,
},
walletAmount:{
    type: String,
    required: false,
    default:0,
},
referralCode:{
    type: String,
    required: true,
},
pincode:{
    type: Number,
    required: true,
},
},
{
    timestamps:true,
    versionKey:false,
},


);

module.exports = mongoose.model("userData",userSchema);