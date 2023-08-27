// import Libraries
import mongoose  from "mongoose";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

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
    profilePic : [
        {
            type : String
        }
    ],
    accessToken : {
        type : String
    }
},{timestamps:true});



// Generate Auth Token
UserSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({
        user : this._id.toString(),
    },
    "thisdjbsdkjvbksdjbvksjbvkdsjb"
    )
    return token;
};


// Find Email in Db
UserSchema.statics.findByEmail = async (email) => {
    const user = await UserModel.findOne({ email });
    console.log(user);
    if (!user) throw new Error("Email doesn't exist.");
    return user;
  };
  


//  find email and password in db
UserSchema.statics.findByEmailAndPassword = async ({email,password})=>{
    const user = await UserModel.findOne({email});
    if(!user) throw new Error("Email Does not exist");
    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch) throw new Error("password does not match");
    return user;
};




// pre method in db save data
UserSchema.pre("save",function(next){
    const user = this;
    if(!user.isModified("password")) return next();
    const Round = 8;
    bcrypt.genSalt(Round,(err,salt)=>{
        if(err) return next(err);
        bcrypt.hash(user.password,salt,(err,hash)=>{
            if(err) return next(err);
            user.password = hash;
            return next();
        });
    });
    
});



export const UserModel = mongoose.model("Users",UserSchema);