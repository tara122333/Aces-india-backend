require("dotenv").config();
require("./database/AllModels");
import ConnectDB from "./database/connection";


// Library
import express from 'express'; // express
import cors from 'cors';  //cors
import helmet from 'helmet';  //helmet
import passport from 'passport'; //passport
const session = require('express-session') // session


const port = 4000;
const App = express();


import googleAuthConfig from "./config/google.config"; 
import githubAuthConfig from './config/github.config';
import routeConfig from "./config/route.config";



App.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'bla bla bla' 
  }));

// Application middleware
App.use(express.json());
App.use(express.urlencoded({ extended: false }));
App.use(helmet());
App.use(cors());
App.use(passport.initialize());
App.use(passport.session());


googleAuthConfig(passport);
githubAuthConfig(passport);
routeConfig(passport);


// importing microservices route
import Auth from './API/Auth';
import Options from './API/user';
import UsersData from './API/UserData';


App.use('/', UsersData);
App.use('/auth', Auth);
App.use('/options', Options);



App.get("/", (req, res) => {
    res.json({ message: "Success" });
});



//server listening
App.listen(port, () => {
    console.log(`server has been started on port 4000`);
    ConnectDB().then(() => console.log(`Listening on port ${port}... database has been connected`)).catch((err) => console.log(`database not connected ${err}`));
});