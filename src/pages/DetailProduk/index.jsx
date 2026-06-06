import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Alert } from "react-native";
import React, { useState, useContext } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Book2 } from "../../assets/image";
import { CartContext } from "../../components/molecule/CartContext";

// --- DATA DUMMY ULASAN ---
const REVIEWS_DATA = [
  {
    id: 1,
    user: "Rina Safitri",
    date: "20 Des 2025",
    rating: 5,
    comment: "Bukunya bagus banget! Ceritanya menyentuh, packing aman dan pengiriman cepat.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 2,
    user: "Dimas Anggara",
    date: "18 Des 2025",
    rating: 4,
    comment: "Kualitas kertas oke, cuma covernya ada sedikit tekukan di ujung. Tapi overall puas.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 3,
    user: "Siti Nurhaliza",
    date: "15 Des 2025",
    rating: 5,
    comment: "Suka banget sama endingnya! Recommended buat yang suka genre romance.",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
  },
];

export default function DetailProduk({ navigation, route }) {
  const { addToCart, totalItems } = useContext(CartContext);
  const paramsBook = route.params?.book;

  const defaultBook = {
    id: "999",
    title: "Unwanted Bond",
    price: 99000,
    image: Book2,
    rating: 5.0,
    author: "Yeny Kristina",
    description: "Sinopsis default...",
  };

  const product = paramsBook || defaultBook;
  const [isExpanded, setIsExpanded] = useState(false);

  const sinopsisFull = `Kau serius akan memanggil ibuku dengan sebutan "Ibu"?(Leean)

Tidak Tahu, Apakah kau punya laki-laki lain untuk diajak menikah?(Jaehyun)

Punya (Leean)

Oke tidak masalah. Tapi saranku tidak usah memikirkannya, karena itu tidak akan pernah terjadi.

Leean ingin menganggap ucapan Jaehyun bercanda, tetapi justru hatinya terus berdebar? Padahal leean yakin 100% ia dan Jaehyun menolak keras saat keduanya dijodohkan. Keputusan mereka (seharusnya) tetap sama.

Meskipun Jaehyun berhasil mencuri ciuman pertamanya, itu bukan alasan untuk jatuh pada pesona laki-laki itu, kan? Apalagi saat Leean mengetahui bahwa Jaehyun masih terikat dengan cinta pertamanya.`;

  const getDisplayText = () => {
    if (isExpanded) {
      return sinopsisFull;
    }
    return sinopsisFull.slice(0, 100) + "...";
  };

  const handleAddToCart = () => {
    addToCart(product);
    Alert.alert("Sukses", "Buku berhasil ditambahkan ke keranjang!");
  };

  // --- FUNGSI RENDER BINTANG ---
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(<Ionicons key={i} name={i <= rating ? "star" : "star-outline"} size={14} color="#FFD700" style={{ marginRight: 2 }} />);
    }
    return <View style={{ flexDirection: "row" }}>{stars}</View>;
  };

  return (
    <SafeAreaProvider style={{ backgroundColor: "#ffffff" }}>
      <SafeAreaView style={{ flex: 1 }}>
        {/** Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} style={styles.tabBack} />
          </TouchableOpacity>
          <Text style={styles.titleHeader}>Detail Produk</Text>

          <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
            <View>
              <Ionicons name="cart-outline" size={30} color="#707070" />
              {totalItems > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{totalItems}</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} style={{ marginHorizontal: 30 }} contentContainerStyle={{ paddingBottom: 100 }}>
          {/** Box Detail */}
          <View style={styles.ContainerBox}>
            <View style={styles.BoxImage}>
              <Image source={product.image} style={{ width: 210, height: 320, resizeMode: "cover", borderRadius: 5 }} />
            </View>
            <View style={styles.BoxDetail}>
              <View style={{ marginVertical: 20 }}>
                <Text style={styles.TextA}>43</Text>
                <Text style={styles.TextB}>Stok</Text>
              </View>
              <View style={styles.BoxTitle}>
                <Text style={styles.TextA}>15</Text>
                <Text style={styles.TextB}>Terjual</Text>
              </View>
              <View style={styles.BoxTitle}>
                <Text style={styles.TextA}>{product.rating}</Text>
                <Text style={styles.TextB}>Rating</Text>
              </View>
            </View>
          </View>

          {/** Info Produk */}
          <View style={styles.BoxSection}>
            <View style={styles.BoxJudul}>
              <Text style={styles.TitleJudul}>{product.title}</Text>
              <Text style={styles.TitlePenulis}>{product.author || "Yeny Kristina"}</Text>
            </View>
            <View>
              <Text style={styles.TitlePenulis}>Rp {product.price.toLocaleString("id-ID")}</Text>
            </View>
          </View>

          <View>
            <Text style={styles.TitleDesk}>Deskripsi</Text>
            <Text style={{ color: "#707070", fontSize: 14, fontWeight: "500", marginTop: 10 }}>Genre : Drama, Romance</Text>
            <Text style={{ color: "#707070", fontSize: 14, fontWeight: "500" }}>Penerbit : Reneluv</Text>
            <Text style={{ color: "#707070", fontSize: 14, fontWeight: "500" }}>Bahasa : Indonesia</Text>
            <Text style={{ color: "#707070", fontSize: 14, fontWeight: "500" }}>Halaman : 300</Text>

            <Text style={styles.TitleSinopsis}>
              {getDisplayText()}
              <Text onPress={() => setIsExpanded(!isExpanded)} style={styles.readMore}>
                {isExpanded ? " Baca lebih sedikit" : " Baca selengkapnya"}
              </Text>
            </Text>
          </View>

          {/* ----- BAGIAN ULASAN PEMBELI (BARU) ----- */}
          <View style={styles.reviewSection}>
            <View style={styles.reviewHeaderRow}>
              <Text style={styles.TitleDesk}>Ulasan Pembeli</Text>
              <TouchableOpacity>
                <Text style={styles.seeAllText}>Lihat Semua</Text>
              </TouchableOpacity>
            </View>

            {REVIEWS_DATA.map((item) => (
              <View key={item.id} style={styles.reviewCard}>
                <View style={styles.reviewUserHeader}>
                  {/* Avatar */}
                  <Image source={{ uri: item.avatar }} style={styles.userAvatar} />

                  <View style={{ flex: 1 }}>
                    <Text style={styles.userName}>{item.user}</Text>
                    {/* Bintang Rating */}
                    {renderStars(item.rating)}
                  </View>
                  <Text style={styles.reviewDate}>{item.date}</Text>
                </View>

                <Text style={styles.reviewComment}>{item.comment}</Text>
              </View>
            ))}
          </View>
          {/* ---------------------------------------- */}
        </ScrollView>

        {/* Bottom Action Bar */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.cartButton} onPress={handleAddToCart}>
            <Ionicons name="cart-outline" size={20} color="#4CC9F0" style={{ marginRight: 5 }} />
            <Text style={styles.cartButtonText}>Masukkan Keranjang</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buyButton}
            onPress={() => {
              navigation.navigate("Checkout", {
                items: [{ ...product, quantity: 1 }],
              });
            }}
          >
            <Text style={styles.buyButtonText}>Beli Buku ini</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 15,
    marginTop: 20,
    marginBottom: 16,
  },
  tabBack: {
    padding: 4,
    backgroundColor: "#F1F2F1",
    borderRadius: 8,
  },
  titleHeader: {
    fontSize: 22,
    fontWeight: "700",
    color: "#354B4E",
  },
  badge: {
    position: "absolute",
    right: -5,
    top: -5,
    backgroundColor: "red",
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 2,
    zIndex: 10,
  },
  badgeText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
  ContainerBox: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
    marginHorizontal: 10,
  },
  BoxImage: {
    backgroundColor: "#F1F2F1",
    borderRadius: 10,
    padding: 10,
  },
  BoxDetail: {
    backgroundColor: "#F1F2F1",
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  BoxTitle: {
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  TextA: {
    fontSize: 22,
    fontWeight: "700",
    color: "#707070",
  },
  TextB: {
    fontSize: 14,
    fontWeight: "500",
    color: "#707070",
  },
  BoxSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  BoxJudul: {
    marginBottom: 10,
    flex: 1,
  },
  TitleJudul: {
    fontSize: 22,
    fontWeight: "700",
    color: "#354B4E",
  },
  TitlePenulis: {
    fontSize: 14,
    fontWeight: "500",
    color: "#707070",
    marginTop: 2,
  },
  readMore: {
    color: "#4CC9F0",
    fontWeight: "700",
  },
  TitleDesk: {
    fontSize: 18,
    fontWeight: "700",
    color: "#354B4E",
  },
  TitleSinopsis: {
    marginTop: 15,
    fontSize: 14,
    fontWeight: "500",
    color: "#707070",
    lineHeight: 20,
  },
  // --- STYLES ULASAN BARU ---
  reviewSection: {
    marginTop: 30,
    borderTopWidth: 1,
    borderTopColor: "#EEE",
    paddingTop: 20,
  },
  reviewHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  seeAllText: {
    color: "#4CC9F0",
    fontSize: 14,
    fontWeight: "600",
  },
  reviewCard: {
    backgroundColor: "#F9F9F9",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  reviewUserHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  userAvatar: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    marginRight: 10,
    backgroundColor: "#CCC",
  },
  userName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  reviewDate: {
    fontSize: 12,
    color: "#999",
  },
  reviewComment: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  // --------------------------

  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    padding: 20,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#EEE",
    justifyContent: "space-between",
    paddingBottom: 50,
  },
  cartButton: {
    flex: 1,
    flexDirection: "row",
    borderColor: "#4CC9F0",
    borderWidth: 1.5,
    borderRadius: 8,
    paddingVertical: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  cartButtonText: {
    color: "#4CC9F0",
    fontWeight: "bold",
    fontSize: 12,
  },
  buyButton: {
    flex: 1,
    backgroundColor: "#4CC9F0",
    borderRadius: 8,
    paddingVertical: 12,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  buyButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
});
