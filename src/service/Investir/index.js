export const billing = async (coinOld,amountOfCurrency,amountOfNew) => {

    let percentage = amountOfNew/amountOfCurrency;
    console.log(amountOfCurrency)
    console.log(amountOfNew)
    console.log(coinOld)

    const finalValue = coinOld * percentage; 
    percentage = (percentage - 1) * 100;
    const btcNew = amountOfCurrency/coinOld;
    return {
        "percentage": percentage,
        "valueShouldSell": finalValue,
        "btcNew": btcNew
    }
}