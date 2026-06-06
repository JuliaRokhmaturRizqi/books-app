import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, TextInput } from "react-native";
import React, { useContext } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import Swiper from "react-native-swiper";
import { Book9, Book8, Book7, Book6, Book5, Book4, Book3, Book1, Book2, Hero1, Hero2, Hero3 } from "../../assets/image";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { CartContext } from "../../components/molecule/CartContext";
import { FavoriteContext } from "../../components/molecule/FavoriteContext";

// Data Dummy untuk Buku Populer
const popularBooks = [
  { id: 1, title: "Uwanted Bond", price: 99000, rating: 4.5, image: Book2 },
  { id: 2, title: "Cantik Itu Luka", price: 70000, rating: 4.8, image: Book1 },
  { id: 3, title: "Love Pieces Amelia", price: 55000, rating: 4.2, image: Book3 },
  { id: 4, title: "The Sunrise", price: 65000, rating: 4.6, image: Book4 },
];

// Data Dummy untuk Buku Terbaru
const newBooks = [
  { id: 5, title: "His Lovely Obsession", price: 65000, rating: 4.5, image: Book6 },
  { id: 6, title: "Forbidden Vows", price: 80000, rating: 4.7, image: Book5 },
  { id: 7, title: "Gael Hidalgo", price: 60000, rating: 4.3, image: Book7 },
  { id: 8, title: "A Wife,s Sacrifiee", price: 65000, rating: 4.5, image: Book8 },
];

export default function Home({ navigation }) {
  // Ambil fungsi addToCart dan totalItems dari Context
  const { addToCart, totalItems } = useContext(CartContext);
  // Ambil fungsi dari FavoriteContext
  const { toggleFavorite, isFavorite } = useContext(FavoriteContext);

  // Fungsi Render Item Buku
  const renderBookItem = (item, type) => {
    // Tentukan style mana yang dipakai berdasarkan tipe
    const cardStyle = type === "popular" ? styles.popularCard : styles.newCard;
    const imageStyle = type === "popular" ? styles.popularImage : styles.newImage;

    //  Cek apakah buku ini ada di daftar favorit
    const isLoved = isFavorite(item.id);
    return (
      <View key={item.id} style={cardStyle}>
        <TouchableOpacity onPress={() => navigation.navigate("DetailProduk", { book: item })}>
          <Image source={item.image} style={imageStyle} />
        </TouchableOpacity>

        <View>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 5 }}>
            <Text style={{ fontSize: 16, fontWeight: "500", maxWidth: 100 }} numberOfLines={1}>
              {item.title}
            </Text>

            <TouchableOpacity onPress={() => toggleFavorite(item)}>
              <MaterialIcons name={isLoved ? "favorite" : "favorite-outline"} size={24} color={isLoved ? "#BF1A1A" : "#707070"} />
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <Text>Rp {item.price.toLocaleString("id-ID")}</Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 5, marginTop: 3 }}>
            <Text>⭐</Text>
            <Text>{item.rating}</Text>

            {/* Tombol Add to Cart */}
            <TouchableOpacity style={{ marginLeft: "auto" }} onPress={() => addToCart(item)}>
              <FontAwesome5 name="plus-circle" size={24} color="#44C7EA" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaProvider style={{ backgroundColor: "#FFFFFF" }}>
      <SafeAreaView>
        <ScrollView>
          {/* search */}
          <View style={styles.headerSearch}>
            <View style={styles.searchBox}>
              <TouchableOpacity>
                <Ionicons name="search" size={24} color="#707070" />
              </TouchableOpacity>
              <TextInput placeholder="Search" onPress={() => navigation.navigate("Search")} activeOpacity={0.9} />
            </View>

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
          {/* end search */}

          {/* hero section */}
          <View style={styles.heroSection}>
            <Swiper
              autoplay
              showsPagination
              dotStyle={{ width: 6, height: 6, borderRadius: 5, backgroundColor: "#ccc" }}
              activeDotStyle={{ width: 6, height: 6, borderRadius: 6, backgroundColor: "#44C7EA" }}
              style={{ paddingTop: 10, alignContent: "center", paddingStart: 15, paddingHorizontal: 5 }}
            >
              <Image source={Hero1} style={{ width: 120, height: 120 }} />
              <Image source={Hero2} style={{ width: 100, height: 100 }} />
              <Image source={Hero3} style={{ width: 120, height: 100 }} />
            </Swiper>

            <View style={{ width: 180, height: 100, justifyContent: "center", alignItems: "flex-start", gap: 5, paddingHorizontal: 5 }}>
              <Text style={{ fontSize: 10, fontWeight: "500", marginBottom: 10 }}>Selamat Datang di Agacy StoryHouse</Text>
              <Text style={{ fontSize: 12, fontWeight: "500" }}>Tempat dimana menjual berbagai jenis buku novel terpopuler serta paling menarik untuk anda</Text>
            </View>
          </View>
          {/* end hero */}

          {/* Buku terpopular */}
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 20, marginBottom: 10 }}>
            <Text style={{ fontSize: 16, fontWeight: "500", color: "#44C7EA" }}>Novel Terpopuler</Text>
            <TouchableOpacity style={{ backgroundColor: "#F1F2F1", paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 }} onPress={() => navigation.navigate("PopulerBookScreen")}>
              <Text>Lainnya</Text>
            </TouchableOpacity>
          </View>

          <View style={{ marginHorizontal: 10 }}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {/* Mapping Data Popular Books */}
              {popularBooks.map((book) => renderBookItem(book, "popular"))}
            </ScrollView>
          </View>
          {/* end Buku terpopular */}

          {/* produk terbaru */}
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 20, marginBottom: 10, marginTop: 20 }}>
            <Text style={{ fontSize: 16, fontWeight: "500", color: "#44C7EA" }}>Novel Terbaru</Text>
            <TouchableOpacity style={{ backgroundColor: "#F1F2F1", paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 }} onPress={() => navigation.navigate("NewBookScreen")}>
              <Text>Lainnya</Text>
            </TouchableOpacity>
          </View>

          <View style={{ marginTop: 10, paddingBottom: 50 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", flexWrap: "wrap", marginHorizontal: 10 }}>{newBooks.map((book) => renderBookItem(book, "terbaru"))}</View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  headerSearch: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 16,
    paddingBottom: 8,
    backgroundColor: "#C2EBF6",
    paddingHorizontal: 20,
    zIndex: 10,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1F2F1",
    paddingHorizontal: 10,
    paddingVertical: 4,
    width: 270,
    borderRadius: 10,
    gap: 10,
    elevation: 5,
    shadowColor: "black",
  },
  // Style Badge untuk Angka
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
    zIndex: 10,
    paddingHorizontal: 2,
  },
  badgeText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
  heroSection: {
    backgroundColor: "#F1F2F1",
    marginTop: 15,
    marginBottom: 30,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    height: 180,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    elevation: 5,
    shadowColor: "black",
  },
  popularCard: {
    backgroundColor: "#f1f2f1",
    borderRadius: 10,
    padding: 8,
    elevation: 5,
    shadowColor: "black",
    marginHorizontal: 8,
    marginVertical: 10,
    width: 160,
  },
  popularImage: {
    width: "100%",
    height: 240,
    borderRadius: 8,
    resizeMode: "cover",
  },
  newCard: {
    backgroundColor: "#f1f2f1",
    borderRadius: 10,
    padding: 8,
    elevation: 5,
    shadowColor: "black",
    marginHorizontal: 5,
    marginVertical: 10,
    width: "46%",
  },
  newImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    resizeMode: "cover",
  },
});
