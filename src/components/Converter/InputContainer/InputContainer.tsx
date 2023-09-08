import { ChangeEvent, useEffect, useMemo, useState } from "react";
import styles from "./InputContainer.module.css";
import { convertValuta, getCountry, getValuta } from "../../../api/api";
import { Arrow } from "../../../img/arrow";

const InputContainer = () => {
  const [valuta, setValuta] = useState({});
  const [from, setFrom] = useState<string>("RUB");
  const [to, setTo] = useState<string>("USD");
  const [convertResult, setConvertResult] = useState<number>(0);
  const [inputValue, setInputValue] = useState<number>(0);
  const [flagFrom, setFlagFrom] = useState()

  useEffect(() => {
    getValuta().then((res) => {
      setValuta(res.rates);
    });
  }, []);

  let flagForm = useMemo(() => {
    return from.slice(0, 2).toLowerCase()
  }, [from]);

  let flagTo = useMemo(() => {
    return to.slice(0, 2).toLowerCase()
  }, [to]);

  useEffect(() => {
    convertValuta(from, to).then((res) => {
      setConvertResult(Number((res.result * inputValue).toFixed(2)));
    });
  }, [inputValue, from, to]);

  const handleChangeFrom = (e: ChangeEvent<HTMLSelectElement>) => {
    setFrom(e.target.value);
  };

  const handleChangeTo = (e: ChangeEvent<HTMLSelectElement>) => {
    setTo(e.target.value);
  };

  const hendleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(Number(e.target.value));
  };


  return (
    <>
      <div
        className={`${styles.inputContainer} ${styles.inputContainerMarginTop}`}
      >
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
        <span className={`fi fi-${flagForm}`}></span>
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
        <span className={`fi fi-${flagTo}`}></span>

      </div>
    </>
  );
};

export default InputContainer;
