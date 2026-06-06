import { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Switch, Alert, ScrollView } from "react-native";
import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function PasswordScurity({ navigation }) {
  // State untuk Switch Biometrik
  const [isBiometricEnabled, setIsBiometricEnabled] = useState(false);

  // Fungsi Toggle Switch
  const toggleSwitch = () => {
    setIsBiometricEnabled((previousState) => !previousState);

    // Opsional: Tampilkan notifikasi kecil
    if (!isBiometricEnabled) {
      Alert.alert("Biometrik Diaktifkan", "Anda sekarang bisa login menggunakan sidik jari/wajah.");
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
          <Text style={styles.headerTitle}>Password & Keamanan</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          {/* SECTION 1: LOGIN & KEAMANAN */}
          <Text style={styles.sectionTitle}>Login & Keamanan</Text>

          {/* Menu: Ubah Kata Sandi */}
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("UbahKataSandi")}>
            <View style={styles.rowLeft}>
              <View style={styles.iconContainer}>
                <Ionicons name="lock-closed-outline" size={22} color="#333" />
              </View>
              <Text style={styles.menuText}>Ubah Kata Sandi</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#888" />
          </TouchableOpacity>

          {/* Menu: Autentikasi Dua Faktor */}
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.rowLeft}>
              <View style={styles.iconContainer}>
                <Ionicons name="phone-portrait-outline" size={22} color="#333" />
              </View>
              <View>
                <Text style={styles.menuText}>Autentikasi Dua Faktor</Text>
                <Text style={styles.subText}>Nonaktif</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#888" />
          </TouchableOpacity>

          {/* SECTION 2: AKSES CEPAT */}
          <Text style={styles.sectionTitle}>Akses Cepat</Text>

          {/* Menu: Biometrik (Switch) */}
          <View style={styles.menuItem}>
            <View style={styles.rowLeft}>
              <View style={styles.iconContainer}>
                <Ionicons name="finger-print-outline" size={22} color="#333" />
              </View>
              <Text style={styles.menuText}>Biometrik (Sidik Jari/Wajah)</Text>
            </View>

            <Switch trackColor={{ false: "#767577", true: "#4CC9F0" }} thumbColor={isBiometricEnabled ? "#f4f3f4" : "#f4f3f4"} ios_backgroundColor="#3e3e3e" onValueChange={toggleSwitch} value={isBiometricEnabled} />
          </View>

          {/* Menu: Pin Aplikasi */}
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.rowLeft}>
              <View style={styles.iconContainer}>
                <Ionicons name="keypad-outline" size={22} color="#333" />
              </View>
              <Text style={styles.menuText}>Pin Aplikasi</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#888" />
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  backButton: {
    padding: 5,
    backgroundColor: "#F9F9F9",
    borderRadius: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#354B4E",
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    marginTop: 10,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F5F5F5",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 30,
    alignItems: "center",
    marginRight: 10,
  },
  menuText: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
  subText: {
    fontSize: 11,
    color: "#888",
    marginTop: 2,
  },
});
