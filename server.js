require('dotenv').config();
const routes = require('./router/router');
const express = require('express');
const app = express()
const cors = require('cors')
app.use(express.json());
app.use(cors());

app.listen(5000, () => {
    console.log(`Server Started at ${5000}`)
})

// Creating database environmemt

const mongoose = require('mongoose');
// const mongoString = process.env.DATABASE_URL;


mongoose.connect("mongodb+srv://Farheen-1:farheen112@cluster0.yrubhvf.mongodb.net/data");
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
    console.log(process.env.DATABASE_URL);
})

// Creating sechema for database to send the data 

const teacherSchema = new mongoose.Schema({
    userName: {
        required: true,
        type: String
    },
    password : {
        required : true,
        type : String
    }
})

// Defining model

const teacherModel = mongoose.model('Data', teacherSchema , "Students")

// Creating data (create method by using post request)

app.post('/', async (req, res)=>{
    
const dataSaved = teacherModel({

    userName : req.body.userName,
    password : req.body.password
})
try{
   savingData = await dataSaved.save()
    res.send(savingData)
}
catch{
res.send("Something went wrong")
}

})

app.get('/:id', async (req, res) => {
    try{
      dataRead = await teacherModel.findById(req.params.id);
      res.json(dataRead)
    }
    catch(error){
        res.send("Something went wrong")
    }
})

app.patch('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await teacherModel.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.send("Something went wrong")
    }
})

app.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await teacherModel.findByIdAndDelete(id)
        res.send(`Document with ${data.userName} has been deleted..`)
        
    }
    catch (error) {
        res.send("Something went wrong")
    }
})




