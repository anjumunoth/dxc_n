const { response } = require("@hapi/hapi/lib/validation");
var express=require("express");
const { request } = require("http");
var path=require("path");
var morgan=require("morgan");
var fs=require("fs");

var productRouter=require("./routes/productRoute.js");


var app=express();
var empArr=[{empId:101,empName:"Asha",salary:1001,deptId:"D1"},
{empId:102,empName:"Gaurav",salary:2000,deptId:"D1"},
{empId:103,empName:"Karan",salary:2000,deptId:"D2"},
{empId:104,empName:"Kishan",salary:3000,deptId:"D1"},
{empId:105,empName:"Keshav",salary:3500,deptId:"D2"},
{empId:106,empName:"Pran",salary:4000,deptId:"D3"},
{empId:107,empName:"Saurav",salary:3800,deptId:"D3"}]

var writeStream=fs.createWriteStream("log.txt");


console.log("Express app")
const port=3000;

// middleware
// inbuilt middleware
app.use(express.static("public"));

app.use(express.json());

function firstMiddleware(req,res,next){
    console.log("First Middleware");
    req.name="shoppingcart";
    console.log(`Request Url : ${req.url}, Method : ${req.method}` );
// last statement of every custom middleware should be a next() if u want to go ahead with the routing    
    next();
}
// custom middleware
app.use(firstMiddleware)
app.use(morgan("combined"));
// custom middleware log into a log file
app.use(function(request,response,next){
    writeStream.write(`Request url: ${request.url} ; Method: ${request.method}`);
    next();
})

app.use(function(request,response,next){
    setTimeout(()=>{
        console.log("Middleware2");
        // check here for authentication token expiry
        next();
    },1000);
   
})
app.use(function(request,response,next){
    console.log("Middleware3");
    next();
})


app.use("/product",productRouter);

//handle the request
app.get("/",(request,response)=>{
    // send the index.html
    //http server -- read the file and send it
    console.log("Request name",req.name);
    var filePath=path.join(__dirname,"public","index.html");
    response.sendFile(filePath);
})
app.get("/employee",(request,response)=>{
    // give the empArr as response
    response.json(empArr);
})
app.post("/employee",(request,response)=>{
    // data is coming in the body section
    // http server -- worked with the request read stream and worked with 2 events : data and end
    // expecting to be data in json format 
    var insertEmpRecord=request.body;
    empArr.push(insertEmpRecord);
    response.json(empArr);
})

// // handle the get request to /login ; response -- login.html
app.get("/login",(request,response)=>{
    // send the index.html
    //http server -- read the file and send it
    var filePath=path.join(__dirname,"public","login.html");
    response.sendFile(filePath);
})




app.listen(port,(err)=>{
    if(err)
        {
            console.log("Error",err)
        }
        else
        {
            console.log(`Server is listening at http:localhost:${port}`);
        }
})