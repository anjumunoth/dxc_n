var express = require("express");
var path = require("path");
var http = require("http");
var socketio = require("socket.io");
var queryString = require("querystring");

var userObj=require("./utils/usersInfo");
var messageObj=require("./utils/messageManagement");

const PORT = 3000;

var app = express();
const server=http.createServer(app);
var io = socketio(server);

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get("/", (request, response)=>{
    var fileUrl = path.join(__dirname, "public", "index.html");
    response.sendFile(fileUrl);
})

app.post("/home", (request, response)=>{
    var userName=request.body.userName;
    var roomName=request.body.roomName;
    console.log("Requsets form login",request.body);
    var temp=queryString.stringify({userName:userName,roomName:roomName});
    // console.log("Inside /home");
    response.redirect("/chat?"+temp);
})

app.get("/chat", (request, response)=>{
    var fileUrl = path.join(__dirname, "public", "chat.html");
    // console.log("Inside /chat");
    response.sendFile(fileUrl);
})

//when a new user joins the chat
io.on("connection",(socket)=>{
    // a new user joining in
    socket.on("joinRoom", (data)=>{
        socket.join(data.roomName);
        console.log("data ",data);
        var obj={userName:data.userName,message:" has joined the room ",roomName:data.roomName};
        userObj.newUserJoin(socket.id,data.userName,data.roomName);
        messageObj.postMessage(obj);
        socket.emit("welcomeUser", "Welcome to the Room");
        console.log("socket details",socket);
        socket.broadcast.emit("modifyUserJoinMessage",obj);
    })
    socket.on("disconnect", ()=>{
        console.log("User has left the room");
        //userObj.removeUser(socket.id,socket);
         var tempUser=userObj.getUser(socket.id);
        if(tempUser)
        {
            var deleteFlag=userObj.removeUser(tempUser);
            if(deleteFlag)
            {
                var obj={userName:tempUser.userName,message:"has left the room",roomName:data.roomName};
                messageObj.postMessage(obj);
                socket.to(tempUser.roomName).broadcast.emit("modifyUserJoinMessage",obj)
            }
            
        } 
    })
    socket.on("message", (obj)=>{
        console.log("Message Recieved", obj);
        messageObj.postMessage(obj);
        io.to(obj.roomName).emit("chatMessage",obj)
        console.log("All messages",messageObj.getAllMessages());
        console.log("All users in the room :");
        userObj.getAllUsers(obj.roomName,(p1)=>{
            if(p1.length ==0)
            {
                console.log("No users in the room");
            }
            else
            {     
                if(p1[0].error)
                {
                    console.log(p1[0].error);
                }           
                else
                    console.log(p1);//users who are in the same room
                
            }

        });
    })
})



server.listen(PORT, (err)=>{
    if(!err)
    {
        console.log(`Server running at PORT ${PORT}`);
    }
})


//front end  all the users in the room

