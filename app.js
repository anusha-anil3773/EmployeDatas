// Task1: initiate app and run server at 3000
const express = require('express');
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))

const mongoose = require('mongoose')
const employeeData = require('./models/employee')

const path=require('path');
app.use(express.static(path.join(__dirname+'/dist/FrontEnd')));

// Task2: create mongoDB connection 

mongoose.connect('mongodb+srv://Anusha37:anusha123@cluster0.bd302zx.mongodb.net/employedata?retryWrites=true&w=majority')
.then(()=>{
    console.log("My mongoDB is connected successfully!!")
})
.catch(error=>{
    console.log('Connection error'+error)
})

//Task 2 : write api with error handling and appropriate api mentioned in the TODO below
//TODO: get data from db  using api '/api/employeelist'
app.get('/api/employeelist', (req,res)=>{
    employeeData.find().then(function(result){
        res.send(result);
    })
})



//TODO: get single data from db  using api '/api/employeelist/:id'

app.get('/api/employeelist/:id',async(req,res)=>{
    employeeData.findOne({"_id":req.params.id}).then(function(result){
        res.send(result);
    }) 
})

//TODO: send data from db using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

app.post('/api/employeelist', async (req,res)=>{

    try{
        let item = req.body;
        console.log(item);
        const user = new EmployeeData(item);
        const savedUser = await user.save();
        console.log('saved data', savedUser);
        res.send(savedUser);
    } catch (error){
        console.log(error);
    }
        
    })

//TODO: delete a employee data from db by using api '/api/employeelist/:id'

app.delete ('/api/employeelist/:id', async (req, res) => {
    try {
        const remove = await employeeData.findByIdAndDelete({_id:req.params.id});
        res.json(remove);
      } catch (error) {
        res.json({ message: error });
      }
});




//TODO: Update  a employee data from db by using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

app.put('/api/employeelist', async (req,res)=>{
    let id = req.body._id
    employeeData.findByIdAndUpdate({"_id":id},{
        $set:{
            name:req.body.name,
            location:req.body.location,
            position:req.body.position,
            salary:req.body.salary
        }
    })
    .then(result=>{
        res.status(200).json({
            updated_details:result
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
    
})

//! dont delete this code. it connects the front end file.
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});

//server connection
const PORT = process.env.port ||3000
app.listen(3000,()=>{
    console.log(`Server is connected in port ${PORT}!`)
})