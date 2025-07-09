const express = require("express")
const cors = require("cors");
const mongoose = require("mongoose");
// const session = require('express-session');
const userRoutes = require("./routes/userRoutes");
const app = express();


require("dotenv").config();

import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')));

// For any other route, serve index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});


app.use(cors());
app.use(express.json());



mongoose.connect(process.env.MONGO_URL)

.then(()=>{
    console.log("Database Connected");
})
.catch((err)=>{
    console.log("MongoDb connection error",err);
})

app.use("/api/auth",userRoutes);


const server = app.listen(process.env.PORT,()=>{
    console.log(`Server started on Port ${process.env.PORT}`)
})