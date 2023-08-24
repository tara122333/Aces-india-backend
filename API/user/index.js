// Library
import express from 'express';
import { OptionsModel, UserModel } from '../../database/AllModels';
import axios from 'axios';

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
        const { option, hosting, hostingOptions, intro, steps } = req.body;
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
                    hosting: hosting,
                    hostingOptions: hostingOptions,
                    intro: intro,
                    steps: steps
                });
                if (selectedOptions) {
                    return res.status(200).json({ message: "success", selectedOptions });
                }
                return res.status(203).status.json({ message: "Not stored" });
            }
        }
        return res.status(201).json({
            message: "user already not exist", status: "success"
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

Router.get("/selected/data/:_id", async (req, res) => {
    try {
        const { _id } = req.params;
        const selectedOptionsData = await OptionsModel.findOne({ user: _id });
        if (selectedOptionsData) {
            return res.status(200).json({ message: "user already selected options", selectedOptionsData });
        }
        return res.status(201).json({
            message: "user already not exist", status: "success"
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});


function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}

Router.get('/repositories', ensureAuthenticated, async (req, res) => {
    try {
        const response = await axios.get('https://api.github.com/user/repos', { headers: { Authorization: `Bearer ${req.session.passport.user.accessToken}` } });
        const repositories = response.data;
        res.status(200).json({ repositories });
    } catch (error) {
        return res.status(500).json({ error: error.message });

    }
});

Router.get('/:_id', async (req, res) => {
    const { _id } = req.params;
    try {
        const data = await UserModel.findOne({ _id });
        if (!data) {
            return res.status(201).json({ message: "not found" });
        }
        return res.status(200).json({ data });
    } catch (error) {
        return res.status(500).json({ error: error.message });

    }
});

export default Router;