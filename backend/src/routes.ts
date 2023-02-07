import { Router } from "express";
import axios from "axios";

const routes = Router();

const veiculos: any = [];

routes.get("/", async (req, res) => {
  const { data } = await axios(
    "https://api.apilayer.com/exchangerates_data/symbols",
    { headers: { apikey: "GDgi0EeOTwcbIK6q9dAHsZZ0SZKx0BjQ" } }
  );

  var arrSylbols: { key: string; value: any }[] = [];
  Object.keys(data.symbols).forEach((key) => {
    arrSylbols.push({ key, value: data.symbols[key] });
  });
  return res.json(arrSylbols);
});

routes.get("/:symbol/:base/compare", async (req, res) => {
  const { symbol, base } = req.params;
  console.log({ symbol, base });
  
  const { data } = await axios(
    `https://api.apilayer.com/exchangerates_data/latest?symbols=${symbol}&base=${base}`,
    { headers: { apikey: "GDgi0EeOTwcbIK6q9dAHsZZ0SZKx0BjQ" } }
  );
  console.log(data);

  return res.json(data);
});

export { routes };
