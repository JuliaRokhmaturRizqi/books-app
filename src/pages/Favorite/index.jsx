import React, { useRef, useState, useContext } from "react";
import { View, Text, TouchableOpacity, Animated, StyleSheet, ScrollView, Dimensions, Image, Alert } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { FavoriteContext } from "../../components/molecule/FavoriteContext";
import { CartContext } from "../../components/molecule/CartContext";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

const { width } = Dimensions.get("window");

export default function Favorite({ navigation }) {
  const { totalItems } = useContext(CartContext);

  const tabs = ["Regular", "Terbaru", "On Sale"];
  const [activeTab, setActiveTab] = useState(0);

  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollRef = useRef();

  // 1. AMBIL DATA DARI CONTEXT
  const { favoriteItems, toggleFavorite } = useContext(FavoriteContext);

  // 2. BAGI DATA MENJADI 3 KATEGORI (LOGIKA SIMULASI)

  // Kategori 1: Regular (Semua Favorit)
  const regularBooks = favoriteItems;

  // Kategori 2: Terbaru
  const newBooks = [...favoriteItems].reverse();

  // Kategori 3: On Sale

  const saleBooks = favoriteItems.filter((item) => item.discountPrice);

  const booksDataByTab = [regularBooks, newBooks, saleBooks];

  const handleTabPress = (index) => {
    setActiveTab(index);
    scrollRef.current.scrollTo({ x: width * index, animated: true });
  };

  return (
    <SafeAreaProvider style={{ backgroundColor: "#ffffff" }}>
      <SafeAreaView style={{ flex: 1 }}>
        {/* HEADER  */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.tabBack} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#707070" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Favorite Book</Text>
          <View style={{ width: 30 }} />
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

        {/* TAB MENU  */}
        <View style={styles.tabContainer}>
          {tabs.map((t, i) => (
            <TouchableOpacity key={i} onPress={() => handleTabPress(i)}>
              <Text style={[styles.tab, activeTab === i && styles.activeTab]}>{t}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* TAB INDICATOR */}
        <Animated.View
          style={[
            styles.indicator,
            {
              transform: [
                {
                  translateX: scrollX.interpolate({
                    inputRange: [0, width * 2],
                    outputRange: [0, (width / 3) * 2],
                  }),
                },
              ],
            },
          ]}
        />

        {/* CONTENT (SWIPE VIEW) */}
        <Animated.ScrollView
          horizontal
          pagingEnabled
          ref={scrollRef}
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
            useNativeDriver: false,
            listener: (event) => {
              const pageIndex = Math.round(event.nativeEvent.contentOffset.x / width);
              setActiveTab(pageIndex);
            },
          })}
        >
          {/* MAPPING HALAMAN PER TAB */}
          {booksDataByTab.map((pageBooks, pageIndex) => (
            <View key={pageIndex} style={{ width, padding: 20 }}>
              <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 50 }}>
                {pageBooks.length > 0 ? (
                  pageBooks.map((item) => <BookCardLocal key={item.id} item={item} onRemove={() => toggleFavorite(item)} navigation={navigation} />)
                ) : (
                  // Tampilan jika Tab Kosong
                  <View style={{ alignItems: "center", marginTop: 50 }}>
                    <Ionicons name="book-outline" size={50} color="#ccc" />
                    <Text style={{ color: "#707070", marginTop: 10 }}>Tidak ada buku di kategori ini</Text>
                  </View>
                )}
              </ScrollView>
            </View>
          ))}
        </Animated.ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

/* BOOK CARD COMPONENT */
function BookCardLocal({ item, onRemove, navigation }) {
  const { addToCart } = useContext(CartContext);

  const displayPrice = item.price ? item.price.toLocaleString("id-ID") : "0";
  const displayDiscount = item.discountPrice ? item.discountPrice : null;

  // Fungsi handler agar ada notifikasi saat di klik
  const handleAddToCart = () => {
    addToCart(item);
    Alert.alert("Sukses", `Buku "${item.title}" berhasil ditambahkan ke keranjang!`);
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={() => navigation.navigate("DetailProduk", { book: item })}>
        <Image source={item.image} style={styles.cardImage} />
      </TouchableOpacity>

      <View style={{ flex: 1 }}>
        <Text style={styles.cardTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.cardAuthor}>{item.author || "Unknown Author"}</Text>

        {displayDiscount ? (
          <View style={{ marginTop: 5 }}>
            <Text style={styles.oldPrice}>Rp {displayPrice}</Text>
            <Text style={styles.newPrice}>Rp {displayDiscount}</Text>
          </View>
        ) : (
          <Text style={styles.cardPrice}>Rp {displayPrice}</Text>
        )}

        <Text style={styles.cardRating}>⭐ {item.rating}</Text>
      </View>

      <View style={{ justifyContent: "space-between", alignItems: "center" }}>
        <TouchableOpacity onPress={onRemove}>
          <Ionicons name="heart" size={24} color="#BF1A1A" />
        </TouchableOpacity>

        {/* Tombol Tambah ke Keranjang */}
        <TouchableOpacity onPress={handleAddToCart} style={{ paddingTop: 30 }}>
          <FontAwesome5 name="plus-circle" size={28} color="#44C7EA" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    marginTop: 10,
    marginHorizontal: 16,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#354B4E",
    marginLeft: 40,
  },
  tabBack: {
    backgroundColor: "#F1F2F1",
    borderRadius: 8,
    padding: 4,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 20,
    marginTop: 10,
    backgroundColor: "#F1F2F1",
    marginHorizontal: 15,
    borderRadius: 10,
    elevation: 3,
    paddingVertical: 10,
  },
  tab: {
    fontSize: 15,
    fontWeight: "500",
    color: "#777",
    paddingBottom: 6,
  },
  activeTab: {
    fontWeight: "700",
    color: "#44C7EA",
  },
  indicator: {
    height: 3,
    width: width / 3,
    backgroundColor: "#44C7EA",
    marginTop: 2,
    borderRadius: 10,
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
  /* CARD */
  card: {
    flexDirection: "row",
    marginBottom: 15,
    padding: 15,
    borderRadius: 12,
    backgroundColor: "#F1F2F1",
    elevation: 3,
  },
  cardImage: {
    width: 70,
    height: 100,
    borderRadius: 10,
    marginRight: 15,
    resizeMode: "cover",
    backgroundColor: "#ccc",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000",
    maxWidth: "90%",
  },
  cardAuthor: {
    fontSize: 13,
    color: "#666",
    marginTop: 3,
  },
  cardPrice: {
    fontSize: 14,
    fontWeight: "700",
    marginTop: 5,
    color: "#44C7EA",
  },
  oldPrice: {
    fontSize: 13,
    color: "#999",
    textDecorationLine: "line-through",
  },
  newPrice: {
    fontSize: 16,
    fontWeight: "700",
    color: "black",
  },
  cardRating: {
    marginTop: 5,
    color: "black",
    fontSize: 12,
  },
});
