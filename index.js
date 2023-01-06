import Express from "express";
import controller from "./src/controller/index.js";
import * as dotenv from 'dotenv';
import http from 'http';
import { Server } from "socket.io";

const app = Express();
const port = 3000;
const service = http.createServer(app);
export const io = new Server(service,{cross:{origin:"*"}})
app.set("view engine", "ejs");
app.use("/",controller);

app.get("/home",(req,res)=>{
    res.render("home");
})

service.listen(port,() =>{
    console.log(`Inidicando Projeto na porta ${port}`)
})

io.on('connection',(socket) => {
    console.log("User connection: "+ socket.id);

    socket.on("message",(data) => {
        socket.broadcast.emit('message',data);
    })
})

dotenv.config();
