import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, TextInput, ActivityIndicator, Alert } from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import Swiper from "react-native-swiper";
import { Book9, Book8, Book7, Book6, Book5, Book4, Book3, Book1, Book2, Hero1, Hero2, Hero3 } from "../../assets/image";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { CartContext } from "../../components/molecule/CartContext";
import { FavoriteContext } from "../../components/molecule/FavoriteContext";
import api from "../../services/api"; // 1. Import koneksi API

export default function Home({ navigation }) {
  const { addToCart, totalItems } = useContext(CartContext);
  const { toggleFavorite, isFavorite } = useContext(FavoriteContext);

  // 2. Buat State untuk menampung data dari Laravel
  const [popularBooks, setPopularBooks] = useState([]);
  const [newBooks, setNewBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // 3. Fungsi untuk mengambil data buku dari Backend
  const fetchBooks = async () => {
    try {
      const response = await api.get('/produk');
      
      // Mengisi state dengan data dari Laravel
      // Asumsi ProdukController mengembalikan { novel_terpopuler: [...], novel_terbaru: [...] }
      setPopularBooks(response.data.data.novel_terpopuler || []);
      setNewBooks(response.data.data.novel_terbaru || []);
    } catch (error) {
      Alert.alert("Error", "Gagal mengambil data buku dari server.");
    } finally {
      setIsLoading(false);
    }
  };

  // 4. Jalankan fetchBooks secara otomatis saat halaman dibuka
  useEffect(() => {
    fetchBooks();
  }, []);

  // Fungsi Render Item Buku
  const renderBookItem = (item, type) => {
    const cardStyle = type === "popular" ? styles.popularCard : styles.newCard;
    const imageStyle = type === "popular" ? styles.popularImage : styles.newImage;

    // Sesuaikan dengan Primary Key dari database (produk_id)
    const isLoved = isFavorite(item.produk_id);

    // Penanganan Gambar: Jika API mengembalikan link gambar, gunakan uri. Jika tidak, pakai dummy Book1.
    // Gabungkan IP Address Laravel dengan path gambar dari database
    const imageUrl = item.gambar ? `http://127.0.0.1:8000/storage/${item.gambar}` : null;
    const imageSource = imageUrl ? { uri: imageUrl } : Book1;

    return (
      <View key={item.produk_id} style={cardStyle}>
        <TouchableOpacity onPress={() => navigation.navigate("DetailProduk", { book: item })}>
          <Image source={imageSource} style={imageStyle} resizeMode="cover"/>
        </TouchableOpacity>

        <View>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 5 }}>
            <Text style={{ fontSize: 14, fontWeight: "bold" , maxWidth: 100 }} numberOfLines={1}>
              {item.judul_buku} {/* Sesuai nama kolom di database */}
            </Text>

            <TouchableOpacity onPress={() => toggleFavorite(item)}>
              <MaterialIcons name={isLoved ? "favorite" : "favorite-outline"} size={22} color={isLoved ? "#BF1A1A" : "#707070"} />
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <Text style={{ fontSize: 12, color: '#666', marginTop: 2 }}>
            Rp {Number(item.harga).toLocaleString("id-ID")} {/* Sesuai nama kolom di database */}
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 5, marginTop: 5 }}>
            <Text style={{ fontSize: 12 }}>⭐</Text>
            {/* Rating di-hardcode sementara karena tidak ada di class diagram */}
            <Text style={{ fontSize: 12, fontWeight: '500' }}>4.5</Text> 

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
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
          
          {/* SEARCH BAR (Tetap sama) */}
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

          {/* HERO SECTION (Tetap sama) */}
          <View style={styles.heroSection}>
            <View style={{ width: 140, height: 140 }}>
              <Swiper
                autoplay
                autoplayTimeout={3}
                showsPagination
                dotStyle={{ width: 6, height: 6, borderRadius: 5, backgroundColor: "#ccc", marginBottom: -25 }}
                activeDotStyle={{ width: 6, height: 6, borderRadius: 6, backgroundColor: "#44C7EA", marginBottom: -25 }}
              >
                <View style={styles.slide}><Image source={Hero1} style={styles.heroImage} /></View>
                <View style={styles.slide}><Image source={Hero2} style={styles.heroImage} /></View>
                <View style={styles.slide}><Image source={Hero3} style={styles.heroImage} /></View>
              </Swiper>
            </View>

            <View style={styles.heroTextContainer}>
              <Text style={{ fontSize: 12, fontWeight: "bold", marginBottom: 8, color: '#333' }}>Selamat Datang di Agacy StoryHouse</Text>
              <Text style={{ fontSize: 10, fontWeight: "500", color: '#666', lineHeight: 16 }}>Tempat dimana menjual berbagai jenis buku novel terpopuler serta paling menarik untuk anda</Text>
            </View>
          </View>
          {/* END HERO SECTION */}

          {/* LOADING INDICATOR */}
          {isLoading ? (
            <ActivityIndicator size="large" color="#44C7EA" style={{ marginTop: 50 }} />
          ) : (
            <>
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
            </>
          )}

        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

// ... styles biarkan sama persis seperti kode aslimu ...
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
    flexDirection: "row", 
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
    resizeMode: "contain",
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
  },
});