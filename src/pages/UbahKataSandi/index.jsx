import { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert } from "react-native";
import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function UbahKataSandi({ navigation }) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // State untuk toggle lihat password (mata)
  const [showOldPass, setShowOldPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);

  const handleSave = () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      Alert.alert("Error", "Semua kolom harus diisi!");
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "Konfirmasi password tidak cocok!");
      return;
    }

    // Simulasi Berhasil
    Alert.alert("Sukses", "Kata sandi berhasil diperbarui!", [{ text: "OK", onPress: () => navigation.goBack() }]);
  };
  return (
    <SafeAreaProvider style={styles.container}>
      <SafeAreaView>
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Ubah Kata Sandi</Text>
          <View style={{ width: 40 }} />
        </View>

        <View style={styles.content}>
          {/* INPUT: Password Lama */}
          <Text style={styles.label}>Password Lama</Text>
          <View style={styles.inputContainer}>
            <TextInput style={styles.input} placeholder="Masukkan password saat ini" secureTextEntry={!showOldPass} value={oldPassword} onChangeText={setOldPassword} />
            <TouchableOpacity onPress={() => setShowOldPass(!showOldPass)}>
              <Ionicons name={showOldPass ? "eye-off-outline" : "eye-outline"} size={20} color="#888" />
            </TouchableOpacity>
          </View>

          {/* INPUT: Password Baru */}
          <Text style={styles.label}>Password Baru</Text>
          <View style={styles.inputContainer}>
            <TextInput style={styles.input} placeholder="Masukkan password baru" secureTextEntry={!showNewPass} value={newPassword} onChangeText={setNewPassword} />
            <TouchableOpacity onPress={() => setShowNewPass(!showNewPass)}>
              <Ionicons name={showNewPass ? "eye-off-outline" : "eye-outline"} size={20} color="#888" />
            </TouchableOpacity>
          </View>

          {/* INPUT: Konfirmasi Password */}
          <Text style={styles.label}>Konfirmasi Password Baru</Text>
          <View style={styles.inputContainer}>
            <TextInput style={styles.input} placeholder="Ulangi password baru" secureTextEntry={true} value={confirmPassword} onChangeText={setConfirmPassword} />
          </View>

          {/* TOMBOL SIMPAN */}
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveText}>Simpan Kata Sandi</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  backButton: {
    padding: 5,
    backgroundColor: "#F9F9F9",
    borderRadius: 8,
  },
  headerTitle: { fontSize: 18, fontWeight: "bold", color: "#354B4E" },
  content: { padding: 20 },
  label: {
    fontSize: 14,
    color: "#333",
    marginBottom: 8,
    fontWeight: "500",
    marginTop: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 50,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  input: {
    flex: 1,
    color: "#333",
  },
  saveButton: {
    backgroundColor: "#4CC9F0",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 30,
  },
  saveText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
