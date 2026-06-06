import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, TextInput, FlatList } from "react-native";
import React from "react";
import { useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Book1, Book2, Book3, Book4, Book5, Book6, Book7, Book8 } from "../../assets/image";

export default function Search({ navigation }) {
  const [searchText, setSearchText] = useState("");

  // 1. DATA MASTER (GABUNGAN SEMUA BUKU DARI HOME)
  const allBooks = [
    { id: "1", title: "Cantik Itu Luka", price: 70000, rating: 4.5, image: Book1 },
    { id: "2", title: "Unwanted Bond", price: 99000, rating: 4.5, image: Book2 },
    { id: "3", title: "Mr. Cold Mafia", price: 95000, rating: 5.0, image: Book3 },
    { id: "4", title: "The Sunrise", price: 65000, rating: 4.6, image: Book4 },
    { id: "5", title: "Lost World", price: 80000, rating: 4.7, image: Book5 },
    { id: "6", title: "New Horizon", price: 65000, rating: 4.5, image: Book6 },
    { id: "7", title: "Deep Sea", price: 60000, rating: 4.3, image: Book7 },
    { id: "8", title: "Sky High", price: 65000, rating: 4.5, image: Book8 },
  ];

  // Data Dummy untuk Pencarian Terkini (Tags)
  const recentTags = ["Romantis", "Fiksi", "Cerita Sejarah", "Horor", "Misteri", "Karya Sastra"];

  // 2. LOGIKA FILTERING
  // Memfilter buku berdasarkan judul yang mengandung searchText (case insensitive)
  const filteredBooks = allBooks.filter((book) => book.title.toLowerCase().includes(searchText.toLowerCase()));

  // Render Item untuk HASIL PENCARIAN (Tampilan List ke bawah)
  const renderSearchResultItem = ({ item }) => (
    <View style={styles.resultItem}>
      <TouchableOpacity onPress={() => navigation.navigate("DetailProduk", { book: item })}>
        <Image source={item.image} style={styles.resultImage} />
      </TouchableOpacity>
      <View style={styles.resultInfo}>
        <Text style={styles.resultTitle}>{item.title}</Text>
        <Text style={styles.resultPrice}>Rp {item.price.toLocaleString("id-ID")}</Text>
        <View style={styles.ratingRow}>
          <FontAwesome name="star" size={12} color="#FFD700" />
          <Text style={styles.resultRating}>{item.rating}</Text>
        </View>
      </View>
    </View>
  );

  // Render Item untuk REKOMENDASI (Tampilan Card kotak)
  const renderRecommendedItem = (item) => (
    <View key={item.id} style={styles.bookCard}>
      <TouchableOpacity onPress={() => navigation.navigate("DetailProduk", { book: item })}>
        <Image source={item.image} style={styles.bookImage} />
      </TouchableOpacity>
      <View style={styles.bookInfo}>
        <Text style={styles.bookTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.bookPrice}>Rp {item.price.toLocaleString("id-ID")}</Text>
      </View>
      <View style={styles.ratingRow}>
        <FontAwesome name="star" size={12} color="#FFD700" />
        <Text style={styles.resultRating}>{item.rating}</Text>
      </View>
    </View>
  );
  return (
    <SafeAreaProvider style={{ backgroundColor: "#fff" }}>
      <SafeAreaView>
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Search</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* SEARCH BAR INPUT */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBox}>
            <Ionicons name="search" size={20} color="#999" style={{ marginRight: 10 }} />
            <TextInput placeholder="Cari judul buku..." style={styles.input} autoFocus={true} value={searchText} onChangeText={(text) => setSearchText(text)} />

            {searchText.length > 0 && (
              <TouchableOpacity onPress={() => setSearchText("")}>
                <Ionicons name="close-circle" size={20} color="#ccc" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* 3. CONDITIONAL RENDERING */}
        {searchText.length > 0 ? (
          <View style={styles.resultContainer}>
            {filteredBooks.length > 0 ? (
              <FlatList data={filteredBooks} keyExtractor={(item) => item.id} renderItem={renderSearchResultItem} numColumns={2} columnWrapperStyle={{ justifyContent: "space-between" }} showsHorizontalScrollIndicator={false} />
            ) : (
              <View style={styles.notFoundContainer}>
                <Ionicons name="search-outline" size={50} color="#ccc" />
                <Text style={styles.notFoundText}>Buku tidak ditemukan</Text>
              </View>
            )}
          </View>
        ) : (
          // === TAMPILAN DEFAULT (JIKA KOSONG) ===
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Kategori</Text>
              <View style={styles.tagsContainer}>
                {recentTags.map((tag, index) => (
                  <TouchableOpacity key={index} style={styles.tag} onPress={() => setSearchText(tag)}>
                    <Text style={styles.tagText}>{tag}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Disarankan</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {allBooks.slice(0, 4).map((item) => renderRecommendedItem(item))}
              </ScrollView>
            </View>
          </ScrollView>
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  /* HEADER */
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  backButton: {
    padding: 8,
    backgroundColor: "#F1F2F1",
    borderRadius: 8,
  },
  optionButton: {
    padding: 8,
    backgroundColor: "#F1F2F1",
    borderRadius: 8,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#354B4E",
  },

  /* SEARCH BAR */
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9F9F9",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 4,
    elevation: 2,
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: "#707070",
  },
  resultContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 20,
  },
  resultItem: {
    width: 150,
    backgroundColor: "#F9F9F9",
    borderRadius: 12,
    padding: 10,
    marginRight: 5,
    marginBottom: 10,
    elevation: 1,
  },
  resultImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    resizeMode: "cover",
    marginBottom: 10,
  },
  resultInfo: {
    marginLeft: 10,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  resultPrice: {
    fontSize: 12,
    color: "#707070",
  },

  /* SECTIONS GLOBAL */
  section: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2C3E50",
    marginBottom: 15,
  },

  /* TAGS (Pencarian Terkini) */
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  tag: {
    backgroundColor: "#F1F2F1",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 5,
  },
  tagText: {
    color: "#555",
    fontSize: 14,
  },

  recommendedContainer: {
    flexDirection: "row",
  },
  bookCard: {
    width: 150,
    backgroundColor: "#F9F9F9",
    borderRadius: 12,
    padding: 10,
    marginRight: 5,
    elevation: 1,
  },
  bookImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    resizeMode: "cover",
    marginBottom: 10,
  },
  bookInfo: {
    paddingHorizontal: 4,
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },

  bookPrice: {
    fontSize: 14,
    color: "#777",
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
    gap: 4,
  },
  ratingText: {
    fontSize: 12,
    color: "#555",
    fontWeight: "bold",
  },
});
