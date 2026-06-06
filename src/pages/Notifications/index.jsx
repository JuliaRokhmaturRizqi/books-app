import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";

// DATA DUMMY (Sesuai Gambar)
const NOTIFICATION_DATA = [
  {
    sectionTitle: "HARI INI",
    data: [
      {
        id: 1,
        type: "pending",
        title: "Menunggu Pembayaran",
        time: "10m lalu",
        message: "Selesaikan pembayaran pesanan #ORD-2025-881 sebelum 19 Des 14:00 WIB agar tidak dibatalkan otomatis.",
      },
      {
        id: 2,
        type: "success",
        title: "Pembayaran Berhasil!",
        time: "1 jam lalu",
        message: "Terima kasih! Pembayaran untuk Novel 'Gadis Kretek' telah diverifikasi. Penjual sedang menyiapkan paketmu.",
      },
      {
        id: 3,
        type: "shipping",
        title: "Paket Sedang Dikirim",
        time: "5 jam lalu",
        message: "Hore! Paket bukumu sedang dibawa kurir (JNE - SUB100299). Klik untuk melacak posisi paket.",
      },
    ],
  },
  {
    sectionTitle: "KEMARIN",
    data: [
      {
        id: 4,
        type: "arrived",
        title: "Pesanan Tiba",
        time: "Kemarin",
        message: "Paket pesanan #ORD-2025-775 sudah sampai di alamat tujuan. Apakah kondisinya baik? Yuk konfirmasi penerimaan!",
      },
    ],
  },
];

// Helper untuk mendapatkan Icon & Warna berdasarkan Tipe
const getIconConfig = (type) => {
  switch (type) {
    case "pending":
      return { name: "time", color: "#F2994A" };
    case "success":
      return { name: "checkmark", color: "#27AE60" };
    case "shipping":
      return { name: "car", color: "#2F80ED" };
    case "arrived":
      return { name: "cube", color: "#9B51E0" };
    default:
      return { name: "notifications", color: "#888" };
  }
};
export default function Notification({ navigation }) {
  return (
    <SafeAreaProvider style={{ backgroundColor: "#fff" }}>
      <SafeAreaView>
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Notifikasi</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* LOOPING SECTIONS (HARI INI, KEMARIN) */}
          {NOTIFICATION_DATA.map((section, index) => (
            <View key={index} style={styles.sectionContainer}>
              <Text style={styles.sectionHeader}>{section.sectionTitle}</Text>

              {/* LOOPING CARDS */}
              {section.data.map((item) => {
                const iconConfig = getIconConfig(item.type);

                return (
                  <View key={item.id} style={styles.card}>
                    <View style={[styles.iconContainer, { backgroundColor: iconConfig.color }]}>
                      <Ionicons name={iconConfig.name} size={24} color="#fff" />
                    </View>

                    <View style={styles.contentContainer}>
                      <View style={styles.titleRow}>
                        <Text style={styles.cardTitle}>{item.title}</Text>
                        <Text style={styles.timeText}>{item.time}</Text>
                      </View>
                      <Text style={styles.messageText}>{item.message}</Text>
                    </View>
                  </View>
                );
              })}
            </View>
          ))}
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
  // Header
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  backButton: {
    padding: 5,
    backgroundColor: "#fff",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#354B4E",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },

  // Section Styles
  sectionContainer: {
    marginBottom: 10,
  },
  sectionHeader: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
    marginTop: 10,
    fontWeight: "600",
    textTransform: "uppercase",
  },

  // Card Styles
  card: {
    flexDirection: "row",
    backgroundColor: "#F9F9F9",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#EAEAEA",
  },
  iconContainer: {
    width: 45,
    height: 45,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 4,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#000",
    flex: 1,
    marginRight: 5,
  },
  timeText: {
    fontSize: 12,
    color: "#999",
    marginTop: 2,
  },
  messageText: {
    fontSize: 13,
    color: "#444",
    lineHeight: 18,
  },
});
