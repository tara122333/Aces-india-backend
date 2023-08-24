// Library
import express from 'express';
import { UserModel } from '../../database/AllModels';
import passport from "passport";


const Router = express.Router();


Router.post("/signup", async (req, res) => {
    try {
        // await ValidSignup(req.body.credentials);
        console.log(req.body.credentials);
        const findByEmail = await UserModel.findOne({ email: req.body.credentials.email });
        if (!findByEmail) {
            const newUser = await UserModel.create(req.body.credentials);
            console.log(newUser);
            const token = newUser.generateAuthToken();
            return res.status(200).json({
                token, message: "user added successfully", status: "success"
            });
        }
        // const newUser = await UserModel.create(req.body.credentials);
        // console.log(newUser);
        // const token = newUser.generateAuthToken();
        return res.status(200).json({
            token, message: "user already added", status: "success"
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});




/*
route      ==> /signin
method     ==> POST
Des        ==> signUp with email and password
params     ==> none
Access     ==> public
*/
Router.post("/signin", async (req, res) => {
    try {
        // await ValidSignin(req.body.credentials);
        const user = await UserModel.findByEmailAndPassword(req.body.credentials);
        const token = user.generateAuthToken();
        return res.json({
            token, user, message: "signin successfully", status: "success"
        });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});






/* 
route      ==> /google
method     ==> GET
Des        ==> Google signin
params     ==> none
Access     ==> public
*/
Router.get("/google",
    passport.authenticate("google", {
        scope: [
            "https://www.googleapis.com/auth/userinfo.profile",
            "https://www.googleapis.com/auth/userinfo.email",
            "https://www.googleapis.com/auth/user.phonenumbers.read"
        ],
    }
    ));


/*
route      ==> /google/callback
method     ==> GET
Des        ==> Google signin callback
params     ==> none
Access     ==> public


*/


Router.get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: "/" }),
    (req, res) => {
        return res.redirect(
            `https://delightful-mermaid-12b15b.netlify.app/google/${req.session.passport.user.user._id}`
        );
    }
);



/* 
route      ==> /github
method     ==> GET
Des        ==> github signin
params     ==> none
Access     ==> public
*/
Router.get("/github",
    passport.authenticate("github", {
        scope: ['']
    }
    ));


/*
route      ==> /github/callback
method     ==> GET
Des        ==> github signin callback
params     ==> none
Access     ==> public


*/

Router.get(
    "/github/callback",
    passport.authenticate("github", { failureRedirect: "/" }),
    (req, res) => {
        return res.redirect(
            `https://delightful-mermaid-12b15b.netlify.app/github/${req.session.passport.user.user._id}`
        );
    }
);

Router.get("/github/repo",
    passport.authenticate("github", {
        scope: ['']
    }
    ));

Router.get(
    "/github/callback/repo",
    passport.authenticate("github", { failureRedirect: "/" }),
    (req, res) => {
        return res.redirect(
            `https://xerocodeeassignment.onrender.com/options/repositories`
        );
    }
);

export default Router;