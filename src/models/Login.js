const mongoose = require("mongoose");

const loginSchema = new mongoose.Schema({
    EmpID : {
        type:String,
        // required:true,
        // unique:true
    },
    Password : {
        type:String,
        // required:true,
        // unique:true
    }
})


const Login = new mongoose.model("Login", loginSchema);

module.exports = Login;