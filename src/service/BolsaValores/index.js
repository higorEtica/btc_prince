//api/available METODO GET RETORNA TODAS AS AÇÕES EXISTENTES NA BOLSA
///api/quote/{tickers} TROQUE O TICKERS PELA BOLSA QUE EXITE PARA RETORNAR OS DADOS
// /api/quote/list TRAZ OS DADOS DE TODAS AS AÇÕES COM VALORES
// DOCUMENTAÇÃO https://brapi.dev/docs
import axios from "axios";

export const stockList = async () => {
  try {
    let bolsaList = process.env.BOLSA + "api/available";
    const response = await axios.get(bolsaList);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const tickers = async (ticker) => {
    try{
        let oneDateStock = `${process.env.BOLSA}api/quote/${ticker}`;
        const response = await axios.get(oneDateStock);
        return response;
    }catch(error){
        console.error(error);
    }
}