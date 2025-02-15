const mongoose = require('mongoose');


const DB="mongodb+srv://guptayash0311:screamer@cluster0.07mcw.mongodb.net/Authusers?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(DB,{
}).then(()=> console.log("Database Connected.")).catch((error)=> {console.log(error);})