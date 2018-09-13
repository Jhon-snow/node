<!doctype html>
<html>
  <head>
    <title>ChatIO </title>
    <style>
     body{
         background: #f9f9f9;
     }
     #container{
         widows: 700px;
         margin:0 auto;
     }
     #chatWindow{
         height:300px;
     }
     #mainWrapper{
        display:none;
     }
     #chatWrapper{
         float:left;
         border:1px #ccc solid;
         border-radius: 10px;
         background: #f4f4f4;
         padding:10px;
     }
     #userWrapper{
         border:1px #ccc solid;
         border-radius:10px;
         background: #f4f4f4;
         padding:10px;
         margin-left:20px;
         widows: 150px;
         max-width: height 200px; 
     }
     #namesWrapper{
        
        border:1px #ccc solid;
         border-radius:10px;
         background: #f4f4f4;
         padding:10px;
         margin-left:20px;
         max-width: height 200px;
     }
     input{
         height:30px;
         border :solid 1px #ccc;
     }
    </style>
  </head>
  <body>
    <div id="container">
        <div id="namesWrapper">
            <h2>ChatIO</h2>
            <p>Create Username:</p>
            <div id="error"></div>
            <form id="usernameForm">
                <input type="text" size="35" id="username">
                <input type="submit" value="Submit">
            </form>
        </div>
    </div>
    <div id="mainWrapper">
        <h2>ChatIO</h2>
        <div id="chatWrapper">
            <div id="chatWindow"></div>
            <form id="messageForm">
                    <input type="text" size="35" id="message" placeholder="Say something...">
                    <input type="submit" value="Submit">

            </form>
        </div>
        <div id="userWrapper">
            <div id="users"></div>
        </div>
    </div>
</body>
    <script src="https://cdn.socket.io/socket.io-1.2.0.js"></script>
   <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.0.4/socket.io.js"></script>
   <script src="https://code.jquery.com/jquery-1.11.1.js"></script>
    
<script>
 $ (function () {
    var socket = io.connect();
    var $messageForm= $('#messageForm');
    var $message=$('#message');
    var $chat=$('#chatWindow');
    var $usernameForm=$('#usernameForm');
    var $users=$('#users');
    var $username=$('#username');
    var $error =$('#error');
//for username window
    $usernameForm.submit(function(e){
        e.preventDefault();
        //console.log('Submitted');
      socket.emit('new user',$username.val(),function(data){
          if(data){
              $('#namesWrapper').hide();
              $('#mainWrapper').show();
          }
          else{
            $error.html('Username already exist');
          }
      });
    });

socket.on('usernames',function(data){
    var html='';
    for(i=0;i<data.length;i++){
        html+=data[i]+'<br>';
    }
    $users.html(html);
})

//for chat window
    $messageForm.submit(function(e){
        e.preventDefault();
       // console.log('Submitted');
       socket.emit('chat message',$message.val());
       $message.val('');
       return false;
    });
    socket.on('chat message',function(data){
        $chat.append('<strong>'+data.user+'</strong>'+':' +data.msg+'<br>');
    });
  });
    </script>

</html>
