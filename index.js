const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require("./routes/userRoute");
const productRoute = require('./routes/productRoute');

const cors = require('cors');


const app = express();
const port = 3000
app.use(cors());

app.use(express.json());

app.use("/auth" , userRoutes)
app.use("/products" , productRoute)

app.get("/" , (req , res)=>{
    res.send("api is ready!!!")
})

const live_Uri = "mongodb+srv://Esther:Esther2004@cluster0.byfqhoj.mongodb.net/product-store?retryWrites=true&w=majority&appName=Cluster0"
const local_URI = "mongodb://localhost:27017/userAuth"

mongoose.connect(local_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.error("Connection Error: ", err));




app.listen(port, () => console.log('Server running on port 3000'));
