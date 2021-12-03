const express = require('express')
const mysql = require('mysql2');
const app = express();

var bodyparser = require('body-parser');

app.use(bodyparser.json());

const mysqlConfig = {
  host: "backend-mysql_server-1",
  user: "zeineb",
  password: "secret",
  database: "my_db"
}


let con = null


//check db connection
app.get('/', function (req, res) {
  con =  mysql.createConnection(mysqlConfig);
  con.connect(function(err) {
    if (err) console.log('Database connection failed',error);
    res.send('Successfully connected to Database')
  });
})

//Get all students
app.get('/students',(req,res)=>{
  con =  mysql.createConnection(mysqlConfig);
    con.query('select * from students' , (error,rows)=>{
        if(!error){
            res.send(rows);
        }else{
            console.log(error);
        }
    });
});


//Update db
app.put('/students/:ID',(req,res)=>{
    console.log(req.params.ID);
    // sql query
    let sql = `UPDATE students SET Name = '${req.body.Name}' WHERE ID = '${req.body.ID}' `;
    // run query
    con.query(sql,(error,result)=>{
            if(!error) {
            res.send('student updated');
        }
        else{
            console.log(error);
        }
    });
});


//Insert element into db
app.post('/students',(req,res)=>{
    console.log(req.body);
    // sql query
    let sql = ` INSERT INTO students(ID,Name) VALUES('${req.body.ID}','${req.body.Name}')`;
    // run query
    con.query(sql,(error,result)=>{
            if(!error){
            res.send('student added');
            }
            else{
                console.log(error);
            }
    });
});

//delete element from db
app.delete('/students/:ID',(req,res)=>{
    console.log(req.params.ID);
    //sql query
    let sql = `DELETE FROM students WHERE ID = '${req.body.ID}' `;
    //run query
    con.query(sql,(error,result)=>{
        if(!error){
            res.send('student deleted');
        }
        else{
            console.log(error);
        }
    });
});

app.listen(3000)

console.log("listening on port 3000")
