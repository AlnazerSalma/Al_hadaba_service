import React from "react";
import { useContext, useEffect, useState } from "react";
import { Offcanvas, Stack } from "react-bootstrap";
import { getCartCarList } from "../../utils/carUtils";
import { Globalstate } from "../../context/GlobalState";
import { clearCart, getCart, removeFromCart } from "../../utils/cart";
import CartItem from "./CartItem";
import { Link, useNavigate } from "react-router-dom";

const Cart = ({ isOpen }) => {
  const state = useContext(Globalstate);
  const [cars] = state.cars;
  const [refetch, setRefetch] = state.refetch;
  const [cartCarList, setCartCarList] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [cartIsOpen, setCartIsOpen] = state.cartIsOpen;
  const [refreshCart, setRefreshCart] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  const navigate = useNavigate();
  const handleShowCart = () => {
    const cartCars = getCartCarList(getCart(), cars);
    setCartCarList([...cartCars]);
  };
  console.log(cartCarList);

  const getTotalPrice = () => {
    let total = 0;
    cartCarList?.forEach((item) => {
      if (typeof item?.buyPrice === "number") {
        total += item?.buyPrice;
      }
    });
    setTotalPrice(total);
  };
  useEffect(() => {
    handleShowCart();
  }, [cars, refreshCart, cartIsOpen]);
  useEffect(() => {
    getTotalPrice();
  }, [cartCarList]);
  const closeCart = () => {
    setCartIsOpen(false);
  };
  const removeCarFromCart = (carCode) => {
    removeFromCart(carCode);
    setRefreshCart(!refreshCart);
  };
  const clearAllCartItems = () => {
    clearCart();
    setCartCarList([]);
  };
  const navigateToOrder = () => {
    navigate("/order");
    setCartIsOpen(false);
  };

  return (
    <Offcanvas
      show={cartIsOpen}
      onHide={closeCart}
      placement="end"
      className="cart-offcanvas"
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className="cart-body">
        <Stack gap={3}>
          {cartCarList?.length > 0 ? (
            cartCarList.map((item) => (
              <CartItem
                key={item?.carCode}
                car={item}
                removeItem={removeCarFromCart}
              />
            ))
          ) : (
            <div>Your cart is empty</div>
          )}
          <div className="ms-auto fw-bold fs-5">Total Price: ${totalPrice}</div>
          <div className="mt-3">
            <button
              className="btn btn-success text-white btn-sm w-100 w-md-auto"
              onClick={navigateToOrder}
            >
              Reserve now
            </button>
          </div>
          <div className="mt-3">
            <button
              className="btn btn-danger btn-sm w-100 w-md-auto"
              onClick={clearAllCartItems}
            >
              Clear Cart
            </button>
          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default Cart;
