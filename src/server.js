import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import User from "./models/login.js";
import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt";
import Cookies from "js-cookie";

const app = express();
const port = 5001;

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/")
.then(() => {
    console.log("Connected to database");
})

import passwordRouter from './routes/passwords.js'
app.use('/password', passwordRouter);

app.get('/', async(req, res) => {
    const users = User.find;
    console.log(users);
})

app.post('/register', async(req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({username: username, password: hashedPassword});
        await newUser.save()
        res.json({message: "Successfully registered user"});
    }
    catch (err) {
        console.error(err);
        res.json({message: "Something went wrong in registering the user"});
    }
})

app.post('/login', async(req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;

        const user = await User.findOne({username: username});
        if (!user) {
            res.status(400).json({message: "User not found"})
            return;
        }
        
        console.log(`${user.password} is user password`)
        const checkIfMatch = await bcrypt.compare(password, user.password);
        console.log(checkIfMatch);
        if (!checkIfMatch) {
            res.status(400).json({message: "Password is incorrect"});
            return;
        }
        const token = jwt.sign({userId: user._id}, "eg_secret", {expiresIn: "1h"});
        res.json({token});
    }
    catch (err) {
        res.status(500).json({message: "Something went wrong"});
    }
})



app.listen(port, (req, res) => {
    console.log(`Server listening on port ${port}`);
})
