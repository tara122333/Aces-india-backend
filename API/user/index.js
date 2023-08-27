// Library
import express from 'express';
import { OptionsModel, UserModel } from '../../database/AllModels';
import axios from 'axios';

const Router = express.Router();

Router.post("/selected/:_id", async (req, res) => {
    try {
        const { _id } = req.params;
        const { option, hosting, hostingOptions, intro, steps } = req.body;
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


Router.get('/repositories/:githubId', async (req, res) => {
    try {
        const { githubId } = req.params;
        const findAccessToken = await UserModel.findOne({ _id : githubId });
        if (findAccessToken) {
            const response = await axios.get('https://api.github.com/user/repos', { headers: { Authorization: `Bearer ${findAccessToken.accessToken}` } });
            const repositories = response.data;
            return res.status(200).json({ repositories });
        }
        return res.status(201).json({ message : "user not authenticate" });
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