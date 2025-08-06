const express = require('express');

const app = express();
const PORT = 5000;

const dotenv = require('dotenv');
const path = require('path');

const connectDataBase = require('./config/connectDataBase');

dotenv.config({ path: path.join(__dirname, 'config', 'config.env') });



connectDataBase();


app.listen(PORT,()=>{
    console.log("Server is running in the port 5000");
    
})