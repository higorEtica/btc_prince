import axios from "axios";

const btc = async () => {
    try {
        const response = await axios.get(process.env.URL_MOEDA + process.env.BTC);
        console.log(response.data)
        return response.data.BTCBRL;
      } catch (error) {
        console.error(error);
      }
}

export default btc;