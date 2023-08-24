// Library
import express from 'express';
import { UserModel } from '../../database/AllModels';
import passport from 'passport';

const Router = express.Router();


Router.post("/signup", async (req, res) => {
    try {
        const findByEmail = await UserModel.findOne({ email: req.body.credentials.email });
        if (!findByEmail) {
            const newUser = await UserModel.create(req.body.credentials);
            const token = newUser.generateAuthToken();
            return res.status(200).json({
                token, message: "user added successfully", status: "success"
            });
        }
        return res.status(200).json({
            token, message: "user already added", status: "success"
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});




Router.post("/signin", async (req, res) => {
    try {
        const user = await UserModel.findByEmailAndPassword(req.body.credentials);
        const token = user.generateAuthToken();
        return res.status(200).json({
            token, user, message: "signin successfully", status: "success"
        });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

Router.get("/user", async(req,res)=>{
    try {
        const { email, fullname, address } = req.session.passport.user._doc;

        return res.json({ user: { email, fullname, phoneNumber, address } });
    } catch (error) {
        return res.status(500).json({error : error.message});
    }
});



export default Router;
