// import Libraries
import mongoose from "mongoose";

// User Schema
const OptionsSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    option:
    {
        type: String
    },
    hosting:
    {
        type: String
    },
    hostingOptions:
    {
        type: String
    },
}, { timestamps: true });


export const OptionsModel = mongoose.model("Options", OptionsSchema);