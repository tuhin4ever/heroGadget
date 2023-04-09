//* Add data to local storage

const addToDb = (id) => {
  // localStorage.setItem('shopping-cart', id);
  let shoppingCart = {};

  //* get previous data from local storage
  const storedCart = localStorage.getItem("shopping-cart");
  if (storedCart) {
    shoppingCart = JSON.parse(storedCart);
  }

  //* add quantity
  const quantity = shoppingCart[id];
  if (quantity) {
    const newQuantity = quantity + 1;
    shoppingCart[id] = newQuantity;
  } else {
    shoppingCart[id] = 1;
  }

  //* set item from local storage
  localStorage.setItem("shopping-cart", JSON.stringify(shoppingCart));
};

//? Get stored data from cart
const getStoredCart = () => {
  let shoppingCart = {};

  //! get previous data from local storage
  const storedCart = localStorage.getItem("shopping-cart");
  if (storedCart) {
    shoppingCart = JSON.parse(storedCart);
  }
  return shoppingCart;
};

//* Remove a specific element from local storage
const removeFromDb = (id) => {
  const storedCart = localStorage.getItem("shopping-cart");
  if (storedCart) {
    const shoppingCart = JSON.parse(storedCart);
    if (id in shoppingCart) {
      delete shoppingCart[id];
      localStorage.setItem("shopping-cart", JSON.stringify(shoppingCart));
    }
  }
};

//* Clear all data from local storage
const deleteShoppingCart = () => localStorage.removeItem('shopping-cart') 

export { addToDb, getStoredCart,removeFromDb,deleteShoppingCart };
