import axios from "axios";
import {billing} from "../Investir/index.js";

export const btc = async () => {
    try {
        const response = await axios.get(process.env.URL_MOEDA + process.env.BTC);
        console.log("Iniciando BTC");
        console.log(response.data);
        return response.data.BTCBRL;
      } catch (error) {
        console.error(error);
      }
}

export const btcPrice = async (coinOld,amountOfCurrency,amountOfNew) => {

    return billing(coinOld,amountOfCurrency,amountOfNew);

}