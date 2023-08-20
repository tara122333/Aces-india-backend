// import Libraries
import mongoose from 'mongoose'

// User Schema
const UserSchema = new mongoose.Schema({
    fullname : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
    },
    password : {
        type : String,
    },
    verified : {
        type : Boolean,
        default : false,
    },
    address : [
        {
            type : String
        }
    ],
    phoneNumber : [
        {
            type : Number
        }
    ],
    profilePic : [
        {
            type : String
        }
    ],
},{timestamps:true});

export const UserModel = mongoose.model("Users",UserSchema);