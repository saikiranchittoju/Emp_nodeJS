var express=require('express');
const app=express();
var mysql=require('mysql');

var bodyparser=require('body-parser');
const { builtinModules } = require('module');
const { nextTick } = require('process');

var connect=mysql.createConnection({
    host:'localhost',
    user:"root",
    password:"Kiran@123",
    database: 'employeesdatabase'
});

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));

app.post('/addEmployee/',(req,res,next)=>{

    var data=req.body;
    var firstname= data.firstname;
    var lastname=data.lastname;
    var username=data.username;
    var address=data.address;
    var businesscode=data.businesscode;
    var password=data.password;
    var phone=data.phone;

    connect.query("select * from employeesdata where name=?",[username], function(err,result,fields){
        connect.on('error',(err)=>{
            console.log("[MySQL Error",err);
        });
        
        if(result && result.length){
            res.json("Username already Exists");
        }
        else
        {
            var insert="insert into employeesdata(firstname,lastname,username,address,businesscode,password,phone) values (?,?,?,?,?,?,?)";
            values=[firstname,lastname,username,address,businesscode,password,phone];
            connect.query(insert,values,(err,results,fields)=>{
    connect.on('error',(err)=>{
        console.log("[MySQL Error",err);
    });

    console.log("Employee Registered");
});

connect.query("select * from employeesdata where username=?",[username], function(err,result,fields){
    connect.on('error',(err)=>{
        console.log("[MySQL Error",err);
    });
    if(result && result.length){
        var insert_emp_data="insert into employeesbank(empid,sicknesshr,vacation) values (?,?,?)";
        values=[result[0].id,"15","0"];
        connect.query(insert_emp_data,values,(err,results,fields)=>{
            connect.on('error',(err)=>{
                console.log("[MySQL Error",err);
            });
            console.log("Banks Inserted");
        });
        res.json(result[0]);
    }
});
        }  

});
});

app.post('/addEmployeePay/',(req,res,next)=>{

    var data=req.body;
    var empid= data.empid;
    var date=data.date;
    var amount=data.amount;

    connect.query("select * from employeesdata where id=?",[empid], function(err,result,fields){
        connect.on('error',(err)=>{
            console.log("[MySQL Error",err);
        });
        
        if(result && result.length){
        var insert_emp_pay="insert into employeespay(empid,date,amount) values (?,?,?)";
        values=[empid,date,amount];
        connect.query(insert_emp_pay,values,(err,results,fields)=>{
            connect.on('error',(err)=>{
                console.log("[MySQL Error",err);
            });
            console.log("Pay Inserted");
            res.json(results[0]);
        }); 
    }
     else
        {
            res.json("Username does not Exists");
        }
    });
});

var server=app.listen(4060,()=>{   
    console.log("Server running at http://localhost:4060");
});