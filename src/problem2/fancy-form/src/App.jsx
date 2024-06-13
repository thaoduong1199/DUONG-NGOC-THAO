import React, { useState, useEffect, useRef } from "react";
import "./styles/App.css";

const exchangeRates = [
  {
    currency: "BLUR",
    date: "2023-08-29T07:10:40.000Z",
    price: 0.20811525423728813,
    img: "/images/BLUR.svg",
  },
  {
    currency: "bNEO",
    date: "2023-08-29T07:10:50.000Z",
    price: 7.1282679,
    img: "/images/bNEO.svg",
  },
  {
    currency: "BUSD",
    date: "2023-08-29T07:10:40.000Z",
    price: 0.999183113,
    img: "/images/BUSD.svg",
  },
  {
    currency: "BUSDT",
    date: "2023-08-29T07:10:40.000Z",
    price: 0.9998782611186441,
    img: "/images/BUSDT.svg",
  },
  {
    currency: "USD",
    date: "2023-08-29T07:10:30.000Z",
    price: 1,
    img: "/images/USD.svg",
  },
  {
    currency: "ETH",
    date: "2023-08-29T07:10:52.000Z",
    price: 1645.9337373737374,
    img: "/images/ETH.svg",
  },
  {
    currency: "GMX",
    date: "2023-08-29T07:10:40.000Z",
    price: 36.345114372881355,
    img: "/images/GMX.svg",
  },
  {
    currency: "STEVMOS",
    date: "2023-08-29T07:10:40.000Z",
    price: 0.07276706779661017,
    img: "/images/STEVMOS.svg",
  },
  {
    currency: "LUNA",
    date: "2023-08-29T07:10:40.000Z",
    price: 0.40955638983050846,
    img: "/images/LUNA.svg",
  },
  {
    currency: "RATOM",
    date: "2023-08-29T07:10:40.000Z",
    price: 10.250918915254237,
    img: "/images/RATOM.svg",
  },
  {
    currency: "STRD",
    date: "2023-08-29T07:10:40.000Z",
    price: 0.7386553389830508,
    img: "/images/STRD.svg",
  },
  {
    currency: "EVMOS",
    date: "2023-08-29T07:10:40.000Z",
    price: 0.06246181355932203,
    img: "/images/EVMOS.svg",
  },
  {
    currency: "IBCX",
    date: "2023-08-29T07:10:40.000Z",
    price: 41.26811355932203,
    img: "/images/IBCX.svg",
  },
  {
    currency: "IRIS",
    date: "2023-08-29T07:10:40.000Z",
    price: 0.0177095593220339,
    img: "/images/IRIS.svg",
  },
  {
    currency: "ampLUNA",
    date: "2023-08-29T07:10:40.000Z",
    price: 0.49548589830508477,
    img: "/images/ampLUNA.svg",
  },
  {
    currency: "KUJI",
    date: "2023-08-29T07:10:45.000Z",
    price: 0.675,
    img: "/images/KUJI.svg",
  },
  {
    currency: "STOSMO",
    date: "2023-08-29T07:10:45.000Z",
    price: 0.431318,
    img: "/images/STOSMO.svg",
  },
  {
    currency: "USDC",
    date: "2023-08-29T07:10:40.000Z",
    price: 0.989832,
    img: "/images/USDC.svg",
  },
  {
    currency: "axlUSDC",
    date: "2023-08-29T07:10:40.000Z",
    price: 0.989832,
    img: "/images/axlUSDC.svg",
  },
  {
    currency: "ATOM",
    date: "2023-08-29T07:10:50.000Z",
    price: 7.186657333333334,
    img: "/images/ATOM.svg",
  },
  {
    currency: "STATOM",
    date: "2023-08-29T07:10:45.000Z",
    price: 8.512162050847458,
    img: "/images/STATOM.svg",
  },
  {
    currency: "OSMO",
    date: "2023-08-29T07:10:50.000Z",
    price: 0.3772974333333333,
    img: "/images/OSMO.svg",
  },
  {
    currency: "rSWTH",
    date: "2023-08-29T07:10:40.000Z",
    price: 0.00408771,
    img: "/images/rSWTH.svg",
  },
  {
    currency: "STLUNA",
    date: "2023-08-29T07:10:40.000Z",
    price: 0.44232210169491526,
    img: "/images/STLUNA.svg",
  },
  {
    currency: "LSI",
    date: "2023-08-29T07:10:50.000Z",
    price: 67.69661525423729,
    img: "/images/LSI.svg",
  },
  {
    currency: "OKB",
    date: "2023-08-29T07:10:40.000Z",
    price: 42.97562059322034,
    img: "/images/OKB.svg",
  },
  {
    currency: "OKT",
    date: "2023-08-29T07:10:40.000Z",
    price: 13.561577966101694,
    img: "/images/OKT.svg",
  },
  {
    currency: "SWTH",
    date: "2023-08-29T07:10:45.000Z",
    price: 0.004039850455012084,
    img: "/images/SWTH.svg",
  },
  {
    currency: "USC",
    date: "2023-08-29T07:10:40.000Z",
    price: 0.994,
    img: "/images/USC.svg",
  },
  {
    currency: "WBTC",
    date: "2023-08-29T07:10:52.000Z",
    price: 26002.82202020202,
    img: "/images/WBTC.svg",
  },
  {
    currency: "wstETH",
    date: "2023-08-29T07:10:40.000Z",
    price: 1872.2579742372882,
    img: "/images/wstETH.svg",
  },
  {
    currency: "YieldUSD",
    date: "2023-08-29T07:10:40.000Z",
    price: 1.0290847966101695,
    img: "/images/YieldUSD.svg",
  },
  {
    currency: "ZIL",
    date: "2023-08-29T07:10:50.000Z",
    price: 0.01651813559322034,
    img: "/images/ZIL.svg",
  },
];

