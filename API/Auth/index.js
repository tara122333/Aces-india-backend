// Library
import express from 'express';
import { UserModel } from '../../database/AllModels';
import passport from "passport";


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
        return res.json({
            token, user, message: "signin successfully", status: "success"
        });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});


Router.get("/google",
    passport.authenticate("google", {
        scope: [
            "https://www.googleapis.com/auth/userinfo.profile",
            "https://www.googleapis.com/auth/userinfo.email",
            "https://www.googleapis.com/auth/user.phonenumbers.read"
        ],
    }
));


Router.get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: "/" }),
    (req, res) => {
        return res.redirect(
            `https://client-three-hazel.vercel.app/google/${req.session.passport.user.user._id}`
        );
    }
);


Router.get("/github",
    passport.authenticate("github", {
        scope: ['']
    }
));


Router.get(
    "/github/callback",
    passport.authenticate("github", { failureRedirect: "/" }),
    (req, res) => {
        return res.redirect(
            `https://client-three-hazel.vercel.app/github/${req.session.passport.user.user._id}`
        );
    }
);

// Router.get("/github/repo",
//     passport.authenticate("github", {
//         scope: ['']
//     }
//     ));

// Router.get(
//     "/github/repo",
//     passport.authenticate("github", { failureRedirect: "/" }),
//     (req, res) => {
//         return res.redirect(
//             `https://xerocodeeassignment.onrender.com/options/repositories`
//         );
//     }
// );

export default Router;