// Library
import express from 'express';
import { OptionsModel, UserModel } from '../../database/AllModels';


const Router = express.Router();


/*
route      ==> /signup
method     ==> POST
Des        ==> signUp with email and password
params     ==> none
Access     ==> public
*/
Router.post("/selected/:_id", async (req, res) => {
    try {
        const { _id } = req.params;
        const { option, hosting, hostingOptions } = req.body;
        console.log(option);
        const userData = await UserModel.findOne({ _id });
        if (userData) {
            const selectedOptionsData = await OptionsModel.findOne({ user: _id });
            if (selectedOptionsData) {
                return res.status(200).json({ message: "user already selected options", selectedOptionsData });
            }
            else {
                const selectedOptions = await OptionsModel.create({
                    user: _id,
                    option: option,
                    hosting :  hosting,
                    hostingOptions : hostingOptions
                });
                if (selectedOptions) {
                    return res.status(200).json({ message: "success", selectedOptions });
                }
                return res.status(203).status.json({ message: "Not stored" });
            }
        }
        return res.status(201).json({
            message: "user already selected options", status: "success"
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});


export default Router;