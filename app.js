const express = require('express');

const app = express();
const PORT = 5000;

const dotenv = require('dotenv');
const path = require('path');

const connectDataBase = require('./config/connectDataBase');

dotenv.config({ path: path.join(__dirname, 'config', 'config.env') });
const authRoute = require('./routes/authRoute');
const potRoute = require('./routes/potRoute');

connectDataBase();
const cors = require('cors');
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/v1', authRoute);
app.use('/api/v1', potRoute);
app.listen(PORT,()=>{
    console.log("Server is running in the port 5000");
    
})