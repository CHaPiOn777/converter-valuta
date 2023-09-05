import React, { ChangeEvent, useEffect, useState } from "react";
import { TResponce, convertValuta, getValuta } from "../../api/api";
import styles from "./App.module.css";
import { Arrow } from "../../img/arrow";
type TOp = {
  string: number;
};

function App() {
  const [valuta, setValuta] = useState({});
  const [from, setFrom] = useState<string>("RUB");
  const [to, setTo] = useState<string>("USD");
  const [convertResult, setConvertResult] = useState<number>(0);
  const [inputValue, setInputValue] = useState<number>(0);

  useEffect(() => {
    getValuta().then((res) => {
      setValuta(res.rates);
    });
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleChangeFrom = (e: ChangeEvent<HTMLSelectElement>) => {
    setFrom(e.target.value);
  };

  const handleChangeTo = (e: ChangeEvent<HTMLSelectElement>) => {
    setTo(e.target.value);
  };

  const hendleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(Number(e.target.value));
  };

  useEffect(() => {
    convertValuta(from, to).then((res) => {
      setConvertResult(Number((res.result * inputValue).toFixed(2)));
    });
  }, [inputValue, from, to]);

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <label htmlFor="" className={styles.form}>
        Конвертер валют
        <div className={`${styles.inputContainer} ${styles.inputContainerMarginTop}`}>
          <input
            className={styles.input}
            name="to"
            list="valutaFrom"
            type="text"
            onChange={(e) => hendleChangeInput(e)}
          />
          <Arrow className={styles.arrow} />
          <select
            className={styles.select}
            id="valutaFrom"
            value={from}
            onChange={(e) => handleChangeFrom(e)}
          >
            {valuta &&
              Object.keys(valuta).map((item, index) => {
                return (
                  <option className={styles.option} key={index} value={item}>
                    {item}
                  </option>
                );
              })}
          </select>
        </div>
        <div className={styles.inputContainer}>
          <input
            disabled
            className={styles.input}
            name="to"
            value={convertResult}
            list="valutaTo"
            type="text"
            readOnly
          />
          <Arrow className={styles.arrow} />
          <select
            className={styles.select}
            id="valutaTo"
            value={to}
            onChange={(e) => handleChangeTo(e)}
          >
            {valuta &&
              Object.keys(valuta).map((item, index) => {
                return (
                  <option key={index} value={item}>
                    {item}
                  </option>
                );
              })}
          </select>
        </div>
      </label>
    </form>
  );
}

export default App;
