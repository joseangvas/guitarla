import { useState, useEffect } from 'react'
import { db } from "../data/db";

export function useCart() {
  const initialCart = () => {
    const localStorageCart = localStorage.getItem("cart"); // Obtener  el carrito de compras del Local Storage
    return localStorageCart ? JSON.parse(localStorageCart) : []; // Si existe algo  en el local storage lo parsea y devuelve el arreglo. De lo contrario, devuelve un arreglo vacío
  };

  const [data] = useState(db);
  const [cart, setCart] = useState(initialCart);

  const MIN_ITEMS = 1;
  const MAX_ITEMS = 5;

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart)); // Convierte arreglo cart en String y lo almacena en localStorage
  }, [cart]);

  //* Agregar  a la cesta de compras
  function addToCart(item) {
    const itemExists = cart.findIndex((guitar) => guitar.id === item.id);
    if (itemExists >= 0) {
      // Verificar si Existe en el Carrito
      if (cart[itemExists].quantity >= MAX_ITEMS) return; // Si tiene mas de un Item agregarlo
      const updatedCart = [...cart]; // Crea una copia del carrito actual para no mutar cart.
      updatedCart[itemExists].quantity++;
      setCart(updatedCart);
      console.log("Esta Guitarra ya está en el Carrito");
    } else {
      item.quantity = 1;
      setCart([...cart, item]);
    }
  }

  //* Eliminar  de la lista de productos y del carrito
  function removeFromCart(id) {
    setCart((prevCart) => prevCart.filter((guitar) => guitar.id !== id));
  }

  //* Reducir Cantidad de Guitarras en el Carrito
  function decreaseQuantity(id) {
    const updatedCart = cart.map((item) => {
      if (item.id === id && item.quantity > MIN_ITEMS) {
        return { ...item, quantity: item.quantity - 1 };
      }

      return item;
    });

    setCart(updatedCart);
  }

  //* Aumentar la cantidad de guitarras en el Carrito
  function increaseQuantity(id) {
    const updatedCart = cart.map((item) => {
      if (item.id === id && item.quantity < MAX_ITEMS) {
        return { ...item, quantity: item.quantity + 1 };
      }

      return item;
    });

    setCart(updatedCart);
  }

  //* Limpiar el Carrito
  function clearCart(e) {
    setCart([]);
  }
  
  return {
      data,
      cart,
      addToCart,
      removeFromCart,
      increaseQuantity,
      decreaseQuantity,
      clearCart
  }
}

