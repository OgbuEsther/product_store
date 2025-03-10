//import 
const mongoose = require("mongoose")


const userSchema = new mongoose.Schema({
    name: {
      type: String,
     },
    email: {
       type: String,
 
      },
    password: {
       type: String ,
    
      },
      Products : [
        {type : mongoose.Schema.Types.ObjectId ,
          ref : "Products"
        }
      ],
   
  });
  
 module.exports = mongoose.model('User', userSchema);
  