function App() {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [result, setResult] = useState("");
  const [isHiddenResult, setIsHiddenResult] = useState(true);
  const [showToOptions, setShowToOptions] = useState(false);
  const [filteredCurrencies, setFilteredCurrencies] = useState([]);
  const [showFromOptions, setShowFromOptions] = useState(false);
  const fromOptionsRef = useRef(null);
  const toOptionsRef = useRef(null);
  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    const errors = {};

    if (!amount) {
      errors.amount = "Please enter an amount";
    }

    if (!fromCurrency) {
      errors.fromCurrency = "Please select a currency";
    }

    if (!toCurrency) {
      errors.toCurrency = "Please select a currency";
    }

    return errors;
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    setIsHiddenResult(false);
    if (Object.keys(errors).length === 0) {

      const fromRate = exchangeRates.find(
        (rate) => rate.currency === fromCurrency
      );
      const toRate = exchangeRates.find((rate) => rate.currency === toCurrency);

      if (fromRate && toRate) {
        const rate = toRate.price / fromRate.price;
        const convertedAmount = (amount * rate).toFixed(2);
        setResult(convertedAmount);
      } else {
        setResult("Exchange rate not found");
      }
      setFormErrors({});
    } else {
      setFormErrors(errors);
    }
  };

  const handleCurrencySearch = (e, isCurrencyFrom) => {
    const searchValue = e.target.value.toLowerCase();
    const filtered = exchangeRates.filter((item) =>
      item.currency.toLowerCase().includes(searchValue)
    );

    setFilteredCurrencies(filtered);

    if (isCurrencyFrom) {
      setFromCurrency(searchValue);
    } else {
      setToCurrency(searchValue);
    }
  };

  const selectCurrency = (currency, isCurrencyFrom) => {
    if (isCurrencyFrom) {
      setFromCurrency(currency);
      setShowFromOptions(false);
    } else {
      setToCurrency(currency);
      setShowToOptions(false);
    }
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleClickOutside = (event) => {
      if (
        fromOptionsRef.current &&
        !fromOptionsRef.current.contains(event.target)
      ) {
        setShowFromOptions(false);
      }
      if (
        toOptionsRef.current &&
        !toOptionsRef.current.contains(event.target)
      ) {
        setShowToOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  return (
    <div className="app">
      <div className="app-header"></div>
      <div className="converter">
        <h1>Currency Converter</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <div className="wrap">
              <p className="title">Amount</p>
              <input
                type="number"
                id="amount"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              {formErrors.amount ? (
                <span className="error">{formErrors.amount}</span>
              ) : (
                <div className="space"></div>
              )}
            </div>

            <div className="wrap">
              <p className="title">From</p>
              <div className="currency-input">
                <input
                  type="text"
                  id="from-currency"
                  placeholder="Enter currency"
                  value={fromCurrency}
                  onChange={(e) => handleCurrencySearch(e, true)}
                  onFocus={() => setShowFromOptions(true)}
                />
                {formErrors.fromCurrency ? (
                  <span className="error">{formErrors.fromCurrency}</span>
                ) : (
                  <div className="space"></div>
                )}
                {showFromOptions && (
                  <table className="currency-options" ref={fromOptionsRef}>
                    <tbody>
                      {!!filteredCurrencies.length
                        ? filteredCurrencies.map((item, idx) => (
                            <tr
                              key={idx}
                              onClick={() =>
                                selectCurrency(item.currency, true)
                              }
                              className="currency-option"
                            >
                              <img src={item.img} alt="" />
                              <td>{item.currency}</td>
                            </tr>
                          ))
                        : exchangeRates.map((item, idx) => (
                            <tr
                              key={idx}
                              onClick={() =>
                                selectCurrency(item.currency, true)
                              }
                              className="currency-option"
                            >
                              <img src={item.img} alt="" />
                              <td>{item.currency}</td>
                            </tr>
                          ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>

            <div className="exchange-icon">
              <button
                type="button"
                className="swap-button"
                onClick={swapCurrencies}
              >
                &#8646;
              </button>
            </div>

            <div className="wrap">
              <p className="title">To</p>

              <div className="currency-input">
                <input
                  type="text"
                  id="to-currency"
                  placeholder="Enter currency"
                  value={toCurrency}
                  onChange={(e) => handleCurrencySearch(e, false)}
                  onFocus={() => setShowToOptions(true)}
                />
                {formErrors.toCurrency ? (
                  <span className="error">{formErrors.toCurrency}</span>
                ) : (
                  <div className="space"></div>
                )}
                {showToOptions && (
                  <table className="currency-options" ref={toOptionsRef}>
                    <tbody>
                      {!!filteredCurrencies.length
                        ? filteredCurrencies.map((item, idx) => (
                            <tr
                              key={idx}
                              onClick={() =>
                                selectCurrency(item.currency, false)
                              }
                              className="currency-option"
                            >
                              <img src={item.img} alt="" />
                              <td>{item.currency}</td>
                            </tr>
                          ))
                        : exchangeRates.map((item, idx) => (
                            <tr
                              key={idx}
                              onClick={() =>
                                selectCurrency(item.currency, false)
                              }
                              className="currency-option"
                            >
                              <img src={item.img} alt="" />
                              <td>{item.currency}</td>
                            </tr>
                          ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
          <div className="result">
            <p>Result:</p>
            <p>{!isHiddenResult && `${result} ${toCurrency}`}</p>
          </div>
          <button type="submit">Convert</button>
        </form>
      </div>
    </div>
  );
}

export default App;
