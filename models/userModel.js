const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    id:{
        type:String,
        required:true,
        unique:true
    },
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    passowrd:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    }
})

const users = mongoose.model("users",userSchema)

module.exports = users