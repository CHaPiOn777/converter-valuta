import React, { useEffect, useState } from "react";
import { TResponce, getValuta } from "../../api/api";
import styles from "./App.module.css";
type TOp = {
  value: number;
  code: string;
};

function App() {
  let [valuta, setValuta] = useState<any>([]);
  let a: any = [{}];
  useEffect(() => {
    getValuta().then((res) => {
      let key = Object.keys(res.data);
      for (let asd of key) {
        a[asd] = res.data[asd].value;

        setValuta([a]);
      }
    });
  }, []);
  console.log(valuta);
  return (
    <form action="" className={styles.form}>
      <label htmlFor="" className={styles.label}>
        Конвертер валют
      </label>
      <input name="to" list="valuta" type="text" />
      <datalist id="valuta">
        {/* {valuta.map((item) => {
          console.log(item);
          return <option value={item}>{item}</option>;
        })} */}
      </datalist>
    </form>
  );
}

export default App;
