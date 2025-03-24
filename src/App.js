// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { useEffect, useState } from "react";

export default function App()
{
  const [amount, setAmount] = useState(1);
  const [fromCur, setFromCur] = useState("EUR");
  const [toCur, setToCur] = useState("USD");
  const [convert, setConvert] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function ()
  {
    async function convert()
    {

      setIsLoading(true);

      const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${fromCur}&to=${toCur}`);

      const data = await res.json();

      setConvert(data.rates[toCur]);
      setIsLoading(false);
    }
    if (fromCur === toCur) return setConvert(amount);
    if (amount === 0) return setConvert('');


    convert();
  }, [amount, fromCur, toCur]);

  return (
    <div className="main-app">
      <h1>Currency Converter</h1>
      <div className="converter">
        <div className="amountDiv">
          <h3>Type the number you want Converter</h3>
          <input
            type="number"
            value={amount}
            onChange={e => setAmount(Number(e.target.value))}
          // disabled={isLoading}
          />
        </div>
        <div className="downDiv">
          <img src="./caret-down-bold.png" alt="" />
        </div>
        <div className="amountDiv selectDiv">
          <div className="selectLapel">
            <h3>Select the actual currency</h3>
            <select
              value={fromCur}
              onChange={e => setFromCur(e.target.value)}
              disabled={isLoading}>

              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="CAD">CAD</option>
              <option value="INR">INR</option>
            </select>
          </div>
          <div className="selectLapel">
            <h3>Select the actual conversion currency</h3>
            <select
              value={toCur}
              onChange={e => setToCur(e.target.value)}
              disabled={isLoading}
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="CAD">CAD</option>
              <option value="INR">INR</option>
            </select>
          </div>
        </div>
        <p className="amountTransfer">{convert} {amount === 0 ? 'Type an Integer Number' : toCur}</p>
      </div>
    </div>
  );
}
