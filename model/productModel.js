const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    productName : {type: String},

    Price: {type: Number},

    Availability:{type: Boolean} ,

    Category: {type: String},

   
    productImage : {type : String}
    
})

module.exports = mongoose.model("Products", userSchema);

