const express = require("express");
const mongoose = require("mongoose");
const booksRoute=require('./route/RootBook')
require("dotenv/config")
const port = process.env.PORT;
const uri=process.env.DB_URI
mongoose.set("strictQuery",false)
mongoose.connect(uri).then(()=>{
    const app = express();
    app.use(express.json());
    app.use('/book',booksRoute);

    app.listen(port, () => console.log(`Server is Running ${port}`));


}).catch(()=>console.error("It could not connect to specified db"))

