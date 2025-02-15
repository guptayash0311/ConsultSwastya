const express = require('express')
const app = express()
require("./db/connection");
const router=require("./routes/router");
const cors = require("cors");
const cookiParser = require("cookie-parser")
const port = 8009;

// respond with "hello world" when a GET request is made to the homepage
// app.get('/', (req, res) => {
//   res.status(201).json("Server Created");
// });

app.use(express.json());
app.use(cookiParser());
app.use(cors());
app.use(router);
app.listen(port,()=>{
    console.log(`listening on port : ${port}`);
})