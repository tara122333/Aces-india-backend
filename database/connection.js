require("dotenv").config();
import mongoose from 'mongoose';
mongoose.set("strictQuery", false);
export default async ()=>{
    return mongoose.connect(process.env.DB_URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
};

