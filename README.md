# btc_prince
It's to check when I should sell my btc according to how much I want to earn
## Init project
Using the npm install  
```bash
    npm i  
```
start project 
```bash
    nodemon
```
usable url [bitcoin](localhost:3000/btc),[dolar](localhost:3000/usd),[euro](localhost:3000/eur)

## To use the quotation bitcoin

Quotation [bitcoinQuotation](localhost:3000/btc/price), verb used http POST. To used post need to pass a json.
Exemple:
```Json
    {
    "coinOld":90965,
    "amount":1,
    "amountNew":1.13
}
```
coinOld -> It's the amount you paid in bitcoin<br>

amount -> It's the amount in reais you bought of bitcoin<br>

amountNew -> It's the amount i want to redeem in reais<br>

Response service:
```Json
{"percentage":12.99999999999999,"valueShouldSell":102790.45,"btcNew":0.00001099323915791788}
```
btcNew -> Is the amount of bitcoin i bought with the coinOld

## API consumer 
Used it's [api](https://docs.awesomeapi.com.br/api-de-moedas)