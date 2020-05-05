var app = require('express')();
var http = require('http').Server(app);
var path = require('path');
var io = require('socket.io')(http);
usernames=[];
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
  });

    io.on('connection', function(socket){
    console.log('a user connected');
    //for username window
    socket.on('new user',function(data,callback){
    if(usernames.indexOf(data)!=-1){
            callback(false);
     }else{
            callback(true);
            socket.username=data;
            usernames.push(socket.username);
            updateUsernames();
        }
     });
// update username

function updateUsernames(){
    io.emit('usernames',usernames);
}


    //send message
      socket.on('chat message', function(data){
        //console.log('message: ' + data);
        io.emit('chat message', {msg:data,user:socket.username});//this chat message can be any name same as in index.html
        });
      //Disconnect
       socket.on('disconnect',function(data){
        if(socket.username){
            return;
        }
        usernames.splice(usernames.indexOf(socket.username),1);
        updateUsernames;
    });
  });

  
 
  
http.listen(8081, function(){
  console.log('listening on *:8081');
});
