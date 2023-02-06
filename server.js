const express = require("express");
const path = require("path");

const app = express();
const http = require("http").createServer(app)

const publicDirectory = path.join(__dirname+"/public")

const port = process.env.PORT || 3000;

app.use(express.static(`${publicDirectory}`))

app.get("/", (req,res)=> {
    res.sendFile(__dirname+ "/index.html");
})
http.listen(port , ()=>{
  console.log(`Server is running on port ${port}`);
})

// socket.io

const io = require("socket.io")(http)

io.on("connection", (socket)=>{
  console.log("connected....");
  socket.on("message", (msg)=>{
    socket.broadcast.emit("message", msg)
  })
})

