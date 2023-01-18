const express = require("express");
const mongoose = require("mongoose");
const booksRoute=require('./route/RootBook')
const cors=require('cors')
require("dotenv/config")
const port = process.env.PORT
const uri=process.env.DB_URI
mongoose.set("strictQuery",false)
mongoose.connect(uri).then(()=>{
    const app = express();
    app.use(cors())
    app.use(express.json());
    app.use('/book',booksRoute)

    app.listen(port, () => console.log(`Server is Running ${port}`));


}).catch(()=>console.error("It could not connect to specified db"))

