import { boolean } from 'zod';

const calculatePrice = (
  price: number,
  isExcursionPublic: boolean,
  passengerNumber: number,
) => {
  if (isExcursionPublic) {
    return price * passengerNumber;
  }

  return price;
};

export default calculatePrice;
