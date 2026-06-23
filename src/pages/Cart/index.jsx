import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, Alert } from "react-native";
import { useState, useEffect, useContext } from "react"; // Tambah useContext
import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { CartContext } from "../../components/molecule/CartContext";

export default function Card({ navigation }) {
  // 1. Ambil Data dan Fungsi dari Context
  const { cartItems, removeFromCart, updateQuantity, toggleSelection, toggleSelectAll } = useContext(CartContext);

  const [totalPrice, setTotalPrice] = useState(0);
  const [isAllSelected, setIsAllSelected] = useState(false);

  // 2. Hitung Total Harga berdasarkan cartItems dari Context
  useEffect(() => {
    let total = 0;
    let allSelected = true;

    if (cartItems.length === 0) {
      allSelected = false;
    } else {
      cartItems.forEach((item) => {
        if (item.selected) {
          total += item.price * item.quantity;
        } else {
          allSelected = false;
        }
      });
    }

    setTotalPrice(total);
    setIsAllSelected(cartItems.length > 0 && allSelected);
  }, [cartItems]);

  // Format Rupiah
  const formatRupiah = (number) => {
    return "Rp " + number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  // Handle Hapus dengan Alert
  const handleCheckout = () => {
    // Ambil hanya item yang properti 'selected'-nya true
    const selectedItems = cartItems.filter((item) => item.selected);

    if (selectedItems.length === 0) {
      Alert.alert("Ops!", "Kamu belum memilih produk untuk dicheckout.");
      return;
    }

    // Navigasi dengan membawa data yang sudah difilter
    navigation.navigate("Checkout", {
      items: selectedItems,
    });
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      {/** Checkbox */}
      <TouchableOpacity onPress={() => toggleSelection(item.id)} style={styles.checkboxContainer}>
        <Ionicons name={item.selected ? "checkbox" : "square-outline"} size={24} color={item.selected ? "#4CD1E5" : "#ccc"} />
      </TouchableOpacity>

      {/* Image */}
      <TouchableOpacity>
        <Image source={item.image} style={styles.bookImage} />
      </TouchableOpacity>

      {/* Details */}
      <View style={styles.detailsContainer}>
        <View style={styles.BoxText}>
          <View style={{ flex: 1 }}>
            <Text style={styles.bookTitle} numberOfLines={2}>
              {item.title}
            </Text>
            <Text style={styles.bookPrice}>{formatRupiah(item.price)}</Text>
          </View>
          {/* Tombol Hapus */}
          <TouchableOpacity style={styles.deleteButton} onPress={() => removeFromCart(item.id)}>
            <Text style={styles.deleteText}>Hapus</Text>
          </TouchableOpacity>
        </View>

        {/* Quantity Controller */}
        <View style={styles.qtyContainer}>
          <TouchableOpacity onPress={() => updateQuantity(item.id, "minus")} style={styles.qtyButton}>
            <Text style={styles.qtyButtonText}>-</Text>
          </TouchableOpacity>
          <View style={styles.qtyValueContainer}>
            <Text style={styles.qtyValue}>{item.quantity}</Text>
          </View>
          <TouchableOpacity onPress={() => updateQuantity(item.id, "plus")} style={styles.qtyButton}>
            <Text style={styles.qtyButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaProvider style={styles.container}>
      <SafeAreaView style={styles.container}>
        {/** Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Keranjang</Text>
          <View style={{ width: 24 }} />
        </View>

        {/** List item */}
        {cartItems.length > 0 ? (
          <FlatList data={cartItems} renderItem={renderItem} keyExtractor={(item) => item.id.toString()} contentContainerStyle={styles.listContainer} showsVerticalScrollIndicator={false} />
        ) : (
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Ionicons name="cart-outline" size={60} color="#ccc" />
            <Text style={{ color: "#888", marginTop: 10 }}>Keranjang Kosong</Text>
          </View>
        )}

        {/** Footer */}
        <View style={styles.footer}>
          <View style={styles.footerLeft}>
            <TouchableOpacity onPress={() => toggleSelectAll(isAllSelected)} style={styles.selectAllContainer}>
              <Ionicons name={isAllSelected ? "checkbox" : "square-outline"} size={24} color={isAllSelected ? "#4CD1E5" : "#aaa"} />
              <Text style={styles.selectAllText}>Semua</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footerMiddle}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalPrice}>{formatRupiah(totalPrice)}</Text>
          </View>

          <TouchableOpacity
            style={styles.checkoutButton}
            onPress={() => {
              // 1. Filter hanya item yang dipilih (selected == true)
              const selectedItems = cartItems.filter((item) => item.selected);

              if (selectedItems.length === 0) {
                Alert.alert("Peringatan", "Pilih minimal satu produk untuk checkout.");
                return;
              }

              navigation.navigate("Checkout", {
                items: selectedItems,
              });
            }}
          >
            <Text style={styles.checkoutText}>Checkout ({cartItems.filter((i) => i.selected).reduce((acc, curr) => acc + curr.quantity, 0)})</Text>
          </TouchableOpacity>
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F2F1",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#354B4E",
  },
  backButton: {
    padding: 4,
    backgroundColor: "#F1F2F1",
    borderRadius: 8,
  },
  listContainer: {
    padding: 16,
    paddingBottom: 100,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#F1F2F1",
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    alignItems: "center",
    elevation: 2,
  },
  checkboxContainer: {
    marginRight: 10,
  },
  bookImage: {
    width: 60,
    height: 90,
    borderRadius: 4,
    marginRight: 12,
    backgroundColor: "#ccc",
    resizeMode: "cover",
  },
  detailsContainer: {
    flex: 1,
    height: 90,
    justifyContent: "space-between",
  },
  BoxText: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#555",
    paddingRight: 5,
  },
  bookPrice: {
    fontSize: 14,
    color: "#888",
    marginTop: 4,
  },
  deleteButton: {
    padding: 5,
  },
  deleteText: {
    color: "red",
    fontSize: 12,
    fontWeight: "bold",
  },
  qtyContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end",
  },
  qtyButton: {
    width: 28,
    height: 28,
    borderWidth: 1,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    backgroundColor: "#fff",
  },
  qtyButtonText: {
    fontSize: 16,
    color: "#555",
  },
  qtyValueContainer: {
    width: 30,
    alignItems: "center",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    height: 28,
    justifyContent: "center",
  },
  qtyValue: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    flexDirection: "row",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    height: 90,
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  footerLeft: {
    width: "25%",
    justifyContent: "center",
  },
  selectAllContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  selectAllText: {
    marginLeft: 8,
    color: "#666",
    fontSize: 14,
  },
  footerMiddle: {
    flex: 1,
    alignItems: "flex-end",
    paddingRight: 16,
    justifyContent: "center",
  },
  totalLabel: {
    fontSize: 10,
    color: "#888",
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#555",
  },
  checkoutButton: {
    backgroundColor: "#4CD1E5",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  checkoutText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
