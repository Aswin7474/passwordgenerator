import express from "express";
import cors from "cors";
import mongoose from "mongoose";

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



app.listen(port, (req, res) => {
    console.log(`Server listening on port ${port}`);
    
})
