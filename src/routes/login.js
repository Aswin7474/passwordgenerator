import express from 'express';
import { JsonWebTokenError } from 'jsonwebtoken'; 
import User from '../models/login';
const bcrypt = require("bcrypt");

const router = express.Router();

router.get("/", async(req, res) => {
    try {
        res.status(200).json({message: "This is a reply"});
    }
    catch (err) {
        res.status(400).json({message: "Something went wrong"});
    }
   
})

router.post('/register', async(req, res) => {
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

router.post('/login', async(req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;

        const user = await User.findOne({username: username});
        
        if (!user) {
            res.status(400).json({message: "User not found"})
            return;
        }
        
        const checkIfMatch = await bcrypt.compare(password, user.password);

        if (!checkIfMatch) {
            res.status(400).json({message: "Password is incorrect"});
            return;
        }

        const token = JsonWebTokenError.sign({userId: user._id}, "eg_secret", {expiresIn: "1h"});
        res.json({token});
    }
    catch (err) {
        res.status(500).json({message: "Something went wrong"});
    }
})

export default LoginRegisterRouter;
