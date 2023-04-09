import React, { useContext, useEffect, useState } from "react";
import {
  deleteShoppingCart,
  getStoredCart,
  removeFromDb,
} from "../utils/fakeDB";
import { Link, useLoaderData } from "react-router-dom";
import CartItem from "./Cards/CartItem";
import { CartContext } from "../App";
import { toast } from "react-hot-toast";

const Cart = () => {
  const [cart, setCart] = useContext(CartContext);

  let total = 0;
  if (cart.length > 0) {
    for (const product of cart) {
      total = total + product.price * product.quantity;
    }
  }

  //* Remove item from shopping cart
  const handleRemoveItem = (id) => {
    const remaining = cart.filter((product) => product.id !== id);
    setCart(remaining);
    removeFromDb(id);
    toast.error('Product Removed! 🔥')
  };

  //* place order
  const orderHandler = () => {
    if (cart.length > 0) {
      setCart([]);
      deleteShoppingCart();
      return toast.success("Order Placed! 🔥");
    } else {
      return toast.error("Cart is empty! 👍");
    }
  };

  //* Clear cart
  const deleteCartHandler = () => {
    if (cart.length) {
      setCart([]);
      deleteShoppingCart();
      return toast.error("All Items Removed! 🔥");
    }
    return toast.error("Cart is empty! 🔥");
  };

  // // const cartData =localStorage.getItem('shopping-cart');
  // // console.log(cartData) //* go to fakeDB
  // const [cart, setCart] = useState([])
  // const pData = useLoaderData();
  // // console.log(pData)
  // useEffect(() => {
  //     const savedCart = getStoredCart()
  //     let newArray = []
  //     for (const id in savedCart){
  //         const foundProduct = pData.find(product => product.id === id)
  //         if(foundProduct){
  //             foundProduct.quantity = savedCart[id]
  //             newArray.push(foundProduct)
  //         }
  //         setCart(newArray)
  //     }
  // }, [])
  // console.log(cart)
  return (
    <div className="flex min-h-screen items-start justify-center bg-gray-100 text-gray-900">
      <div className="flex flex-col max-w-3xl p-6 space-y-4 sm:p-10 ">
        <h2 className="text-xl font-semibold">
          {cart.length ? "Review Cart Items" : "Cart is EMPTY!"}
        </h2>
        <ul className="flex flex-col divide-y divide-gray-700">
          {cart.map((product) => (
            <CartItem
              handleRemoveItem={handleRemoveItem}
              key={product.id}
              product={product}
            />
          ))}
        </ul>
        <div className="space-y-1 text-right">
          <p>
            Total amount: <span className="font-semibold">{total}$</span>
          </p>
          <p className="text-sm text-gray-400">
            Not including taxes and shipping costs
          </p>
        </div>
        <div className="flex justify-end space-x-4">
          {cart.length > 0 ? (
            <button onClick={deleteCartHandler} className="btn-outlined">
              Clear Order
            </button>
          ) : (
            <Link to="/shop">
              <button className="btn-outlined">Back To Shop</button>
            </Link>
          )}
          <button onClick={orderHandler} className="btn-primary">
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
