// alert("hello");

var chatForm = document.getElementById("chatForm");
var chatMsg = document.getElementById("chatMsg");
var chatMessagesDiv = document.getElementById("chatMessagesDiv");

// console.log(Qs.parse(location.search));
var userObject=Qs.parse(location.search,{ignoreQueryPrefix: true});
var userName = userObject.userName;
var roomName=userObject.roomName;
console.log("Username : ",userName);

const socket = io();
socket.emit("joinRoom", {userName:userName,roomName:roomName});
socket.on("welcomeUser", (msg)=>{
    chatMsg.innerHTML += msg;
})
socket.on("chatMessage",(obj)=>{
    console.log("Inside chat message func",obj);
    formatMessage(obj);

})

socket.on("modifyUserJoinMessage",(obj)=>{
// var paraElement=document.createElement("p");
    // var str=obj.userName+" " +obj.message;
    // var pTextNode=document.createTextNode(str);
    // paraElement.appendChild(pTextNode);
    // chatMessagesDiv.appendChild(paraElement);
    formatMessage(obj);

})
function formatMessage(obj)
{
    var paraElement=document.createElement("p");
    var str=obj.userName+" : " +obj.message;
    var pTextNode=document.createTextNode(str);
    paraElement.appendChild(pTextNode);
    chatMessagesDiv.appendChild(paraElement);
    
    return str;
}
function sendMsgEventHandler()
{
    socket.emit("message", {message:chatMsg.value, userName:userName,roomName:roomName});
    return false;
}