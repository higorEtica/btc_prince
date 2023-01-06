import axios from "axios";

const eur = async () => {
    try {
      const response = await axios.get(process.env.URL_MOEDA + process.env.EUR);
      return response.data.EURBRL;
    } catch (error) {
      console.error(error);
    }
  };
export default eur;