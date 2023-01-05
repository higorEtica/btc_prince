import Express from "express";
import {btc,btcPrice} from "../service/Bitcoin/index.js"
import Dolar from "../service/Dolar/index.js"
import Euro from "../service/Euro/index.js"
import bodyParser from "body-parser";

// create application/json parser
var jsonParser = bodyParser.json()
 
const router = Express.Router(); 
router.get("/btc", async function (req, res) {
    
    const resposta = await btc();
    const transfor = "R$ "+ resposta["bid"]
    res.send( transfor);

});

router.get("/usd", async function (req, res) {
    
    const resposta = await Dolar();
    const transfor = "R$ "+ resposta["bid"]
    res.send( transfor);

});

router.get("/eur", async function (req, res) {
    
    const resposta = await Euro();
    const transfor = "R$ "+ resposta["bid"]
    res.send( transfor);

});

router.post("/btc/price",jsonParser, async (req,res) => {
    let coinOld = req.body.coinOld;
    let amountOfCurrency =req.body.amount;
    let amountOfNew= req.body.amountNew;
    let newObject = await btcPrice(coinOld,amountOfCurrency,amountOfNew);
    res.send(JSON.stringify(newObject))

})
export default router;