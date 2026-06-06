import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Alert } from "react-native";
import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export default function ReadBookScreen({ navigation }) {
  const handleNextPage = () => {
    Alert.alert("Info", "Masuk ke Halaman/Bab Berikutnya...");
  };
  return (
    <SafeAreaProvider style={styles.container}>
      <SafeAreaView>
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>1 | Sekolah Baru</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* KONTEN CERITA */}
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <Text style={styles.storyText}>
            Matahari hangat menyinari jendela kamar seorang gadis. Alarm yang sejak tadi berbunyi terdengar begitu jelas. Karena terganggu dengan suara alarm itu, ia segera mematikannya. Saat ia melihat kearah jam, ia terkejut. "Mampus,
            telat gue!" katanya dengan panik. Gadis itu segera beranjak cepat dari ranjangnya menuju kamar mandi. Ya, siapa lagi kalau bukan Nasya Anindya. Gadis dengan paras cantik itu benar-benar panik.
            {"\n"}
            {"\n"}
            Dilantai bawah, tampak gadis yang lebih tua darinya. Ia berkata kepadanya.
            {"\n"}
            {"\n"}
            "Sya, ini sarapan dul," ucap sang gadis. Fara Anindya, kakak dari Nasya, itu juga memiliki paras yang tak kalah cantik dari adikknya. Ia memiliki hati yang sangat lembut.
            {"\n"}
            {"\n"}
            "Maaf, kak, tapi aku udah telat nih," kata Nasya. Ia segera berlari keluar rumah dengan cepat.
            {"\n"}
            {"\n"}
            "T-Tapi, Sya...Woy! Ini topi kamu!" teriak Fara kepada Nasya.
            {"\n"}
            {"\n"}
            Setelah 15 menit menempuh perjalanan, akhirnya Nasya sampai di tempat tujuan. Namun, saat ia melihat pintu gerbang sudah ditutup, raut wajah lelah bercampur dengan marah. Nasya pun berteriak.
            {"\n"}
            {"\n"}
            "Aaaaaarghhh, kenapa sih harus ditutup gerbangnya?!" teriak Nasya dengan Frustasi.
            {"\n"}
            {"\n"}
            "Apa aku masuk lewat gerbang belakang aja, ya?" pikir Nasya, mencoba mencari solusi.
          </Text>

          {/* TOMBOL HALAMAN BERIKUTNYA */}
          <TouchableOpacity style={styles.nextButton} onPress={handleNextPage}>
            <Text style={styles.nextButtonText}>Halaman Berikutnya</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  // Header Style
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#fff",
  },
  backButton: {
    padding: 8,
    backgroundColor: "#F9F9F9",
    borderRadius: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#354B4E",
  },

  // Content Style
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 40,
  },
  storyText: {
    fontSize: 14,
    color: "#333",
    lineHeight: 22,
    textAlign: "justify",
  },

  // Button Style
  nextButton: {
    backgroundColor: "#4CC9F0",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 40,
    marginBottom: 20,
  },
  nextButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
