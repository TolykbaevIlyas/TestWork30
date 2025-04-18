import React from 'react';
import { BounceLoader } from 'react-spinners';
import styles from './Loader.module.scss';

interface LoaderProps {
  weather: string;
}

const Loader: React.FC<LoaderProps> = ({ weather }) => {
  const getLoaderColor = () => {
    if (weather.includes('clear')) {
      return '#FFD700';
    }
    if (weather.includes('rain')) {
      return '#00BFFF';
    }
    if (weather.includes('cloud')) {
      return '#A9A9A9';
    }
    return '#000000';
  };

  return (
    <div className={styles.loaderContainer}>
      <div className={styles.weatherInfo}>
        <span>{weather ? `Погода: ${weather}` : 'Загрузка данных о погоде...'}</span>
      </div>
      <BounceLoader color={getLoaderColor()} loading={true} size={60} />
    </div>
  );
};

export default Loader;
