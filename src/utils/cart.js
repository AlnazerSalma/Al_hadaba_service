import { toast } from "react-hot-toast";

export const addToCart = (carCode) => {
  const cart = localStorage.getItem("cart");
  if (cart) {
    const newCart = JSON.parse(cart);
    const existedCar = newCart.find((item) => item === carCode);
    console.log(existedCar, "existedCar");
    console.log(carCode, "carCode");
    if (existedCar) {
      toast.error("This item is already in the cart");
    } else {
      newCart.push(carCode);
      localStorage.setItem("cart", JSON.stringify(newCart));
      toast.success("The car added successfully to the cart");
    }
  } else {
    localStorage.setItem("cart", JSON.stringify([carCode]));
    toast.success("The car added successfully to the cart");
  }
};

// get cart from local storage
export const getCart = () => {
  const cart = localStorage.getItem("cart");
  if (cart) {
    return JSON.parse(cart);
  } else {
    localStorage.setItem("cart", JSON.stringify([]));
    return [];
  }
};

// clear cart
export const clearCart = () => {
  localStorage.setItem("cart", JSON.stringify([]));
};

// remove one item from the cart
export const removeFromCart = (carCode) => {
  const cart = getCart();
  const newCart = cart.filter((item) => item !== carCode);
  localStorage.setItem("cart", JSON.stringify(newCart));
};
