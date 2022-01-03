const mongoose = require("mongoose");

const regisSchema = new mongoose.Schema({
    EmpID : {
        type:String,
        required:true
       
    },
    Name : {
        type:String,
        required:true
        
    },
    Password : {
        type:String,
        // required:true,
        // unique: true
        
        
       
    },
    CPassword : {
        type:String,
        // required:true,
        // unique: true
             
    }
})


const Registers= new mongoose.model("Registers", regisSchema);

module.exports = Registers;