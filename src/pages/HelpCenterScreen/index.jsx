import { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, LayoutAnimation, UIManager, Platform, TextInput } from "react-native";
import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";

// Aktifkan LayoutAnimation untuk Android
if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// DATA DUMMY
const POPULAR_TOPICS = ["Lacak Pesanan", "Cara Pembayaran", "Retur Barang", "Voucher"];

const HELP_MENUS = [
  { id: 1, title: "Pesanan & Pengiriman", icon: "truck-outline" },
  { id: 2, title: "Pembayaran", icon: "wallet-outline" },
  { id: 3, title: "Produk & Kondisi Buku", icon: "book-outline" },
  { id: 4, title: "Komplain & Retur", icon: "sync-outline" },
];

const FAQ_DATA = [
  {
    id: 1,
    question: "Apakah Buku 100% original?",
    answer: "Ya, semua buku yang dijual di aplikasi ini dijamin 100% original dan langsung dari penerbit terpercaya.",
  },
  {
    id: 2,
    question: "Syarat pengembalian barang (Wajib Video Unboxing)",
    answer: "Untuk melakukan retur, Anda wajib menyertakan video unboxing tanpa jeda/edit saat paket pertama kali dibuka. Batas klaim 2x24 jam.",
  },
  {
    id: 3,
    question: "Estimasi pengiriman berapa lama?",
    answer: "Estimasi pengiriman tergantung lokasi Anda dan jenis layanan ekspedisi yang dipilih. Biasanya memakan waktu 2-5 hari kerja.",
  },
  {
    id: 4,
    question: "Bagaimana cara menggunakan voucher?",
    answer: "Anda dapat memasukkan kode voucher pada halaman Checkout sebelum melakukan pembayaran.",
  },
];

export default function HelpCenterScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedFaqId, setExpandedFaqId] = useState(null);

  // Fungsi Toggle Dropdown FAQ
  const toggleExpand = (id) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedFaqId(expandedFaqId === id ? null : id);
  };

  // Filter FAQ berdasarkan pencarian
  const filteredFaq = FAQ_DATA.filter((item) => item.question.toLowerCase().includes(searchQuery.toLowerCase()));
  return (
    <SafeAreaProvider style={styles.container}>
      <SafeAreaView>
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Pusat Bantuan</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          {/* SEARCH BAR */}
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color="#888" style={{ marginRight: 10 }} />
            <TextInput style={styles.searchInput} placeholder="Cari masalah anda..." placeholderTextColor="#999" value={searchQuery} onChangeText={(text) => setSearchQuery(text)} />
          </View>

          {/* TOPIK POPULER */}
          <Text style={styles.sectionTitle}>Topik Populer</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.topicScroll}>
            {POPULAR_TOPICS.map((topic, index) => (
              <TouchableOpacity key={index} style={styles.topicChip}>
                <Text style={styles.topicText}>{topic}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* MENU BANTUAN */}
          <View style={styles.menuContainer}>
            {HELP_MENUS.map((menu) => (
              <TouchableOpacity key={menu.id} style={styles.menuItem}>
                <View style={styles.menuIconContainer}>
                  <Ionicons name={menu.icon} size={24} color="#354B4E" />
                </View>
                <Text style={styles.menuText}>{menu.title}</Text>
                <Ionicons name="chevron-forward" size={20} color="#888" />
              </TouchableOpacity>
            ))}
          </View>

          {/* FAQ SECTION (ACCORDION) */}
          <Text style={[styles.sectionTitle, { marginTop: 20 }]}>FAQ</Text>
          <View style={styles.faqContainer}>
            {filteredFaq.map((item) => {
              const isExpanded = expandedFaqId === item.id;
              return (
                <View key={item.id} style={styles.faqItem}>
                  <TouchableOpacity style={styles.faqHeader} onPress={() => toggleExpand(item.id)} activeOpacity={0.7}>
                    <Text style={styles.faqQuestion}>{item.question}</Text>
                    <Ionicons name={isExpanded ? "chevron-up" : "chevron-down"} size={20} color="#555" />
                  </TouchableOpacity>
                  {isExpanded && (
                    <View style={styles.faqBody}>
                      <Text style={styles.faqAnswer}>{item.answer}</Text>
                    </View>
                  )}
                </View>
              );
            })}
            {filteredFaq.length === 0 && <Text style={{ color: "#999", fontStyle: "italic", marginTop: 10 }}>Tidak ditemukan hasil untuk "{searchQuery}"</Text>}
          </View>
        </ScrollView>

        {/* FOOTER (HUBUNGI KAMI) */}
        <View style={styles.footer}>
          <Text style={styles.footerTitle}>Hubungi Kami</Text>
          <View style={styles.contactRow}>
            <TouchableOpacity style={styles.contactButton}>
              <Text style={styles.contactButtonText}>Live Chat</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.contactButton}>
              <Text style={styles.contactButtonText}>WhatsApp Admin</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.footerNote}>Jam Operasional: Senin - Jum'at, 09.00 - 17.00 WIB</Text>
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
    borderRadius: 8,
    backgroundColor: "#F9F9F9",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#354B4E",
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 200,
  },

  // Search Bar
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 45,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#EEE",
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#333",
  },

  // Popular Topics
  sectionTitle: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
    fontWeight: "600",
  },
  topicScroll: {
    marginBottom: 20,
  },
  topicChip: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#4CC9F0",
    marginRight: 10,
    backgroundColor: "#fff",
  },
  topicText: {
    color: "#4CC9F0",
    fontSize: 12,
  },

  // Menu Items
  menuContainer: {
    marginBottom: 10,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#EAFBFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  menuText: {
    flex: 1,
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },

  // FAQ Accordion
  faqContainer: {
    marginBottom: 20,
  },
  faqItem: {
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    marginBottom: 10,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  faqHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
  },
  faqQuestion: {
    fontSize: 13,
    color: "#333",
    fontWeight: "500",
    flex: 1,
    marginRight: 10,
  },
  faqBody: {
    paddingHorizontal: 15,
    paddingBottom: 15,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#EEE",
  },
  faqAnswer: {
    fontSize: 13,
    color: "#666",
    lineHeight: 20,
    marginTop: 10,
  },

  // Footer
  footer: {
    possition: "absolute",
    bottom: 210,
    left: 0,
    right: 0,
    padding: 20,
    paddingBottom: 55,
    borderTopWidth: 1,
    borderColor: "#EEE",
    backgroundColor: "#fff",
  },
  footerTitle: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
    fontWeight: "600",
  },
  contactRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  contactButton: {
    flex: 1,
    backgroundColor: "#4CC9F0",
    borderRadius: 20,
    paddingVertical: 12,
    alignItems: "center",
    marginHorizontal: 5,
  },
  contactButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  footerNote: {
    fontSize: 11,
    color: "#888",
    textAlign: "center",
    marginTop: 5,
  },
});
