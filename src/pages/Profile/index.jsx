import { StyleSheet, Text, TouchableOpacity, View, Image, Alert } from "react-native"; // 1. Tambah Import Alert
import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import { useContext } from "react";
import { UserContext } from "../../components/molecule/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Profile({ navigation }) {
  const { userData } = useContext(UserContext);

  // 3. Buat Fungsi Logout
  const handleLogout = () => {
    Alert.alert("Konfirmasi Keluar", "Apakah Anda yakin ingin keluar dari akun?", [
      {
        text: "Batal",
        style: "cancel",
      },
      {
        text: "Ya, Keluar",
        onPress: async () => {
          try {
            // Hapus data login yang tersimpan
            await AsyncStorage.removeItem("USER_DATA");

            navigation.reset({
              index: 0,
              routes: [{ name: "Login" }],
            });
          } catch (error) {
            console.log("Gagal logout:", error);
          }
        },
      },
    ]);
  };

  return (
    <SafeAreaProvider style={styles.container}>
      <SafeAreaView>
        {/**Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} onPress={() => navigation.navigate("Home")} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate("EditProfileScreen")}>
            <MaterialIcons name="edit-note" size={25} />
          </TouchableOpacity>
        </View>

        {/**Profile */}
        <View style={styles.profile}>
          <TouchableOpacity style={styles.containerFoto}>
            <Image source={typeof userData.image === "string" ? { uri: userData.image } : userData.image} style={{ width: 100, height: 100, borderRadius: 50 }} />
          </TouchableOpacity>
          <View style={styles.profileText}>
            <Text style={styles.textName}>{userData.name}</Text>
            <Text style={styles.textEmail}>{userData.email}</Text>
          </View>
        </View>

        {/**menu */}
        <View style={styles.containerMenu}>
          <TouchableOpacity style={styles.menu} onPress={() => navigation.navigate("MyOrder")}>
            <AntDesign name="file-text" size={24} style={styles.iconMenu} />
            <Text style={styles.textMenu}>Pesanan Saya</Text>
            <MaterialIcons name="arrow-forward-ios" size={24} style={styles.iconArrow} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menu} onPress={() => navigation.navigate("PaymentMethod")}>
            <Ionicons name="wallet-outline" size={24} style={styles.iconMenu} />
            <Text style={styles.textMenu}>Pembayaran</Text>
            <MaterialIcons name="arrow-forward-ios" size={24} style={styles.iconArrow} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menu} onPress={() => navigation.navigate("MyBookScreen")}>
            <Feather name="book-open" size={24} style={styles.iconMenu} />
            <Text style={styles.textMenu}>Buku Saya</Text>
            <MaterialIcons name="arrow-forward-ios" size={24} style={styles.iconArrow} />
          </TouchableOpacity>
        </View>

        {/* 4. Pasang Fungsi di Tombol Logout */}
        <TouchableOpacity style={styles.logout} onPress={handleLogout}>
          <Feather name="log-out" size={24} color="#707070" />
          <Text style={styles.titleLogout}>Keluar</Text>
        </TouchableOpacity>
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
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 15,
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#354B4E",
  },
  backButton: {
    padding: 4,
    backgroundColor: "#F1F2F1",
    borderRadius: 8,
  },
  profile: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  editButton: {
    padding: 4,
    backgroundColor: "#F1F2F1",
    borderRadius: 8,
  },
  containerFoto: {
    padding: 3,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "#4CD1E5",
    marginBottom: 10,
  },
  profileText: {
    alignItems: "center",
    justifyContent: "center",
  },
  textName: {
    fontSize: 20,
    fontWeight: "500",
  },
  textEmail: {},

  //menu
  containerMenu: {
    marginHorizontal: 25,
    marginTop: 60,
    backgroundColor: "#F1F2F1",
    borderRadius: 6,
    elevation: 3,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  menu: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    marginTop: 10,
    marginBottom: 20,
  },
  iconMenu: {
    padding: 10,
    backgroundColor: "#70707040",
    borderRadius: 25,
    color: "#707070",
  },
  iconArrow: {
    padding: 8,
    backgroundColor: "#70707040",
    borderRadius: 10,
    color: "#707070",
  },
  textMenu: {
    color: "#707070",
    fontWeight: "500",
    fontSize: 16,
  },
  logout: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginHorizontal: 120,
    marginTop: 40,
    backgroundColor: "#F1F2F1",
    borderRadius: 6,
    elevation: 3,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderColor: "#4CD1E5",
    borderWidth: 1,
    justifyContent: "center",
  },
  titleLogout: {
    color: "#707070",
    fontWeight: "500",
    fontSize: 16,
  },
});
