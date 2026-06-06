import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MyFoto } from "../../assets/image"; // Pastikan path ini benar

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // Data Awal Default
  const defaultUser = {
    name: "Krysie Vya",
    username: "Vya",
    gender: "Perempuan",
    email: "Vya12@gmail.com",
    phone: "+62 895 6342 5521",
    image: MyFoto,
  };

  const [userData, setUserData] = useState(defaultUser);

  // 1. Load data dari HP saat aplikasi dibuka
  useEffect(() => {
    const loadData = async () => {
      try {
        const savedData = await AsyncStorage.getItem("USER_PROFILE");
        if (savedData) {
          setUserData(JSON.parse(savedData));
        }
      } catch (error) {
        console.log("Gagal memuat profil", error);
      }
    };
    loadData();
  }, []);

  // 2. Fungsi untuk update data & simpan ke HP
  const updateUserData = async (newData) => {
    try {
      setUserData(newData); // Update State Aplikasi (Langsung berubah)
      await AsyncStorage.setItem("USER_PROFILE", JSON.stringify(newData)); // Simpan Permanen
    } catch (error) {
      console.log("Gagal menyimpan profil", error);
    }
  };

  return <UserContext.Provider value={{ userData, updateUserData }}>{children}</UserContext.Provider>;
};
