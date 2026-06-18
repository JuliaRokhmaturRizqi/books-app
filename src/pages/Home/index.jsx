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
            <Text style={{ fontSize: 14, fontWeight: "bold" , maxWidth: 100 }} numberOfLines={1}>
              {item.title}
            </Text>

            <TouchableOpacity onPress={() => toggleFavorite(item)}>
              <MaterialIcons name={isLoved ? "favorite" : "favorite-outline"} size={22} color={isLoved ? "#BF1A1A" : "#707070"} />
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <Text style={{ fontSize: 12, color: '#666', marginTop: 2 }}>Rp {item.price.toLocaleString("id-ID")}</Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 5, marginTop: 5 }}>
            <Text style={{ fontSize: 12 }}>⭐</Text>
            <Text style={{ fontSize: 12, fontWeight: '500' }}>{item.rating}</Text>

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
      <SafeAreaView style={{ flex:1}}>
        {/* PERBAIKAN SCROLL: Menambahkan contentContainerStyle dan menghapus padding berlebih di bawah */}
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
          
          {/* SEARCH BAR */}
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

          {/* HERO SECTION */}
          <View style={styles.heroSection}>
            {/* Kiri: Swiper dibungkus View dengan lebar dan tinggi PASTI agar tidak tumpang tindih */}
            <View style={{ width: 140, height: 140 }}>
              <Swiper
                autoplay
                autoplayTimeout={3}
                showsPagination
                dotStyle={{ width: 6, height: 6, borderRadius: 5, backgroundColor: "#ccc", marginBottom: -25 }}
                activeDotStyle={{ width: 6, height: 6, borderRadius: 6, backgroundColor: "#44C7EA", marginBottom: -25 }}
              >
                {/* Setiap gambar dibungkus View (slide) agar posisinya pas di tengah */}
                <View style={styles.slide}><Image source={Hero1} style={styles.heroImage} /></View>
                <View style={styles.slide}><Image source={Hero2} style={styles.heroImage} /></View>
                <View style={styles.slide}><Image source={Hero3} style={styles.heroImage} /></View>
              </Swiper>
            </View>

            {/* Kanan: Teks Promo */}
            <View style={styles.heroTextContainer}>
              <Text style={{ fontSize: 12, fontWeight: "bold", marginBottom: 8, color: '#333' }}>Selamat Datang di Agacy StoryHouse</Text>
              <Text style={{ fontSize: 10, fontWeight: "500", color: '#666', lineHeight: 16 }}>Tempat dimana menjual berbagai jenis buku novel terpopuler serta paling menarik untuk anda</Text>
            </View>
          </View>
          {/* END HERO SECTION */}

          {/* NOVEL TERPOPULER */}
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 20, marginBottom: 10 }}>
            <Text style={{ fontSize: 16, fontWeight: "bold", color: "#44C7EA" }}>Novel Terpopuler</Text>
            <TouchableOpacity style={{ backgroundColor: "#F1F2F1", paddingHorizontal: 12, paddingVertical: 5, borderRadius: 8 }} onPress={() => navigation.navigate("PopulerBookScreen")}>
              <Text style={{ fontSize: 12, fontWeight: '500' }}>Lainnya</Text>
            </TouchableOpacity>
          </View>

          <View style={{ marginHorizontal: 10 }}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {popularBooks.map((book) => renderBookItem(book, "popular"))}
            </ScrollView>
          </View>

          {/* NOVEL TERBARU */}
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 20, marginBottom: 10, marginTop: 20 }}>
            <Text style={{ fontSize: 16, fontWeight: "bold", color: "#44C7EA" }}>Novel Terbaru</Text>
            <TouchableOpacity style={{ backgroundColor: "#F1F2F1", paddingHorizontal: 12, paddingVertical: 5, borderRadius: 8 }} onPress={() => navigation.navigate("NewBookScreen")}>
              <Text style={{ fontSize: 12, fontWeight: '500' }}>Lainnya</Text>
            </TouchableOpacity>
          </View>

          
          <View style={{ marginTop: 10 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", flexWrap: "wrap", marginHorizontal: 10 }}>
              {newBooks.map((book) => renderBookItem(book, "terbaru"))}
            </View>
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
    marginBottom: 25,
    marginHorizontal: 15,
    paddingHorizontal: 15,
    borderRadius: 15,
    height: 160,
    flexDirection: "row", // Kiri: Swiper, Kanan: Text
    alignItems: "center",
    elevation: 3,
    shadowColor: "black",
    shadowOpacity:0.1,
    shadowOffset:{width:0, height:2},
  },
  slide:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
  },
  heroImage: {
    width: 110,
    height: 110,
    resizeMode: "contain", // Memastikan gambar tidak terpotong
  },
  heroTextContainer: {
    flex: 1, 
    justifyContent: "center",
    paddingLeft: 10,
  },
  popularCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    elevation: 3,
    shadowColor: "black",
    shadowOpacity:0.1,
    shadowOffset:{width:0, height:2},
    marginHorizontal: 8,
    marginVertical: 10,
    width: 160,
  },
  popularImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    resizeMode: "cover",
  },
  newCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    elevation: 3,
    shadowColor: "black",
    shadowOpacity:0.1,
    shadowOffset:{width:0, height:2},
    marginHorizontal: 5,
    marginVertical: 10,
    width: "47%",
  },
  newImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    resizeMode: "cover",
  },
});
