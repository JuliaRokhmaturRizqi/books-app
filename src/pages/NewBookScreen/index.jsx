import { useContext } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList, Dimensions, Alert } from "react-native";
import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { CartContext } from "../../components/molecule/CartContext";
import { FavoriteContext } from "../../components/molecule/FavoriteContext";
import { Book1, Book2, Book3, Book4, Book5, Book6, Book7, Book8, Book9 } from "../../assets";

const { width } = Dimensions.get("window");

// Data Dummy
const POPULAR_DATA = [
  {
    id: "50",
    title: "Cantik Itu Luka",
    price: 65000,
    rating: 4.8,
    image: Book1,
    author: "Eka Kurniawan",
  },
  {
    id: "51",
    title: "Mr. Cold Mafia",
    price: 95000,
    rating: 4.5,
    image: Book2,
    author: "Author A",
  },
  {
    id: "52",
    title: "00.00",
    price: 89000,
    rating: 4.7,
    image: Book3,
    author: "Ameylia Falensia",
  },
  {
    id: "53",
    title: "Love Scenario",
    price: 72000,
    rating: 4.6,
    image: Book4,
    author: "Author B",
  },
  {
    id: "54",
    title: "Mariposa",
    price: 85000,
    rating: 4.9,
    image: Book5,
    author: "Luluk HF",
  },
  {
    id: "55",
    title: "Sherlock Holmes",
    price: 65000,
    rating: 5.0,
    image: Book6,
    author: "Arthur Conan Doyle",
  },
  {
    id: "56",
    title: "Mr. Cold 2",
    price: 92000,
    rating: 4.4,
    image: Book7,
    author: "Author A",
  },
  {
    id: "57",
    title: "The Mafia Soul",
    price: 99000,
    rating: 4.8,
    image: Book8,
    author: "Author C",
  },
  {
    id: "58",
    title: "Mariposa 2",
    price: 88000,
    rating: 4.9,
    image: Book9,
    author: "Luluk HF",
  },
];

export default function NewBookScreen({ navigation }) {
  // Ambil data dari Cart Context
  const { addToCart, totalItems } = useContext(CartContext);

  // 2. Ambil data dari Favorite Context (Global)
  const { favoriteItems, toggleFavorite } = useContext(FavoriteContext);

  // Helper function untuk cek apakah item sudah ada di favorite global
  const isBookFavorite = (id) => {
    return favoriteItems.some((item) => item.id === id);
  };

  const handleAddToCart = (item) => {
    addToCart(item);
    Alert.alert("Sukses", `${item.title} masuk keranjang!`);
  };

  const renderItem = ({ item }) => {
    // 3. Cek status favorite berdasarkan data global
    const isLiked = isBookFavorite(item.id);

    return (
      <TouchableOpacity style={styles.card} activeOpacity={0.8} onPress={() => navigation.navigate("DetailProduk", { product: item })}>
        <Image source={item.image} style={styles.bookImage} resizeMode="cover" />

        <View style={styles.cardInfoContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.bookTitle} numberOfLines={1}>
              {item.title}
            </Text>
            <Text style={styles.author} numberOfLines={1}>
              {item.author}
            </Text>
            <Text style={styles.price}>Rp {item.price.toLocaleString("id-ID")}</Text>

            <View style={styles.ratingRow}>
              <Ionicons name="star" size={10} color="#FFD700" />
              <Text style={styles.ratingText}>{item.rating}</Text>
            </View>
          </View>

          <View style={styles.buttonsContainer}>
            {/* 4. Tombol Love (Panggil toggleFavorite dengan item lengkap) */}
            <TouchableOpacity onPress={() => toggleFavorite(item)} style={{ marginBottom: 5 }}>
              <MaterialIcons name={isLiked ? "favorite" : "favorite-outline"} size={20} color={isLiked ? "#BF1A1A" : "#707070"} />
            </TouchableOpacity>

            {/* Tombol Tambah Keranjang */}
            <TouchableOpacity onPress={() => handleAddToCart(item)}>
              <Ionicons name="add-circle" size={22} color="#44C7EA" />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Novel Terbaru</Text>

          <TouchableOpacity onPress={() => navigation.navigate("Cart")} style={styles.cartBtn}>
            <Ionicons name="cart-outline" size={26} color="#333" />
            {totalItems > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{totalItems}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* GRID LIST */}
        <FlatList
          data={POPULAR_DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={3}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={{ justifyContent: "space-between" }}
        />
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
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  backBtn: {
    padding: 5,
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#354B4E",
  },
  cartBtn: {
    padding: 5,
    position: "relative",
  },
  badge: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "red",
    width: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
  listContainer: {
    padding: 15,
  },

  // STYLE CARD
  card: {
    width: width / 3 - 15,
    backgroundColor: "#fff",
    marginBottom: 20,
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: "hidden",
  },
  bookImage: {
    width: "100%",
    height: 140,
    resizeMode: "cover",
  },

  // Layout Info
  cardInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 8,
  },
  textContainer: {
    flex: 1,
    marginRight: 2,
  },
  buttonsContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 2,
  },

  // Typography
  bookTitle: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 2,
  },
  author: {
    fontSize: 9,
    color: "#888",
    marginBottom: 2,
  },
  price: {
    fontSize: 10,
    color: "#333",
    fontWeight: "600",
    marginBottom: 2,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontSize: 9,
    color: "#333",
    marginLeft: 2,
    fontWeight: "bold",
  },
});
