import express from 'express';
const router = express.Router();
// const passwords = require('./routes/passwords.js');
import Passwords from '../models/passwords.js';


router.get('/:id', getEntry, async (req, res) => {
    res.send(res.entry.username);
})


router.get('/', async (req, res) => {
    try {
        const passwords = await Passwords.find();
        res.json(passwords);
    }
    catch (err) {
        res.status(500).json( {message: err.message} )
    }
})

router.post('/', async (req, res) => {
    const password = new Passwords({
        website: req.body.website,
        username: req.body.username,
        password: req.body.password,
    })

    try {
        const newPassword = await password.save();
        res.status(201).json(newPassword);
    }
    catch(err) {
        res.status(400).json({message: err.message})
    }
})


router.patch('/:id', getEntry, async (req, res) => {
    if (req.body.website != null) {
        res.entry.website = req.body.website;
    }
    if (req.body.username != null) {
        res.entry.username = req.body.username;
    }
    if (req.body.password != null) {
        res.entry.password = req.body.password;
    }

    try {
        const updatedEntry = await res.entry.save();
        console.log(updatedEntry);
        res.json(updatedEntry);
    }
    catch (err) {
        console.error(err);
    }
    
})

router.delete('/:id', getEntry, async (req, res) => {
    try {
        //console.log(res.entry)
        await res.entry.deleteOne() ;
        res.json({message: "Successfully deleted"});
    }
    catch (err) {
        res.status(404).json({message: "something went wrong in delete"})
        console.error(err);
    }

    
})

async function getEntry(req, res, next) {
    let entry;
    try {
        entry = await Passwords.findById(req.params.id);
        
        if (entry == null) {
            return res.status(404).json({message: 'Cannot find entry'});
        }
    }
    catch {
        return res.status(500).json({message: "Something went wrong in getEntry"});
    }

    console.log(entry);
    res.entry = entry;
    next()
}


export default router;
