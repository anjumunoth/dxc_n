const users=[];
// var mongoClient=require("mongodb").MongoClient;
var messageObj=require("./messageManagement");
function newUserJoin(id, userName,roomName)
{
    var user={id,userName,roomName};
    users.push(user);
    // mongoClient.connect("mongodb://localhost:27017/",{useUnifiedTopology:true},(err,dbHost)=>{
    //     if(err)
    //     {
    //         console.log("Error connecting to the server");

    //     }
    //     else
    //     {
    //         db=dbHost.db("slDb");
    //         db.collection("users",(err,coll)=>{
    //             if(err)
    //             {
    //                 console.log("error connecting to the collection");

    //             }
    //             else
    //             {
    //                 coll.insertOne(user);
    //             }
    
    //         })

    //     }
        

    // })

}
function getAllUsers(roomName,returnResult)
{
    return users;
    // mongoClient.connect("mongodb://localhost:27017/",{useUnifiedTopology:true},(err,dbHost)=>{
    //     if(err)
    //     {
    //         console.log("Error connecting to the server",err);
    //     }
    //     var db=dbHost.db("slDb");
    //     db.collection("users",(err,coll)=>{
    //         if(err)
    //         {
    //             console.log("Error connecting to the db and collection",err);
    //             returnResult([{error:err}]);
    //         }
    //         else
    //         {
    //             coll.find({roomName:roomName},{userName:1,_id:0}).toArray((err,dataArr)=>{
    //                 if(err)
    //                 {
    //                     console.log("Error in the find users",err);
    //                     returnResult([{error:err}]);
    //                 }
    //                 else
    //                 {
    //                     console.log("Users in a particular room",dataArr);
    //                     returnResult(dataArr);
    //                 }
    //             })
    //         }
    //     })
    // })

}

 function getUser(id)
{
    var pos=users.findIndex(item => item.id == id)
    if(pos >=0)
    {
        return users[pos]
    }
    else
    {
        return null;
    }
}


function removeUser(userToBeRemoved)
{
    var pos=users.findIndex(item => item.id == userToBeRemoved.id)
    if(pos >=0)
    {
        users.splice(pos,1);
        return true;
    }
    else
    {
        return false;
    }
    // mongoClient.connect("mongodb://localhost:27017/",{useUnifiedTopology:true},(err,dbHost)=>{
    //     if(err)
    //     {
    //         console.log("Error connecting to the server");

    //     }
    //     else
    //     {
    //         db=dbHost.db("slDb");
    //         db.collection("users",(err,coll)=>{
    //             if(err)
    //             {
    //                 console.log("error connecting to the collection");

    //             }
    //             else
    //             {
    //                 coll.findOneAndDelete({id:socketId},(err,result)=>{
    //                     if(err)
    //                     {
    //                         console.log("Error during deletion",err);
    //                     }
    //                     else
    //                     {
    //                         console.log("Deleted doc :",result.value);
    //                         var tempUser=result.value;
    //                         var obj={userName:tempUser.userName,message:"has left the room",roomName:tempUser.roomName};
    //                         messageObj.postMessage(obj);
    //                         socket.to(tempUser.roomName).broadcast.emit("modifyUserJoinMessage",obj)
            
    //                     }

    //                 })
    //             }
    //         })
    //     }
    // })
   
}

module.exports={newUserJoin,getAllUsers,removeUser,getUser}