import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View, ImageBackground, Animated, TouchableOpacity, Image, TextInput, Alert, Modal, FlatList, ActivityIndicator } from "react-native";
import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Splash } from "../../assets/image";
import { Google, Facebook, Twitter } from "../../assets/image";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";

// --- DATA DUMMY AKUN GOOGLE ---
const DUMMY_GOOGLE_ACCOUNTS = [
  { id: "1", name: "Gita", email: "gita_03@gmail.com", initial: "U", color: "#DB4437" },
  { id: "2", name: "Chytha", email: "chytha08@gmail.com", initial: "B", color: "#4285F4" },
  { id: "3", name: "Vya", email: "Vy34@gmail.com", initial: "D", color: "#0F9D58" },
];

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRemembered, setIsRemembered] = useState(false);

  // State UI Tambahan
  const [googleModalVisible, setGoogleModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("Memuat...");

  const slideAnim = useRef(new Animated.Value(500)).current;

  // 1. Cek Data Remember Me
  useEffect(() => {
    const loadRememberedUser = async () => {
      try {
        const savedCredentials = await AsyncStorage.getItem("REMEMBER_ME_DATA");
        if (savedCredentials) {
          const { email: savedEmail, password: savedPassword } = JSON.parse(savedCredentials);
          setEmail(savedEmail);
          setPassword(savedPassword);
          setIsRemembered(true);
        }
      } catch (error) {
        console.log("Gagal memuat data remember me", error);
      }
    };

    loadRememberedUser();

    Animated.timing(slideAnim, {
      toValue: 90,
      duration: 700,
      useNativeDriver: true,
    }).start();
  }, []);

  // 2. LOGIKA LOGIN MANUAL (Tetap Ada)
  const handleLogin = async () => {
    try {
      const savedUserString = await AsyncStorage.getItem("USER_DATA");

      // DEBUG: Cek apa isi datanya
      console.log("Data di HP:", savedUserString);
      console.log("Input User:", email, password);

      if (savedUserString) {
        const savedUser = JSON.parse(savedUserString);

        // Tambahkan .trim() untuk membuang spasi tidak sengaja
        if (email.trim() === savedUser.email && password === savedUser.password) {
          // ... (Logika Remember Me Tetap Sama) ...
          if (isRemembered) {
            const credentials = { email, password };
            await AsyncStorage.setItem("REMEMBER_ME_DATA", JSON.stringify(credentials));
          } else {
            await AsyncStorage.removeItem("REMEMBER_ME_DATA");
          }

          Alert.alert("Login Sukses", `Halo, ${savedUser.username}!`);
          navigation.navigate("MainApp");
        } else {
          Alert.alert("Gagal", `Email/Pass Salah.\nData tersimpan saat ini:\nEmail: ${savedUser.email}\nPass: ${savedUser.password}`);
        }
      } else {
        Alert.alert("Gagal", "Belum ada data user. Silakan daftar dulu.");
      }
    } catch (error) {
      Alert.alert("Error", "Kesalahan sistem");
    }
  };

  // 3. LOGIKA SIMULASI FB & TWITTER (AfifaGita)
  const handleSocialLogin = (platform) => {
    setLoadingText(`Masuk dengan ${platform}...`);
    setIsLoading(true);

    setTimeout(async () => {
      try {
        // Simulasi Login: Kita set data user aktif ke AsyncStorage
        const fakeUser = {
          username: "AfifaGita",
          email: "afifagita@social.com",
          password: "dummy-social-login",
          platform: platform,
        };

        await AsyncStorage.setItem("USER_DATA", JSON.stringify(fakeUser));

        setIsLoading(false);

        Alert.alert("Login Berhasil", `Halo AfifaGita! Anda berhasil masuk menggunakan ${platform}.`, [{ text: "Lanjut ke Home", onPress: () => navigation.replace("MainApp") }]);
      } catch (error) {
        setIsLoading(false);
        Alert.alert("Error", "Gagal login simulasi.");
      }
    }, 1500);
  };

  // 4. LOGIKA SIMULASI GOOGLE (MODAL)
  const openGoogleModal = () => {
    setGoogleModalVisible(true);
  };

  const handleSelectGoogleAccount = async (account) => {
    setGoogleModalVisible(false);
    setLoadingText("Masuk dengan Google...");
    setIsLoading(true);

    setTimeout(async () => {
      try {
        const userData = {
          username: account.name,
          email: account.email,
          password: "google-login-dummy",
        };
        await AsyncStorage.setItem("USER_DATA", JSON.stringify(userData));

        setIsLoading(false);

        Alert.alert("Login Berhasil", `Selamat datang, ${account.name}!`, [{ text: "OK", onPress: () => navigation.replace("MainApp") }]);
      } catch (error) {
        setIsLoading(false);
      }
    }, 1500);
  };

  return (
    <ImageBackground source={Splash} resizeMode="cover" style={{ flex: 1 }}>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }}>
          {/* Loading Overlay */}
          {isLoading && (
            <View style={styles.loadingOverlay}>
              <ActivityIndicator size="large" color="#44C7EA" />
              <Text style={{ color: "#fff", marginTop: 10, fontWeight: "bold" }}>{loadingText}</Text>
            </View>
          )}

          <TouchableOpacity>
            <Ionicons name="arrow-back" size={30} color="#707070" style={{ marginLeft: 20, marginTop: 20 }} onPress={() => navigation.navigate("Splashscreen")} />
          </TouchableOpacity>
          <View style={{ justifyContent: "flex-end", flex: 1 }}>
            <Animated.View style={[styles.loginBox, { transform: [{ translateY: slideAnim }] }]}>
              <View style={{ alignItems: "center" }}>
                <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10, color: "#354B4E" }}>Welcome Back</Text>
                <Text style={{ fontSize: 14, color: "#000000" }}>Silahkan masuk dengan akun Anda</Text>

                {/* Form login Manual */}
                <TextInput
                  placeholder="Email"
                  value={email}
                  
                  onChangeText={(text) => setEmail(text.trim())}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  style={styles.textInput}
                />
                <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry={true} style={[styles.textInput, { marginTop: 20 }]} />

                <View style={styles.optionContainer}>
                  <TouchableOpacity onPress={() => setIsRemembered(!isRemembered)} style={styles.rememberMeContainer}>
                    <View style={[styles.checkbox, isRemembered && { backgroundColor: "#44C7EA" }]}>{isRemembered && <Ionicons name="checkmark" size={14} color="white" />}</View>
                    <Text style={{ fontSize: 12 }}>Ingat saya</Text>
                  </TouchableOpacity>

                  <TouchableOpacity>
                    <Text style={{ fontSize: 12, color: "#44C7EA" }}>Lupa kata sandi?</Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
                  <Text style={{ fontSize: 16, fontWeight: "600", color: "white" }}>Masuk</Text>
                </TouchableOpacity>

                {/* Bagian Bawah */}
                <View style={{ marginTop: 30, flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 10 }}>
                  <View style={styles.line} />
                  <Text style={{ fontSize: 12, color: "#000000" }}>Atau</Text>
                  <View style={styles.line} />
                </View>

                {/* --- TOMBOL SOSIAL MEDIA (UPDATE) --- */}
                <View style={{ marginTop: 30, flexDirection: "row", gap: 30 }}>
                  {/* Google (Modal) */}
                  <TouchableOpacity onPress={openGoogleModal}>
                    <Image source={Google} style={{ width: 35, height: 35 }} />
                  </TouchableOpacity>

                  {/* Facebook (Simulasi) */}
                  <TouchableOpacity onPress={() => handleSocialLogin("Facebook")}>
                    <Image source={Facebook} style={{ width: 35, height: 35 }} />
                  </TouchableOpacity>

                  {/* Twitter (Simulasi) */}
                  <TouchableOpacity onPress={() => handleSocialLogin("Twitter")}>
                    <Image source={Twitter} style={{ width: 35, height: 35 }} />
                  </TouchableOpacity>
                </View>

                <View style={{ flexDirection: "row", marginTop: 5, justifyContent: "center", marginTop: 30, marginBottom: 150 }}>
                  <Text style={{ fontSize: 12 }}>Belum mempunyai akun?. </Text>
                  <TouchableOpacity>
                    <Text style={{ color: "#44C7EA", fontWeight: "600", fontSize: 12 }} onPress={() => navigation.navigate("Register")}>
                      Daftar
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Animated.View>
          </View>

          {/* --- MODAL GOOGLE --- */}
          <Modal animationType="slide" transparent={true} visible={googleModalVisible} onRequestClose={() => setGoogleModalVisible(false)}>
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <View style={styles.modalHeader}>
                  <Image source={Google} style={{ width: 24, height: 24, marginRight: 10 }} />
                  <Text style={styles.modalTitle}>Pilih akun</Text>
                </View>
                <Text style={styles.modalSubtitle}>untuk melanjutkan ke Aplikasi Buku</Text>

                <FlatList
                  data={DUMMY_GOOGLE_ACCOUNTS}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                    <TouchableOpacity style={styles.accountItem} onPress={() => handleSelectGoogleAccount(item)}>
                      <View style={[styles.avatar, { backgroundColor: item.color }]}>
                        <Text style={styles.avatarText}>{item.initial}</Text>
                      </View>
                      <View style={styles.accountInfo}>
                        <Text style={styles.accountName}>{item.name}</Text>
                        <Text style={styles.accountEmail}>{item.email}</Text>
                      </View>
                    </TouchableOpacity>
                  )}
                />
                <View style={styles.modalFooter}>
                  <TouchableOpacity style={styles.addAccount}>
                    <Ionicons name="person-add-outline" size={20} color="#555" />
                    <Text style={styles.addAccountText}>Tambahkan akun lain</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setGoogleModalVisible(false)} style={{ marginTop: 15, alignSelf: "flex-end" }}>
                    <Text style={{ color: "#44C7EA", fontWeight: "bold" }}>BATAL</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </SafeAreaView>
      </SafeAreaProvider>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  loginBox: {
    height: 620,
    backgroundColor: "#F1F2F1",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    elevation: 5,
    padding: 20,
  },
  textInput: {
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#354B4E",
    marginTop: 30,
    marginHorizontal: 50,
    padding: 5,
    paddingLeft: 20,
    width: 289,
    height: 40,
    backgroundColor: "#ffffff",
  },
  loginButton: {
    backgroundColor: "#44C7EA",
    alignItems: "center",
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 15,
    marginTop: 30,
    marginHorizontal: 50,
    width: 289,
    height: 45,
  },
  line: {
    borderWidth: 1,
    height: 1,
    width: 110,
    borderColor: "#707070",
  },
  optionContainer: {
    flexDirection: "row",
    marginHorizontal: 50,
    marginTop: 15,
    justifyContent: "space-between",
    width: 289,
  },
  rememberMeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  checkbox: {
    borderRadius: 5,
    borderColor: "#A2AF9B",
    borderWidth: 1,
    height: 20,
    width: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },

  // --- STYLES MODAL & LOADING ---
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "85%",
    backgroundColor: "white",
    borderRadius: 8,
    padding: 20,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "500",
    color: "#222",
  },
  modalSubtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: 15,
  },
  accountItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  avatarText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  accountInfo: {
    flex: 1,
  },
  accountName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  accountEmail: {
    fontSize: 12,
    color: "#666",
  },
  modalFooter: {
    marginTop: 10,
  },
  addAccount: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  addAccountText: {
    marginLeft: 15,
    fontWeight: "500",
    color: "#555",
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
});
