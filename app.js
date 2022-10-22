// Task1: initiate app and run server at 3000
const express = require('express');
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }))

const path = require('path');
app.use(express.static(path.join(__dirname + '/dist/FrontEnd')));

// Task2: create mongoDB connection 

const EmployeeData = require('./model/employee');

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://Blessy93:Leo1983@cluster0.j8lyqnk.mongodb.net/casestudydb?retryWrites=true&w=majority')
    .then(() => {
        console.log("My mongodb is connected")
    })
    .catch(error => {
        console.log("connection error" + error)
    })


//Task 2 : write api with error handling and appropriate api mentioned in the TODO below


//TODO: get data from db  using api '/api/employeelist'

app.get('/api/employeelist', async (req, res) => {
    try {
        const user = await EmployeeData.find();
        res.send(user);
    } catch (error) {
        console.log(error);
    }

})


//TODO: get single data from db  using api '/api/employeelist/:id'

app.get('/api/employeelist/:id', async (req, res) => {
    try {
        const user = await EmployeeData.findById({ _id: req.params.id });
        res.send(user);

    } catch (error) {
        console.log(error);
    }

})


//TODO: send data from db using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

app.post('/api/employeelist', async (req, res) => {
    try {
        let item = req.body;
        const user = new EmployeeData(item);
        const savedUser = await user.save(); //save data to db
        res.send(savedUser);
    } catch (error) {
        console.log(error);
    }

})


//TODO: delete a employee data from db by using api '/api/employeelist/:id'

app.delete('/api/employeelist/:id', async (req, res) => {
    try {
        const getdata = await EmployeeData.deleteOne({ _id: req.params.id });
        res.send();
    } catch (error) {
        console.log(error);
    }
})


//TODO: Update  a employee data from db by using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

app.put('/api/employeelist', async (req, res) => {
    try {
        let id = req.body._id;
        const getdata = await EmployeeData.findByIdAndUpdate({ _id: id }, { name: req.body.name, location: req.body.location, position: req.body.position, salary: req.body.salary });
        res.send();
    }
    catch (error) {
        console.log(error);
    }
})

//! dont delete this code. it connects the front end file.
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});



const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is connected ${PORT}`);
})

