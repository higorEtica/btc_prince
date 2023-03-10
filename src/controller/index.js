import Express from "express";
import { btc, btcPrice } from "../service/Bitcoin/index.js";
import Dolar from "../service/Dolar/index.js";
import Euro from "../service/Euro/index.js";
import bodyParser from "body-parser";
import { io } from "../../index.js";

// create application/json parser
var jsonParser = bodyParser.json();

const intervalIds = [];

const limpCacheSetInterval = async (arry) => {
  if (!!arry) {
    arry.forEach( async function (intervalId) {
      const result = await intervalId;
      
      if(!!intervalId){
        console.log( "Mostre aqui " + result);
        clearInterval(intervalId);
      }
    });
  }
};

function formatReal(int) {
  var tmp = int + "";
  tmp = tmp.replace(/([0-9]{2})$/g, ",$1");
  if (tmp.length > 6) tmp = tmp.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");

  return tmp;
}
const returnValueInReal = (res) => {
  let float = formatReal(res["bid"]);
  console.log(float);
  return "R$ " + float;
};

const setIntervals = async (newFunctions) => {
  return setInterval(async () => {
    const resposta = await newFunctions();
    io.emit("update", returnValueInReal(resposta));
  }, 30000);
};

const router = Express.Router();
router.get("/btc", async function (req, res) {
  limpCacheSetInterval(intervalIds);
  let btcs = await setIntervals(btc);
  //console.log(btc);
  intervalIds.push(btcs);

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
  setIntervals(Dolar);

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
  limpCacheSetInterval(intervalIds);
  let eur = await setIntervals(Euro);
  intervalIds.push(eur);
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

export default router;
