import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList, Dimensions } from "react-native";
import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Book10, Book2, Book3, Book4, Book5, Book6, Book7, Book8, Book9 } from "../../assets/image";
import { Ionicons } from "@expo/vector-icons";

// 1. DATA DUMMY
const booksData = [
  { id: "1", title: "Athasya", image: Book10 },
  { id: "2", title: "The Sherlock Holmes", image: Book2 },
  { id: "3", title: "Love Scenario", image: Book3 },
  { id: "4", title: "Mariposa", image: Book4 },
  { id: "5", title: "MR. Mafia", image: Book5 },
  { id: "6", title: "Hantu di Rumah Kos", image: Book6 },
  { id: "7", title: "Mafia and His Angel", image: Book7 },
  { id: "8", title: "Desires", image: Book8 },
  { id: "9", title: "Hades", image: Book9 },
];

// Menghitung lebar layar untuk grid yang responsif
const screenWidth = Dimensions.get("window").width;
const numColumns = 3;
const gap = 15;
const itemWidth = (screenWidth - gap * (numColumns + 1)) / numColumns;

export default function Splashscreen({ navigation }) {
  // Fungsi untuk merender setiap item buku
  const renderBookItem = ({ item }) => (
    <TouchableOpacity style={styles.bookCard} onPress={() => navigation.navigate("ReadBookScreen", { product: item })}>
      <Image source={item.image} style={styles.bookImage} resizeMode="cover" />
      {/* Judul Buku */}
      <Text style={styles.bookTitle} numberOfLines={2}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );
  return (
    <SafeAreaProvider style={styles.container}>
      <SafeAreaView>
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Buku Saya</Text>

          <View style={{ width: 40 }} />
        </View>

        {/* GRID BUKU */}
        <FlatList
          data={booksData}
          renderItem={renderBookItem}
          keyExtractor={(item) => item.id}
          numColumns={numColumns}
          contentContainerStyle={styles.listContainer}
          columnWrapperStyle={styles.columnWrapper}
          showsVerticalScrollIndicator={false}
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

  // --- HEADER STYLES ---
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#fff",
  },
  backButton: {
    width: 40,
    height: 40,
    backgroundColor: "#f1f2f1",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#354B4E",
  },

  // --- GRID & CARD STYLES ---
  listContainer: {
    padding: 15,
  },
  columnWrapper: {
    justifyContent: "space-between",
    marginBottom: 15,
  },
  bookCard: {
    width: itemWidth,
    backgroundColor: "#F1f2f1",
    borderRadius: 8,
    padding: 8,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  bookImage: {
    width: "100%",
    height: 140,
    borderRadius: 4,
    marginBottom: 8,
  },
  bookTitle: {
    fontSize: 11,
    fontWeight: "500",
    color: "#707070",
    textAlign: "left",
    width: "100%",
  },
});
