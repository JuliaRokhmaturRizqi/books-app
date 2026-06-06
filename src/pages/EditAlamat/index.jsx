import { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from "react-native";
import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function EditAlamat({ navigation, route }) {
  // Terima data alamat saat ini (jika ada)
  const { currentAddress } = route.params || {};

  // State Form
  const [name, setName] = useState(currentAddress?.name || "");
  const [phone, setPhone] = useState(currentAddress?.phone || "");
  const [address, setAddress] = useState(currentAddress?.address || "");
  const [postalCode, setPostalCode] = useState(currentAddress?.postalCode || "");

  const handleSave = () => {
    if (!name || !phone || !address || !postalCode) {
      Alert.alert("Error", "Semua kolom harus diisi");
      return;
    }

    const newAddressData = { name, phone, address, postalCode };

    // Kirim data balik ke halaman Checkout
    navigation.navigate({
      name: "Checkout",
      params: { updatedAddress: newAddressData },
      merge: true,
    });
  };
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Ubah Alamat</Text>
          <View style={{ width: 40 }} />
        </View>

        <View style={styles.content}>
          <Text style={styles.label}>Nama Penerima</Text>
          <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Contoh: Budi Santoso" />

          <Text style={styles.label}>Nomor HP</Text>
          <TextInput style={styles.input} value={phone} onChangeText={setPhone} keyboardType="phone-pad" placeholder="0812..." />

          <Text style={styles.label}>Alamat Lengkap</Text>
          <TextInput style={[styles.input, { height: 80, textAlignVertical: "top" }]} value={address} onChangeText={setAddress} multiline placeholder="Nama Jalan, No. Rumah, RT/RW, Kecamatan..." />

          <Text style={styles.label}>Kode Pos</Text>
          <TextInput style={styles.input} value={postalCode} onChangeText={setPostalCode} keyboardType="numeric" placeholder="12345" />

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Simpan Alamat</Text>
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  backButton: {
    padding: 5,
    backgroundColor: "#F1F2F1",
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
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
    marginTop: 10,
  },
  input: {
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    padding: 12,
    fontSize: 14,
    color: "#333",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  saveButton: {
    backgroundColor: "#4CC9F0",
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 30,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
