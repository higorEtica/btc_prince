import Express from "express";
import controller from "./src/controller/index.js";
import * as dotenv from 'dotenv';

const app = Express();
const port = 3000;
app.use("/",controller);
app.listen(port,() =>{
    console.log(`Inidicando Projeto na porta ${port}`)
})

dotenv.config()
