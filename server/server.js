// const {instrument} = require('@socket.io/admin-ui')
// const io=require("socket.io")(3001,{
//     cors:{
//         origin:["http://localhost:8080","https://admin.socket.io/"]
//     }

// })

// const userInfo= io.of('/user')
// userInfo.on('connection',socket=>{
//     console.log("connected to user namespace" + socket.username)
// })

// userInfo.use((socket,next)=>{
//     if(socket.handshake.auth.token){
//         socket.username= getUSerNameFromTOken(socket.handshake.auth.token)
//         next()
//     }else{
//         next(new Error('please send token'))
//     }

// })

// function getUSerNameFromTOken (token){
//     return token
// }
// io.on('connection', socket=>{
//     console.log(socket.id)
//     socket.on('send-message',(message,room)=>{
//         if(room===''){
//             socket.broadcast.emit("recieve-message" ,message);
//         }else{
//             socket.to(room).emit("recieve-message" ,message);
//         }
        
//     })
//     socket.on('join-room',(room ,cb)=>{
//         socket.join(room)
//         cb(`Joined ${room}`)
//     })

//     socket.on('ping',n=>console.log(n))
// })

// instrument(io,{auth:false})


import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
import http from "http"
import { Server } from "socket.io"
import authRoutes from "./routes/auth.routes.js"
import messageRoutes from "./routes/message.routes.js"
import userRoutes from "./routes/user.routes.js"
import connectTODB from "./db/connectToMongodb.js"
const app= express();
app.use(cors())

app.use(express.json());//to parse the incoming requests with JSON  payloads
app.use(cookieParser())
dotenv.config({ path: '../.env.local' });
const PORT= process.env.PORT || 5000


// app.get("/",(req,res)=>{
//     //root route
//     res.send("hello world"
// )})
app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)

app.use("/api/users", userRoutes)








console.log("dgfsd",process.env.JWT_SECRET)







const server= http.createServer(app)
const io= new Server(
    server , {
        cors:{
            origin:"http://localhost:3000",
            methods:["GET","POST"],
        }
    },{
        pingTimeout: 60000, // 1 minute
        pingInterval: 25000, // 25 seconds
      }
)

io.on("connection",(socket) =>{
    console.log(socket.id);
    socket.on("disconnect",()=>{
        console.log("USER disconnected",socket.id)
    });
    socket.on("join_room",(data)=>{
        socket.join(data)
        console.log(`User with ID ${socket.id} Joined room ${data}`)
    })
    socket.on("send_message", (data) => {
        socket.to(data.room).emit("recieve_message", data);
        console.log(`Message from ${data.author} in room ${data.room}: ${data.message}`);
      });
});

server.listen(PORT,()=>{

    connectTODB();
    console.log("SERVER RUNNINNG")
})