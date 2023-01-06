const mongoose=require('mongoose')
const PublishSchema=new mongoose.Schema({
    name:String,
    gender:String,
    email:String


})
module.exports=PublishSchema