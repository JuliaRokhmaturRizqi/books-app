// CartContext.js
import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // 1. LOAD DATA SAAT APLIKASI DIBUKA (Persistence)
  useEffect(() => {
    loadCartData();
  }, []);

  // 2. SIMPAN DATA SETIAP KALI KERANJANG BERUBAH
  useEffect(() => {
    saveCartData(cartItems);
  }, [cartItems]);

  const loadCartData = async () => {
    try {
      const storedCart = await AsyncStorage.getItem("userCart");
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
    } catch (error) {
      console.error("Gagal memuat keranjang", error);
    }
  };

  const saveCartData = async (items) => {
    try {
      await AsyncStorage.setItem("userCart", JSON.stringify(items));
    } catch (error) {
      console.error("Gagal menyimpan keranjang", error);
    }
  };

  // --- FUNGSI-FUNGSI LOGIKA ---

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const itemExists = prevItems.find((item) => item.id === product.id);
      if (itemExists) {
        return prevItems.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
      } else {
        // Tambahkan property 'selected: true' secara default saat masuk keranjang
        return [...prevItems, { ...product, quantity: 1, selected: true }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, type) => {
    setCartItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.id === id) {
          const newQty = type === "plus" ? item.quantity + 1 : item.quantity - 1;
          return { ...item, quantity: newQty > 0 ? newQty : 1 };
        }
        return item;
      });
    });
  };

  const toggleSelection = (id) => {
    setCartItems((prevItems) => prevItems.map((item) => (item.id === id ? { ...item, selected: !item.selected } : item)));
  };

  const toggleSelectAll = (isAllSelected) => {
    setCartItems((prevItems) => prevItems.map((item) => ({ ...item, selected: !isAllSelected })));
  };

  // Hitung total item untuk Badge Ikon
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const removeCheckoutItems = (itemsToRemove) => {
    setCartItems((prevItems) => {
      // Ambil ID dari barang yang baru saja di-checkout
      const idsToRemove = itemsToRemove.map((item) => item.id);

      // Filter keranjang: Simpan barang yang TIDAK ada di daftar checkout
      return prevItems.filter((item) => !idsToRemove.includes(item.id));
    });
  };
  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        toggleSelection,
        toggleSelectAll,
        totalItems,
        removeCheckoutItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
