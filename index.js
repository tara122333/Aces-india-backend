require("dotenv").config();
require("./database/AllModels");
import ConnectDB from "./database/connection";


// Library
import express from 'express'; // express
import cors from 'cors';  //cors
import helmet from 'helmet';  //helmet


const port = 4000;
const ACES = express();


// Application middleware
ACES.use(express.json());
ACES.use(express.urlencoded({ extended: false }));
ACES.use(helmet());
ACES.use(cors());


ACES.get("/", (req, res) => {
    res.json({ message: "Success" });
});



//server listening
ACES.listen(port, () => {
    console.log(`server has been started on port 4000`);
    ConnectDB().then(() => console.log(`Listening on port ${port}... database has been connected`)).catch((err) => console.log(`database not connected ${err}`));
});