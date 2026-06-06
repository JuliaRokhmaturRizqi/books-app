import { useState, useContext, useEffect } from "react"; // Tambah useContext & useEffect
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput, Image, Alert } from "react-native";
import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import { Dropdown } from "react-native-element-dropdown";
import { UserContext } from "../../components/molecule/UserContext";

const genderData = [
  { label: "Laki-laki", value: "Laki-laki" },
  { label: "Perempuan", value: "Perempuan" },
];

export default function EditProfileScreen({ navigation }) {
  // 1. AMBIL DATA & FUNGSI DARI CONTEXT
  const { userData, updateUserData } = useContext(UserContext);

  // 2. State Lokal Form (Diisi data dari Context)
  const [formData, setFormData] = useState(userData);
  const [imageUri, setImageUri] = useState(userData.image);
  const [isFocus, setIsFocus] = useState(false);

  // Update form jika data context berubah (opsional, untuk safety)
  useEffect(() => {
    setFormData(userData);
    setImageUri(userData.image);
  }, [userData]);

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const pickImage = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert("Izin Ditolak", "Butuh akses galeri.");
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      const newUri = result.assets[0].uri;
      setImageUri(newUri);

      setFormData((prev) => ({ ...prev, image: newUri }));
    }
  };

  const handleSave = () => {
    if (!formData.name || !formData.username) {
      Alert.alert("Gagal", "Nama Lengkap dan Username harus diisi.");
      return;
    }

    // 3. PANGGIL FUNGSI UPDATE CONTEXT (KUNCI SINKRONISASI)
    updateUserData(formData);

    Alert.alert("Sukses", "Profil berhasil diubah.", [
      {
        text: "OK",
        onPress: () => navigation.goBack(),
      },
    ]);
  };

  return (
    <SafeAreaProvider style={styles.container}>
      <SafeAreaView>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Edit Profile</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          {/* FOTO */}
          <View style={styles.photoSection}>
            <TouchableOpacity onPress={pickImage} style={styles.photoContainer}>
              <Image source={typeof imageUri === "string" ? { uri: imageUri } : imageUri} style={styles.profilePhoto} />
              <View style={styles.photoOverlay}>
                <Ionicons name="camera" size={24} color="#fff" />
                <Text style={styles.changePhotoText}>Ubah Foto</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* INPUT FIELDS (Menggunakan state formData) */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nama Lengkap</Text>
            <TextInput style={styles.inputField} value={formData.name} onChangeText={(text) => handleInputChange("name", text)} />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Username</Text>
            <TextInput style={styles.inputField} value={formData.username} onChangeText={(text) => handleInputChange("username", text)} />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Jenis Kelamin</Text>
            <Dropdown
              style={[styles.dropdown, isFocus && { borderColor: "#4CC9F0" }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              data={genderData}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? "Pilih Gender" : "..."}
              value={formData.gender}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={(item) => {
                handleInputChange("gender", item.value);
                setIsFocus(false);
              }}
              renderRightIcon={() => <Ionicons name="chevron-down" size={20} color="#888" />}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput style={styles.inputField} value={formData.email} onChangeText={(text) => handleInputChange("email", text)} keyboardType="email-address" autoCapitalize="none" />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nomor Telepon</Text>
            <TextInput style={styles.inputField} value={formData.phone} onChangeText={(text) => handleInputChange("phone", text)} keyboardType="phone-pad" />
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
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
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 15,
    paddingTop: 10,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  backButton: {
    padding: 8,
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#354B4E",
  },

  content: {
    paddingTop: 20,
    paddingHorizontal: 25,
    paddingBottom: 150,
  },

  // Photo Section Style
  photoSection: {
    alignItems: "center",
    marginBottom: 30,
  },
  photoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: "hidden",
    position: "relative",
  },
  profilePhoto: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  photoOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "40%",
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 5,
  },
  changePhotoText: {
    color: "#fff",
    fontSize: 10,
    marginTop: 2,
  },

  // Form Input Style
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#354B4E",
    marginBottom: 8,
  },
  inputField: {
    backgroundColor: "#F2F2F2",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 14,
    color: "#333",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  readOnlyInput: {
    color: "#888",
  },

  // Dropdown Style (react-native-element-dropdown)
  dropdown: {
    height: 50,
    backgroundColor: "#F2F2F2",
    borderRadius: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  placeholderStyle: {
    fontSize: 14,
    color: "#888",
  },
  selectedTextStyle: {
    fontSize: 14,
    color: "#333",
  },
  iconStyle: {
    width: 20,
    height: 20,
  },

  // Save Button Style
  footer: {
    position: "absolute",
    bottom: 75,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  saveButton: {
    backgroundColor: "#4CC9F0",
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 40,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
