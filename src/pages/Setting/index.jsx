import { StyleSheet, Text, View, TouchableOpacity, Switch, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Fontisto from "@expo/vector-icons/Fontisto";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Setting({ navigation }) {
  // 1. State untuk Switch Notifikasi
  const [isNotificationOn, setIsNotificationOn] = useState(true);

  // 2. Load Status Notifikasi saat halaman dibuka
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const savedStatus = await AsyncStorage.getItem("NOTIFICATION_STATUS");
        if (savedStatus !== null) {
          setIsNotificationOn(JSON.parse(savedStatus));
        }
      } catch (error) {
        console.log("Gagal memuat setting notifikasi");
      }
    };
    loadSettings();
  }, []);

  // 3. Fungsi Toggle Switch
  const toggleNotification = async (value) => {
    setIsNotificationOn(value);
    try {
      await AsyncStorage.setItem("NOTIFICATION_STATUS", JSON.stringify(value));
      // Opsional: Tampilkan feedback kecil
      // Alert.alert("Info", value ? "Notifikasi Diaktifkan" : "Notifikasi Dimatikan");
    } catch (error) {
      console.log("Gagal menyimpan setting");
    }
  };

  return (
    <SafeAreaProvider style={{ backgroundColor: "#fff" }}>
      <SafeAreaView>
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.tabBack} onPress={() => navigation.navigate("Home")}>
            <Ionicons name="arrow-back" size={24} color="#707070" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Setting</Text>
        </View>

        {/* MENU AKUN */}
        <View style={styles.menu}>
          <Text style={styles.titleMenu}>Akun</Text>

          <TouchableOpacity style={styles.setting} onPress={() => navigation.navigate("EditProfileScreen")}>
            <FontAwesome6 name="user" size={24} style={styles.iconMenu} />
            <Text style={styles.titleSetting1}>Detail Profil</Text>
            <MaterialIcons name="arrow-forward-ios" size={24} style={styles.iconArrow} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.setting} onPress={() => navigation.navigate("PasswordScurity")}>
            <MaterialCommunityIcons name="shield-key-outline" size={24} style={styles.iconMenu} />
            <Text style={styles.titleSetting2}>Password & Keamanan</Text>
            <MaterialIcons name="arrow-forward-ios" size={24} style={styles.iconArrow} />
          </TouchableOpacity>
        </View>

        {/* MENU PENGATURAN */}
        <View style={styles.menu}>
          <Text style={styles.titleMenu}>Pengaturan</Text>

          <TouchableOpacity style={styles.setting} onPress={() => navigation.navigate("LanguageScreen")}>
            <Fontisto name="world-o" size={24} style={styles.iconMenu} />
            <Text style={styles.titleSetting3}>Bahasa</Text>
            <MaterialIcons name="arrow-forward-ios" size={24} style={styles.iconArrow} />
          </TouchableOpacity>

          <View style={styles.setting}>
            <Ionicons name="notifications-outline" size={25} style={styles.iconMenu} />
            <Text style={styles.titleSetting4}>Pengaturan Notifikasi</Text>

            <Switch
              trackColor={{ false: "#767577", true: "#4CC9F0" }}
              thumbColor={isNotificationOn ? "#f4f3f4" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleNotification}
              value={isNotificationOn}
              style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }], marginRight: 10 }} // Sedikit diperbesar
            />
          </View>

          <TouchableOpacity style={styles.setting} onPress={() => navigation.navigate("HelpCenterScreen")}>
            <MaterialIcons name="headset-mic" size={24} style={styles.iconMenu} />
            <Text style={styles.titleSetting5}>Bantuan</Text>
            <MaterialIcons name="arrow-forward-ios" size={24} style={styles.iconArrow} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
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
    flex: 1,
    textAlign: "center",
    marginRight: 40,
  },
  tabBack: {
    padding: 4,
    backgroundColor: "#F1F2F1",
    borderRadius: 8,
    width: 40,
    alignItems: "center",
  },
  menu: {
    marginHorizontal: 25,
    marginTop: 30,
    backgroundColor: "#F1F2F1",
    borderRadius: 6,
    elevation: 3,
    paddingHorizontal: 6,
    paddingVertical: 10,
  },
  titleMenu: {
    fontSize: 18,
    fontWeight: "700",
    color: "#707070",
    marginHorizontal: 20,
    marginVertical: 10,
  },
  setting: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    marginBottom: 20,
  },

  titleSetting1: { flex: 1, marginLeft: 15, fontSize: 15, fontWeight: "500", color: "#707070" },
  titleSetting2: { flex: 1, marginLeft: 15, fontSize: 15, fontWeight: "500", color: "#707070" },
  titleSetting3: { flex: 1, marginLeft: 15, fontSize: 15, fontWeight: "500", color: "#707070" },
  titleSetting4: { flex: 1, marginLeft: 15, fontSize: 15, fontWeight: "500", color: "#707070" },
  titleSetting5: { flex: 1, marginLeft: 15, fontSize: 15, fontWeight: "500", color: "#707070" },

  iconMenu: {
    padding: 10,
    backgroundColor: "#70707040",
    borderRadius: 25,
    color: "#707070",
    width: 45,
    textAlign: "center",
  },
  iconArrow: {
    padding: 8,
    backgroundColor: "#70707040",
    borderRadius: 10,
    color: "#707070",
  },
});
