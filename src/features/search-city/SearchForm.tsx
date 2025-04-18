import React, { useState } from 'react';
import styles from './Search.module.scss';

type Props = {
  onSearch: (city: string) => void;
};

const SearchForm: React.FC<Props> = ({ onSearch }) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city);
      setCity('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
    <input
      type="text"
      placeholder="Введите город"
      value={city}
      onChange={(e) => setCity(e.target.value)}
    />
  </form>
  );
};

export default SearchForm;
