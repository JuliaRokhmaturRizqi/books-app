
import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const FavoriteContext = createContext();

export const FavoriteProvider = ({ children }) => {
  const [favoriteItems, setFavoriteItems] = useState([]);

  // Load data saat aplikasi dibuka
  useEffect(() => {
    loadFavorites();
  }, []);

  // Simpan data setiap ada perubahan
  useEffect(() => {
    saveFavorites(favoriteItems);
  }, [favoriteItems]);

  const loadFavorites = async () => {
    try {
      const storedFav = await AsyncStorage.getItem("userFavorites");
      if (storedFav) {
        setFavoriteItems(JSON.parse(storedFav));
      }
    } catch (error) {
      console.error("Gagal memuat favorit", error);
    }
  };

  const saveFavorites = async (items) => {
    try {
      await AsyncStorage.setItem("userFavorites", JSON.stringify(items));
    } catch (error) {
      console.error("Gagal menyimpan favorit", error);
    }
  };

  // Fungsi Toggle (Jika ada hapus, jika tidak ada tambahkan)
  const toggleFavorite = (product) => {
    setFavoriteItems((prevItems) => {
      const isExist = prevItems.find((item) => item.id === product.id);
      if (isExist) {
        // Hapus dari favorit
        return prevItems.filter((item) => item.id !== product.id);
      } else {
        // Tambah ke favorit
        return [...prevItems, product];
      }
    });
  };

  // Helper untuk cek apakah item sudah difavoritkan
  const isFavorite = (id) => {
    return favoriteItems.some((item) => item.id === id);
  };

  return <FavoriteContext.Provider value={{ favoriteItems, toggleFavorite, isFavorite }}>{children}</FavoriteContext.Provider>;
};
