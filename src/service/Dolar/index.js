import axios from "axios";

const usd = async () => {
  try {
    const response = await axios.get(process.env.URL_MOEDA + process.env.USD);
    console.log(response.data);
    return response.data.USDBRL;
  } catch (error) {
    console.error(error);
  }
};

export default usd;
