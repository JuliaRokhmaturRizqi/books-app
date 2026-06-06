import { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, Modal, TextInput } from "react-native";
import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { OrderContext } from "../../components/molecule/OrderContext";
import { CartContext } from "../../components/molecule/CartContext";

export default function Checkout({ navigation, route }) {
  // Format items harus array: [{ product, quantity }]
  const { items = [] } = route.params || {};
  const { addOrder } = useContext(OrderContext);

  const { removeCheckoutItems } = useContext(CartContext);

  // --- STATE ALAMAT (Default) ---
  const [addressData, setAddressData] = useState({
    name: "Krysle Vya",
    phone: "(+62)823-5634-8813",
    address: "Jakarta Barat",
    postalCode: "ID 45362",
  });

  // --- 1. STATE UNTUK METODE PEMBAYARAN ---
  const [paymentMethod, setPaymentMethod] = useState({
    type: "Transfer Bank",
    name: "Bank BRI",
    icon: null,
  });

  // --- 2. STATE UNTUK MODAL POP-UP ---
  const [modalVisible, setModalVisible] = useState(false);

  // --- CEK UPDATE ALAMAT ---
  useEffect(() => {
    if (route.params?.updatedAddress) {
      setAddressData(route.params.updatedAddress);
    }
  }, [route.params?.updatedAddress]);

  // --- CEK UPDATE PEMBAYARAN ---
  useEffect(() => {
    if (route.params?.selectedPayment) {
      setPaymentMethod(route.params.selectedPayment);
    }
  }, [route.params?.selectedPayment]);

  // Hitung Total Harga Produk
  const subtotalProduk = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const biayaPengiriman = 5000;
  const totalPembayaran = subtotalProduk + biayaPengiriman;

  // --- FUNGSI SAAT TOMBOL BUAT PESANAN DIKLIK ---
  const handleBuatPesanan = () => {
    // Tampilkan Modal Custom
    setModalVisible(true);
  };

  // --- FUNGSI SAAT TOMBOL OK DI MODAL DIKLIK ---
  const handleCloseModal = () => {
    setModalVisible(false);

    // 1. BUAT OBJECT PESANAN BARU
    const newOrder = {
      id: `ORD-${Math.floor(Math.random() * 10000)}`, // ID Acak
      date: new Date().toLocaleDateString("id-ID"),
      status: "Dikemas", // Status Awal: "Dikemas" / "Diproses"
      items: items,
      total: totalPembayaran,
      address: addressData,
      payment: paymentMethod,
    };

    //  SIMPAN KE GLOBAL STATE
    addOrder(newOrder);
    //  HAPUS BARANG DARI KERANJANG (Langkah Penting)
    removeCheckoutItems(items);

    //  NAVIGASI KE TAB PESANAN (MyOrder)
    // Pastikan nama screen di Navigator Anda adalah "MyOrder"
    navigation.reset({
      index: 0,
      routes: [{ name: "MainApp" }, { name: "MyOrder" }],
    });
    // Atau jika MyOrder ada di dalam tab navigator, sesuaikan navigasinya.
    // navigation.navigate("MyOrder");
  };

  return (
    <SafeAreaProvider style={{ backgroundColor: "#fff" }}>
      <SafeAreaView style={{ flex: 1 }}>
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Checkout</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          {/* ALAMAT PENGIRIMAN */}
          <TouchableOpacity style={styles.sectionCard} onPress={() => navigation.navigate("EditAlamat", { currentAddress: addressData })}>
            <View style={styles.rowStart}>
              <Ionicons name="location-outline" size={20} color="#333" style={{ marginRight: 10 }} />
              <View style={{ flex: 1 }}>
                <Text style={styles.sectionLabel}>Alamat Pengiriman</Text>
                <Text style={styles.addressText}>
                  {addressData.name} | {addressData.phone}
                </Text>
                <Text style={styles.addressText}>
                  {addressData.address} {addressData.postalCode}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#ccc" />
            </View>
          </TouchableOpacity>

          {/* LIST PRODUK YANG DIBELI */}
          {items.map((item, index) => (
            <View key={index} style={styles.productCard}>
              <Image source={item.image} style={styles.productImage} />
              <View style={styles.productInfo}>
                <Text style={styles.productTitle}>{item.title}</Text>
                <View style={styles.productPriceRow}>
                  <Text style={styles.productPrice}>Rp{item.price.toLocaleString("id-ID")}</Text>
                  <Text style={styles.productQty}>x{item.quantity}</Text>
                </View>
              </View>
            </View>
          ))}

          {/* OPSI PENGIRIMAN & PEMBAYARAN */}
          <View style={styles.sectionCard}>
            <Text style={styles.sectionHeader}>Opsi Pengiriman</Text>

            <TouchableOpacity style={styles.rowBetween}>
              <View>
                <Text style={styles.optionTitle}>Reguler</Text>
              </View>
              <View style={styles.rowCenter}>
                <Ionicons name="cube-outline" size={16} color="#333" style={{ marginRight: 5 }} />
                <Text style={styles.optionValue}>Rp 5.000</Text>
                <Ionicons name="chevron-forward" size={18} color="#ccc" style={{ marginLeft: 5 }} />
              </View>
            </TouchableOpacity>

            <View style={styles.divider} />

            <View style={styles.rowBetween}>
              <Text style={styles.optionTitle}>Pesan</Text>
              <TextInput placeholder="Silahkan tinggalkan pesan..." style={styles.inputMessage} textAlign="right" />
            </View>

            <View style={styles.divider} />

            <View style={styles.rowBetween}>
              <Text style={styles.optionTitle}>Total Pesanan ({items.length} Produk):</Text>
              <Text style={styles.subtotalText}>Rp {subtotalProduk.toLocaleString("id-ID")}</Text>
            </View>

            <View style={styles.divider} />

            <TouchableOpacity style={styles.rowBetween} onPress={() => navigation.navigate("PaymentMethod", { currentPayment: paymentMethod })}>
              <View style={styles.rowCenter}>
                <Ionicons name={paymentMethod.type === "COD" ? "cash-outline" : "card-outline"} size={20} color="#333" style={{ marginRight: 5 }} />
                <Text style={styles.optionTitle}>Metode Pembayaran</Text>
              </View>
              <View style={styles.rowCenter}>
                <Text style={styles.optionValue}>{paymentMethod.name}</Text>
                <Ionicons name="chevron-forward" size={18} color="#ccc" style={{ marginLeft: 5 }} />
              </View>
            </TouchableOpacity>

            <View style={styles.thickDivider} />

            {/* RINCIAN PEMBAYARAN */}
            <View style={{ marginTop: 10 }}>
              <View style={styles.rowStart}>
                <Ionicons name="document-text-outline" size={18} color="#333" style={{ marginRight: 5 }} />
                <Text style={styles.sectionHeader}>Rincian Pembayaran</Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Subtotal Untuk Produk</Text>
                <Text style={styles.detailValue}>Rp {subtotalProduk.toLocaleString("id-ID")}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Subtotal Pengiriman</Text>
                <Text style={styles.detailValue}>Rp {biayaPengiriman.toLocaleString("id-ID")}</Text>
              </View>

              <View style={[styles.detailRow, { marginTop: 10 }]}>
                <Text style={styles.totalLabel}>Total Pembayaran</Text>
                <Text style={styles.totalValueMain}>Rp{totalPembayaran.toLocaleString("id-ID")}</Text>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* BOTTOM BAR */}
        <View style={styles.bottomBar}>
          <View style={styles.bottomTotalContainer}>
            <Text style={styles.bottomLabel}>Total Pembayaran</Text>
            <Text style={styles.bottomPrice}>Rp{totalPembayaran.toLocaleString("id-ID")}</Text>
          </View>
          <TouchableOpacity style={styles.checkoutButton} onPress={handleBuatPesanan}>
            <Text style={styles.checkoutButtonText}>Buat Pesanan</Text>
          </TouchableOpacity>
        </View>

        {/* --- MODAL POP UP --- */}
        <Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={handleCloseModal}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              {/* Icon Checkmark Biru */}
              <View style={styles.successIconContainer}>
                <Ionicons name="checkmark" size={30} color="#fff" />
              </View>

              <Text style={styles.modalTitle}>Berhasil....!</Text>
              <Text style={styles.modalSubtitle}>Pembelian berhasil di buat</Text>

              <TouchableOpacity style={styles.modalButton} onPress={handleCloseModal}>
                <Text style={styles.modalButtonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  // Header
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#354B4E",
  },
  backButton: {
    padding: 5,
    backgroundColor: "#F1F2F1",
    borderRadius: 8,
  },

  scrollContent: {
    padding: 15,
    paddingBottom: 100,
  },

  // General Card Style
  sectionCard: {
    backgroundColor: "#F1F2F1",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 1,
  },
  rowStart: {
    flexDirection: "row",
    alignItems: "center",
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  rowCenter: {
    flexDirection: "row",
    alignItems: "center",
  },

  // Address
  sectionLabel: {
    fontSize: 12,
    color: "#888",
    marginBottom: 5,
  },
  addressText: {
    fontSize: 13,
    color: "#333",
    fontWeight: "500",
    lineHeight: 18,
  },

  // Product
  productCard: {
    backgroundColor: "#F1F2F1",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  productImage: {
    width: 60,
    height: 90,
    borderRadius: 5,
    marginRight: 15,
    resizeMode: "cover",
  },
  productInfo: {
    flex: 1,
    height: 80,
    justifyContent: "space-between",
  },
  productTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  productPriceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  productPrice: {
    fontSize: 14,
    color: "#666",
  },
  productQty: {
    fontSize: 14,
    color: "#888",
  },

  // Options & Details
  sectionHeader: {
    fontSize: 14,
    color: "#888",
    marginBottom: 5,
  },
  optionTitle: {
    fontSize: 14,
    color: "#333",
  },
  optionValue: {
    fontSize: 14,
    color: "#333",
    fontWeight: "600",
  },
  inputMessage: {
    flex: 1,
    fontSize: 13,
    color: "#333",
    padding: 0,
  },
  subtotalText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },

  divider: {
    height: 1,
    backgroundColor: "#F0F0F0",
    marginVertical: 5,
  },
  thickDivider: {
    height: 6,
    backgroundColor: "#F8F8F8",
    marginHorizontal: -15,
    marginVertical: 10,
  },

  // Payment Details
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  detailLabel: {
    fontSize: 13,
    color: "#888",
  },
  detailValue: {
    fontSize: 13,
    color: "#333",
  },
  totalLabel: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  totalValueMain: {
    fontSize: 16,
    color: "#4CC9F0",
    fontWeight: "bold",
  },

  // Bottom Bar
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    padding: 20,
    paddingBottom: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#EEE",
    elevation: 10,
  },
  bottomTotalContainer: {
    justifyContent: "center",
  },
  bottomLabel: {
    fontSize: 12,
    color: "#888",
  },
  bottomPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4CC9F0",
  },
  checkoutButton: {
    backgroundColor: "#4CC9F0",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  checkoutButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  // --- STYLE BARU UNTUK MODAL ---
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "70%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    elevation: 5,
  },
  successIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#4CC9F0",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4CC9F0",
    marginBottom: 5,
  },
  modalSubtitle: {
    fontSize: 12,
    color: "#555",
    textAlign: "center",
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: "#4CC9F0",
    paddingVertical: 8,
    paddingHorizontal: 25,
    borderRadius: 6,
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
});
