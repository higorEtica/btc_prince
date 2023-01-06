import Express from "express";
import { btc, btcPrice } from "../service/Bitcoin/index.js";
import Dolar from "../service/Dolar/index.js";
import Euro from "../service/Euro/index.js";
import bodyParser from "body-parser";
import { io } from "../../index.js";

// create application/json parser
var jsonParser = bodyParser.json();

const returnValueInReal = (res) => {
  return "R$ " + res["bid"];
};

const router = Express.Router();
router.get("/btc", async function (req, res) {
  const resposta = await btc();
  res.send(`
    <!doctype html>
    <html>
      <head>
        <title>Atualização Automática</title>
      </head>
      <body>
      <h1>${returnValueInReal(resposta)}</h1>
      </body>
      <script src="https://cdn.socket.io/socket.io-3.0.1.min.js"></script>
      <script>
        const socket = io('http://localhost:3000')
        socket.on('connection')
        socket.on('update',(data)=>{
            document.querySelector('h1').innerHTML = data;
        })
      </script>
    </html>
  `);
});

router.get("/usd", async function (req, res) {
  const resposta = await Dolar();
  res.send(`
  <!doctype html>
  <html>
    <head>
      <title>Atualização Automática</title>
    </head>
    <body>
    <h1>${returnValueInReal(resposta)}</h1>
    </body>
    <script src="https://cdn.socket.io/socket.io-3.0.1.min.js"></script>
    <script>
      const socket = io('http://localhost:3000')
      socket.on('connection')
      socket.on('update',(data)=>{
          document.querySelector('h1').innerHTML = data;
      })
    </script>
  </html>
`);
});

router.get("/eur", async function (req, res) {
  const resposta = await Euro();
  res.send(`
  <!doctype html>
  <html>
    <head>
      <title>Atualização Automática</title>
    </head>
    <body>
    <h1>${returnValueInReal(resposta)}</h1>
    </body>
    <script src="https://cdn.socket.io/socket.io-3.0.1.min.js"></script>
    <script>
      const socket = io('http://localhost:3000')
      socket.on('connection')
      socket.on('update',(data)=>{
          document.querySelector('h1').innerHTML = data;
      })
    </script>
  </html>
`);
});

router.post("/btc/price", jsonParser, async (req, res) => {
  let coinOld = req.body.coinOld;
  let amountOfCurrency = req.body.amount;
  let amountOfNew = req.body.amountNew;
  let newObject = await btcPrice(coinOld, amountOfCurrency, amountOfNew);
  res.send(JSON.stringify(newObject));
});

setInterval(async () => {
  const resposta = await btc();
  io.emit("update", returnValueInReal(resposta));
}, 30000);

setInterval(async () => {
  const resposta = await Dolar();
  io.emit("update", returnValueInReal(resposta));
}, 30000);

setInterval(async () => {
  const resposta = await Euro();
  io.emit("update", returnValueInReal(resposta));
}, 30000);

export default router;
