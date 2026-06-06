import { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from "react-native";
import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { LogoBCA, LogoMandiri, LogoBRI } from "../../assets/image";

export default function PaymentMethod({ navigation, route }) {
  const { currentPayment } = route.params || {};
  const [selectedMethod, setSelectedMethod] = useState(currentPayment || null);
  const [isBankExpanded, setIsBankExpanded] = useState(true);

  const handleSelectBank = (bankName, logoImage) => {
    setSelectedMethod({ type: "Transfer Bank", name: bankName, icon: logoImage });
  };
  // Fungsi saat memilih COD
  const handleSelectCOD = () => {
    setSelectedMethod({ type: "COD", name: "COD ", icon: null });
  };
  // Fungsi Konfirmasi
  const handleConfirm = () => {
    navigation.navigate({
      name: "Checkout",
      params: { selectedPayment: selectedMethod },
      merge: true,
    });
  };
  return (
    <SafeAreaProvider style={{ backgroundColor: "#fff", flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#707070" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Metode Pembayaran</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          {/* CONTAINER UTAMA (Abu-abu rounded) */}
          <View style={styles.methodContainer}>
            {/* OPSI 1: COD */}
            <TouchableOpacity style={styles.methodRow} onPress={handleSelectCOD}>
              <View style={styles.rowLeft}>
                <Ionicons name="cash-outline" size={24} color="#666" style={{ marginRight: 15 }} />
                <Text style={styles.methodText}>COD</Text>
              </View>
              {/* Radio Button Logic */}
              <View style={styles.radioOuter}>{selectedMethod?.type === "COD" && <View style={styles.radioInner} />}</View>
            </TouchableOpacity>

            <View style={styles.divider} />

            {/* OPSI 2: TRANSFER BANK (HEADER) */}
            <TouchableOpacity style={styles.methodRow} onPress={() => setIsBankExpanded(!isBankExpanded)}>
              <View style={styles.rowLeft}>
                <Ionicons name="swap-horizontal-outline" size={24} color="#666" style={{ marginRight: 15 }} />
                <Text style={styles.methodText}>Transfer Bank</Text>
              </View>
              <Ionicons name={isBankExpanded ? "chevron-up" : "chevron-down"} size={24} color="#666" />
            </TouchableOpacity>

            {/* LIST BANK (Hanya muncul jika isBankExpanded = true) */}
            {isBankExpanded && (
              <View style={styles.bankListContainer}>
                {/* Bank BRI */}
                <TouchableOpacity style={styles.bankRow} onPress={() => handleSelectBank("Bank BRI", LogoBRI)}>
                  <View style={styles.rowLeft}>
                    <Image source={LogoBRI} style={styles.bankLogo} resizeMode="contain" />
                    <Text style={styles.bankText}>Bank BRI</Text>
                  </View>
                  {selectedMethod?.name === "Bank BRI" && <Ionicons name="checkmark" size={20} color="#4CC9F0" />}
                </TouchableOpacity>

                <View style={styles.dividerThin} />

                {/* Bank Mandiri */}
                <TouchableOpacity style={styles.bankRow} onPress={() => handleSelectBank("Bank Mandiri", LogoMandiri)}>
                  <View style={styles.rowLeft}>
                    <Image source={LogoMandiri} style={styles.bankLogo} resizeMode="contain" />
                    <Text style={styles.bankText}>Bank Mandiri</Text>
                  </View>
                  {selectedMethod?.name === "Bank Mandiri" && <Ionicons name="checkmark" size={20} color="#4CC9F0" />}
                </TouchableOpacity>

                <View style={styles.dividerThin} />

                {/* Bank BCA */}
                <TouchableOpacity style={styles.bankRow} onPress={() => handleSelectBank("Bank BCA", LogoBCA)}>
                  <View style={styles.rowLeft}>
                    <Image source={LogoBCA} style={styles.bankLogo} resizeMode="contain" />
                    <Text style={styles.bankText}>Bank BCA</Text>
                  </View>
                  {selectedMethod?.name === "Bank BCA" && <Ionicons name="checkmark" size={20} color="#4CC9F0" />}
                </TouchableOpacity>
              </View>
            )}
          </View>
        </ScrollView>

        {/* FOOTER BUTTON */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
            <Text style={styles.confirmText}>Konfirmasi</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#354B4E",
  },
  content: {
    padding: 20,
  },

  backButton: {
    padding: 6,
    backgroundColor: "#F1F2F1",
    borderRadius: 8,
  },
  methodContainer: {
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    paddingVertical: 10,
  },
  methodRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  methodText: {
    fontSize: 14,
    color: "#555",
    fontWeight: "500",
  },

  divider: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginHorizontal: 20,
  },
  dividerThin: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginLeft: 60,
    marginRight: 20,
  },

  // Radio Button Style for COD
  radioOuter: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#888",
    justifyContent: "center",
    alignItems: "center",
  },
  radioInner: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: "#4CC9F0",
  },

  // Bank Styles
  bankListContainer: {
    backgroundColor: "#F5F5F5",
  },
  bankRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingRight: 20,
    paddingLeft: 20,
  },
  bankLogo: {
    width: 40,
    height: 20,
    marginRight: 15,
  },
  bankText: {
    fontSize: 14,
    color: "#333",
  },

  // Footer
  footer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    padding: 20,
    borderTopWidth: 1,
    borderColor: "#EEE",
  },
  confirmButton: {
    backgroundColor: "#4CC9F0",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  confirmText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
