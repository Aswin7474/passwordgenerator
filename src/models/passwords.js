import mongoose from "mongoose";
    mongoose.connect('mongodb://localhost:27017/');

const passwordSchema = new mongoose.Schema({

    owner: {
        type:String,
        required:true,
        unique: true
    },
    
    website: {
        name: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: false
        }
    },

    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },

    passwordDate: {
        type: Date,
        required: false,
        default : Date.now
    }
});

const Passwords = mongoose.model('Passwords', passwordSchema); 
export default Passwords;
