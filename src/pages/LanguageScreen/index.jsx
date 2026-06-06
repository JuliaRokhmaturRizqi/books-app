import { useState, useEffect } from "react";
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, ScrollView, Alert } from "react-native";
import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Data Bahasa
const LANGUAGES = [
  { id: "1", label: "Bahasa Indonesia (Indonesia)", code: "id" },
  { id: "2", label: "English (US) (Inggris Amerika)", code: "en-US" },
  { id: "3", label: "English (UK) (Inggris Britania)", code: "en-UK" },
  { id: "4", label: "中文 (Simplified) (Mandarin Sederhana)", code: "zh" },
  { id: "5", label: "日本語 (Jepang)", code: "ja" },
  { id: "6", label: "한국어 (Korea)", code: "ko" },
  { id: "7", label: "(Arab) العربية", code: "ar" },
  { id: "8", label: "Español (Spanyol)", code: "es" },
];

export default function LanguageScreen({ navigation }) {
  // State untuk menyimpan bahasa yang dipilih (Default: id)
  const [selectedLanguage, setSelectedLanguage] = useState("id");

  // Load bahasa yang tersimpan saat layar dibuka
  useEffect(() => {
    const loadLanguage = async () => {
      try {
        const savedLang = await AsyncStorage.getItem("APP_LANGUAGE");
        if (savedLang) {
          setSelectedLanguage(savedLang);
        }
      } catch (error) {
        console.log("Gagal memuat bahasa", error);
      }
    };
    loadLanguage();
  }, []);

  // Fungsi saat tombol "Simpan Perubahan" ditekan
  const handleSaveLanguage = async () => {
    try {
      {
        /** 1. Simpan ke memori HP */
      }
      await AsyncStorage.setItem("APP_LANGUAGE", selectedLanguage);

      {
        /**  2. Ambil label bahasa untuk notifikasi*/
      }
      const langLabel = LANGUAGES.find((l) => l.code === selectedLanguage)?.label;

      {
        /**  3. Tampilkan konfirmasi*/
      }
      Alert.alert("Berhasil", `Bahasa berhasil diubah ke: \n${langLabel}`, [
        {
          text: "OK",
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error) {
      Alert.alert("Error", "Gagal menyimpan pengaturan bahasa.");
    }
  };

  return (
    <SafeAreaProvider style={styles.container}>
      <SafeAreaView>
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Pilih Bahasa</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* CONTENT LIST */}
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {LANGUAGES.map((item) => {
            const isSelected = selectedLanguage === item.code;

            return (
              <TouchableOpacity key={item.id} style={styles.languageItem} onPress={() => setSelectedLanguage(item.code)} activeOpacity={0.7}>
                <Text style={styles.languageText}>{item.label}</Text>

                {/* Tampilkan Checklist Jika Dipilih */}
                {isSelected && (
                  <View style={styles.checkIcon}>
                    <Ionicons name="checkmark-circle" size={24} color="#4CC9F0" />
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* FOOTER BUTTON */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.saveButton} onPress={handleSaveLanguage}>
            <Text style={styles.saveButtonText}>Simpan Perubahan</Text>
          </TouchableOpacity>
        </View>
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
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#fff",
  },
  backButton: {
    padding: 5,
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#354B4E",
  },

  // List Style
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  languageItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F2F2F2",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  languageText: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
  checkIcon: {},

  // Footer Style
  footer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#EEE",
  },
  saveButton: {
    backgroundColor: "#4CC9F0",
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
