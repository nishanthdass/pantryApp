'use strict';

const PORT = 4000;
const express = require('express');
const app = express()
const bodyParser = require('body-parser') ;

const childProcess = require("child_process");
const { type } = require('os');

// Middleware
app.use(express.json()) ;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

//let arr = ["Insert-Entries.py"]
//arr.push("chocolate")
//const pythonProcess = childProcess.spawn("python", arr)
//pythonProcess.stdout.on("data", (data) => {
    //const output = JSON.parse(data)
//});


app.get('/:available', async (req, res) => {
    const recipe_script = ["Insert-Entries.py"]
    let ingredients_available = req.params['available']
    let  available_arr = ingredients_available.split(",")
    
    for (let ingredient of available_arr)
        recipe_script.push(ingredient)

    const pythonProcess = childProcess.spawn("python", recipe_script)
    pythonProcess.stdout.on("data", (data) => {
        console.log(data)
        const output = JSON.parse(data)
        console.log(output)
        res.status(200).send(output)
    });
    
});


app.listen(PORT,() => {           
    console.log(`Express Server listening on port ${PORT}`)
    
});