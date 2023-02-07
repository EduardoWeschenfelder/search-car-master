import React, { CSSProperties, useEffect, useState } from "react";
import Select from "react-select";
import api from "./services/api";
import "./input.css"

function App() {
  const [selectBase, setselectBase] = useState(null);
  const [selectSymbols, setselectSymbols] = useState(null);
  const [resultComparacao, setResultComparacao] = useState(null);
  const [bases, setBases] = useState([]);
  const [symbols, setSymbols] = useState([]);
  useEffect(() => {
    async function loadCoins() {
      const { data } = await api.get("/");
      setBases(data);
      setSymbols(data);
    }

    loadCoins();
  }, []);

  const handleSelecBase = async (select: any) => {
    setselectBase(select.key);
    const base = select.key;
    console.log({ base });
  };

  const handleSelecSymbols = async (select: any) => {
    setselectSymbols(select.key);
    const symbols = select.key;
    console.log(symbols);

    const { data } = await api.get(`${symbols}/${selectBase}/compare`);
    console.log(data);

    setResultComparacao(data);
  };

  const groupStyles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  };
  const groupBadgeStyles: CSSProperties = {
    backgroundColor: "#EBECF0",
    borderRadius: "2em",
    color: "#172B4D",
    display: "inline-block",
    fontSize: 12,
    fontWeight: "normal",
    lineHeight: "1",
    minWidth: 1,
    padding: "0.16666666666667em 0.5em",
    textAlign: "center",
  };
  const butonStyles: CSSProperties = {
    backgroundColor: "#008CBA" /* Green */,
    border: "none",
    color: "white",
    padding: "15px 32px",
    textAlign: "center",
    textDecoration: "none",
    display: "inline-block",
    fontSize: "16px",
  };

  const formatGroupLabel = (data: any) => (
    <div style={groupStyles}>
      <span>{data.label}</span>
      <span style={groupBadgeStyles}>{data.options.length}</span>
    </div>
  );

  return (
    <div className="relative mt-1">
      <p className="block text-sm font-medium text-red-700">
        Selecione a moeda de base para conveção:
      </p>
      <Select
        className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
        defaultValue={selectBase}
        onChange={handleSelecBase}
        options={bases}
        formatGroupLabel={formatGroupLabel}
      />
      {selectBase ? (
        <>
          <p>Selecione a moeda de comparação:</p>
          <Select
            defaultValue={selectSymbols}
            onChange={handleSelecSymbols}
            options={symbols}
            formatGroupLabel={formatGroupLabel}
          />
        </>
      ) : null}
      {selectBase && selectSymbols ? (
        <>
          <p>Resultado da comparação:</p>
          <p>{JSON.stringify(resultComparacao)}</p>
        </>
      ) : null}
    </div>
  );
}

export default App;
