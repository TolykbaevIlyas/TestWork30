export const getCurrentPosition = (): Promise<GeolocationPosition> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject("Геолокация не поддерживается браузером");
      } else {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      }
    });
  };