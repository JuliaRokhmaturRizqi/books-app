import React, { useState, useContext } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList, ScrollView } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Book1, Book2, Book3, Book4 } from "../../assets/image";
import { OrderContext } from "../../components/molecule/OrderContext"; // Pastikan path benar

export default function MyOrder({ navigation }) {
  const [activeTab, setActiveTab] = useState("Semua");

  // 1. Ambil data pesanan baru dari Context
  const { orders } = useContext(OrderContext);

  // 2. Data Dummy Awal (Statis)
  const initialOrderData = [
    {
      id: "1",
      title: "The Sherlock Holmes",
      orderId: "Order ID 538211",
      price: 108000,
      status: "Proses", // Sesuaikan dengan nama Tab "Proses"
      image: Book1,
    },
    {
      id: "2",
      title: "Mariposa",
      orderId: "Order ID 648322",
      price: 119000,
      status: "Pengiriman",
      image: Book2,
    },
    {
      id: "3",
      title: "Love Scenario",
      orderId: "Order ID 846293",
      price: 70000,
      status: "Pengiriman",
      image: Book3,
    },
    {
      id: "4",
      title: "Dikta & Hukum",
      orderId: "Order ID 562832",
      price: 85000,
      status: "Proses",
      image: Book4,
    },
    {
      id: "5",
      title: "Bumi Manusia",
      orderId: "Order ID 112233",
      price: 135000,
      status: "Selesai",
      image: Book1,
    },
    {
      id: "6",
      title: "Laskar Pelangi",
      orderId: "Order ID 998877",
      price: 95000,
      status: "Selesai",
      image: Book2,
    },
  ];

  // 3. Gabungkan Data Dummy + Data Context (Format Pesanan Baru Harus Disesuaikan)
  // Data dari Context mungkin punya struktur beda (array items), kita ambil item pertamanya untuk display list
  const formattedNewOrders = orders.map((order) => ({
    id: order.id,
    title: order.items[0]?.title || "Pesanan Baru", // Ambil judul buku pertama
    orderId: order.id,
    price: order.total,
    status: order.status === "Dikemas" ? "Proses" : order.status, // Mapping status "Dikemas" ke "Proses"
    image: order.items[0]?.image || Book1, // Ambil gambar buku pertama
  }));

  const combinedData = [...formattedNewOrders, ...initialOrderData];

  // 4. Filter Data Berdasarkan Tab Aktif
  const filteredOrders = activeTab === "Semua" ? combinedData : combinedData.filter((item) => item.status === activeTab);

  // Tab Kategori
  const tabs = ["Semua", "Proses", "Pengiriman", "Selesai"];

  // Helper Color
  const getStatusColor = (status) => {
    // Bisa disesuaikan warnanya per status jika mau beda
    return "#F1F2F1";
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.bookImage} />

      <View style={styles.cardDetails}>
        <Text style={styles.bookTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.orderId}>{item.orderId}</Text>
        <Text style={styles.price}>Rp{item.price.toLocaleString("id-ID")}</Text>
      </View>

      <View style={styles.actionContainer}>
        <TouchableOpacity style={[styles.statusButton, { backgroundColor: getStatusColor(item.status) }]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaProvider style={{ backgroundColor: "#fff" }}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Pesanan Saya</Text>
          <View style={{ width: 40 }} />
        </View>

        <View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabContainer}>
            {tabs.map((tab, index) => (
              <TouchableOpacity key={index} style={[styles.tab, activeTab === tab && styles.activeTab]} onPress={() => setActiveTab(tab)}>
                <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.listContainer}>
          <FlatList
            data={filteredOrders}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
            ListEmptyComponent={
              <View style={styles.emptyState}>
                <Ionicons name="document-text-outline" size={50} color="#ccc" />
                <Text style={{ color: "#aaa", marginTop: 10 }}>Tidak ada pesanan di status ini</Text>
              </View>
            }
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  backButton: {
    backgroundColor: "#F1F2F1",
    padding: 8,
    borderRadius: 8,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#354B4E",
  },
  tabContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 10,
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: "#F1F2F1",
    marginRight: 10,
  },
  activeTab: {
    backgroundColor: "#44C7EA",
  },
  tabText: {
    color: "#707070",
    fontWeight: "600",
  },
  activeTabText: {
    color: "#fff",
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#F9F9F9",
    borderRadius: 12,
    padding: 12,
    marginBottom: 15,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  bookImage: {
    width: 70,
    height: 100,
    borderRadius: 8,
    resizeMode: "cover",
    marginRight: 15,
  },
  cardDetails: {
    flex: 1,
    justifyContent: "center",
    gap: 4,
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  orderId: {
    fontSize: 12,
    color: "#888",
    marginBottom: 5,
  },
  price: {
    fontSize: 14,
    color: "#555",
    fontWeight: "500",
  },
  actionContainer: {
    justifyContent: "space-between",
    alignItems: "flex-end",
    height: "100%",
    marginTop: 25,
  },
  statusButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderColor: "#44C7EA",
    borderWidth: 1,
    marginTop: 40,
  },
  statusText: {
    color: "#44C7EA",
    fontSize: 12,
    fontWeight: "bold",
  },
  emptyState: {
    alignItems: "center",
    marginTop: 50,
  },
});
