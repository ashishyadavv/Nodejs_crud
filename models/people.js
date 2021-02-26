const mongoose = require('mongoose')

const PeopleSchema = new mongoose.Schema({
    name:{
        required:true,
        type:String,
        trim:true
    },
    email:{
        required:true,
        type:String,
        unique:true,
        trim:true //trim  whitespaces from front
    },
    
    contact:{
        required:true,
        type:Number,
        
        trim:true

    },
    
        
})
const People = mongoose.model('People',PeopleSchema)
module.exports = People
