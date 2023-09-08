import React from 'react';
import InputContainer from './InputContainer/InputContainer';
import styles from './Converter.module.css';

const Converter = () => {
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <label htmlFor="" className={styles.form}>
        Конвертер валют
        <InputContainer />
      </label>
    </form>
  );
};

export default Converter;