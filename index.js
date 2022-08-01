const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");
const { application } = require("express");


//parse application/json
app.use(bodyParser.json());

//create database connection 
const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "crud"
});

conn.connect((err)=>{
    if(err) throw err;
    console.log("MYSQL Connected");
});


//create a new record
app.post("/api/create", (req,res)=>{
    let data = { name : req.body.name, location : req.body.location, salary : req.body.salary};
    let sql = "Insert into employees set ?";
    let query = conn.query(sql,data,(err, result)=>{
        if(err) throw err;
        res.send(JSON.stringify({status: 200, error: null, response: "New record added successfully"}));
    });
});

//Show all records
app.get("/api/view", (req,res)=>{
    let sql = "Select * from employees";
    let query = conn.query(sql,(err, result)=>{
        if(err) throw err;
        res.send(JSON.stringify({ status: 200 , error: null, respons: result }));
    });
});

//show a single record
app.get("/api/view/:id",(req,res)=>{
    let sql = "Select * from employees where id="+ req.params.id;
    let query = conn.query(sql,(err, result)=>{
        if(err) throw err;
        res.send(JSON.stringify({status: 200, error: null, response: result }));
    });
});


//Update a record
app.put("/api/update",(req,res)=>{
    let sql = "Update employees set name = '"+req.body.name+"', location='"+req.body.location+"', salary = '"+req.body.salary+"' Where id = "+req.body.id;
    let query = conn.query(sql, (err, result)=>{
        if(err) throw err;
        res.send(JSON.stringify({status: 200, error: null, response: "Record updated successfully"}));
    });
});

//Delete a record
app.delete("/api/delete/:id",(req,res)=>{
    let sql = "Delete from employees where id="+req.params.id;
    let query = conn.query(sql,(err,result)=>{
        if(err) throw err;
        res.send(JSON.stringify({status: 200, error: null, response:"Record Deleted Successfully"}));
    });
});

app.listen(3000, ()=>{
    console.log("Server started on port 3000");
});