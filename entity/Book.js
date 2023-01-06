const mongoose=require('mongoose')
const Publisher=require('../pubb-schema/PublisherSchema')
const Book=mongoose.model('book',new mongoose.Schema({
    title:{
        type:String,
        required:true,
        max:30
    },
    publish_yr:{
        type:String

    },
    publisher:Publisher,
    ISBN:{
        type:String,
        max:5
    }
}))
module.exports=Book