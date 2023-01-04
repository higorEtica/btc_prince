import Express from "express";
import Btc from "../service/Bitcoin/index.js"
import Dolar from "../service/Dolar/index.js"
import Euro from "../service/Euro/index.js"

const router = Express.Router(); 
router.get("/btc", async function (req, res) {
    
    const resposta = await Btc();
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
export default router;