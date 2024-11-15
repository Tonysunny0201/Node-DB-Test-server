const users = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// register
exports.registerController = async (req,res)=>{
    console.log(req.body);
    const {id,firstname,lastname,email,passowrd,phone} = req.body
    console.log(id,firstname,lastname,email,passowrd,phone);
    try{
        const existingUser = await users.findOne({id,email})
        if(existingUser){
            res.status(406).json("You are already registered..")
        }else{
            const enPass = await bcrypt.hash(passowrd,5)

            const newUser = new users({
                id, firstname, lastname, email, passowrd:enPass, phone
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
    }catch(err){
        console.log(err);
    }    
}

// login
exports.loginController = async (req,res)=>{
    const {email,passowrd} = req.body
    console.log(email,passowrd);
    try{
        existingUser = await users.findOne({email})
        if(existingUser){
            const token = jwt.sign({userId:existingUser.id }, process.env.JWTPASSWORD)
            const isMatch = await bcrypt.compareSync(passowrd, existingUser.passowrd)

            if(isMatch){
                res.status(200).json({
                    vUser: existingUser,token
                })
            }else{
                res.status(404).json("Incorrect Password..")
            }
        }else{
            res.status(404).json("Incorrect Email/Password...")
        }
    }catch(err){
        console.log(err);
    }
}

// all users list view
exports.userViewController = async (req,res) => {
    try{
        const allUser =await users.find()

        res.status(200).json(allUser.map(user=>({Firstname:user.firstname, Email:user.email})))
    }catch(err){
        console.log(err);
    }
}

// view user details 
exports.viewUserDetailsController = async(req,res)=>{
    const email =req.body.email
    try{
        const userDetails = await users.find({email})
        
        if(userDetails){
            res.status(200).json(userDetails.map(details=>({Firstname:details.firstname, lastname:details.lastname, email:details.email, phoneNumber:details.phone})))
        }else{
            res.status(404).json("User Not found...")
        }
    }catch(err){
        console.log(err);
    }
}