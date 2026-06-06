import React, { createContext, useState } from "react";

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  // State untuk menyimpan semua pesanan
  // Status: 'Dikemas', 'Dikirim', 'Selesai', 'Dibatalkan'
  const [orders, setOrders] = useState([]);

  const addOrder = (newOrder) => {
    // Tambahkan pesanan baru ke awal array
    setOrders((prevOrders) => [newOrder, ...prevOrders]);
  };

  return <OrderContext.Provider value={{ orders, addOrder }}>{children}</OrderContext.Provider>;
};
