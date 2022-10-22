const mongoose=require('mongoose'); //Initialization

//schema definition
const Schema=mongoose.Schema;

const Employee_Detail=new Schema({

    name:String,
    location:String,
    position:String,
    salary:Number

})
const EmployeeData=mongoose.model('employee',Employee_Detail);

module.exports=EmployeeData;
