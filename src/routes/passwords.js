import express from 'express';
const router = express.Router();
import Passwords from '../models/passwords.js';

router.get('/:username', async (req, res) => {
    console.log("did we get here")
    console.log(req.params.username);
    try {
        const passwords = await Passwords.find({owner: req.params.username});
        res.json(passwords);
    }
    catch (err) {
        res.status(500).json( {message: err.message} )
    }
})


router.post('/', async(req, res) => {

    const user = await Passwords.findOne({owner: req.body.owner})
    console.log(user)

    try {
        if (!user) {
            const password = new Passwords({
                owner: req.body.owner,
                websites: {
                    name: req.body.website.name,
                    username: req.body.username,
                    password: req.body.password
                }
            })
            const newPassword = await password.save();
            res.status(201).json(newPassword);
        }
        else {
            user.websites.push({
                name: req.body.website.name,
                username: req.body.username,
                password: req.body.password
            });

            await user.save();
            return res.status(201).json(user);
        }
    }
    catch(err) {
        res.status(400).json({message: err.message});
    }

})


router.patch('/:owner/:websiteId', async (req, res) => {
    const owner = req.params.owner;
    const websiteId = req.params.websiteId;

    try {
        const user = await Passwords.findOne({owner});

        const website = user.websites.id(websiteId);

        if (!website) {
            res.json({message: "Website not found"});
        }

        website.name = req.body.website.name;
        website.username = req.body.username;
        website.password = req.body.password;

        await user.save();
        res.json({message: "Succesfully updated"})
    }
    catch(err) {
        console.error(err);
        res.json({message: "Something went wrong in updating"});
    }
    
})

router.delete('/:owner/:websiteId', async (req, res) => {
    try {
        const owner = req.params.owner;
        const websiteId = req.params.websiteId;

        let user = await Passwords.findOne({ owner });

        if (!user) {
            return res.status(404).json({message: "User not found"});
        }

        const initialLength = user.websites.length;
        user.websites = user.websites.filter((site) => site._id.toString() !== websiteId);

        if (user.websites.length === initialLength) {
            return res.status(404).json({message: "Website not found"});
        }

        if (user.websites.length === 0) {
            await Passwords.deleteOne({owner});
            return res.json({message: "User deleted since no more remaining websites"});
        }
        else {
            await user.save();
            return res.json({message: "Website succesfully deleted"})
        }
    }
    catch(err) {
        console.log('error at line 123');
        console.error(err);
        res.status(500).json({ message: "Something went wrong while deleting" });
    }

    
})



export default router;
