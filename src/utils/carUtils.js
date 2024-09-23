// export function returnsCar
export const getCarByCarCode = (carCode, carList) => {
  return carList.find((item) => item.carCode === carCode);
};

// function returns array of cars from cart carCodes array and the carList

export const getCartCarList = (carCodes, carList) => {
  return carCodes.map((carCode) => getCarByCarCode(carCode, carList));
};
