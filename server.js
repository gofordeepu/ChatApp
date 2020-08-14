const express=require('express');
const app=express();
const http=require('http').createServer(app)
const PORT=process.env.PORT||80
http.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`);
});
app.use(express.static(__dirname+"/public"))
app.get('/',(req,res)=>
{
    res.sendfile(__dirname+"/index.html");
});
// socket programming

const io=require('socket.io')(http);
io.on("connection",(socket)=>{
  console.log("connected...");
  socket.on("message",(msg)=>{
      socket.broadcast.emit("message",msg);
  });
  socket.on("newUserJoined",(name)=>{
      socket.broadcast.emit("newUserJoined",name);
  })
}); 
