import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, Image } from "react-native";
import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Splash, Logo } from "../../assets/image";

export default function Splashscreen({ navigation }) {
  return (
    <ImageBackground source={Splash} resizeMode="cover" style={{ flex: 1 }}>
      <SafeAreaProvider>
        <SafeAreaView>
          <View style={{ alignItems: "center", justifyContent: "center", marginTop: 200 }}>
            <Image source={Logo} style={{ width: 260, height: 200 }} />
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("Register")}
            style={{
              backgroundColor: "#ffffff",
              alignItems: "center",
              paddingHorizontal: 30,
              paddingVertical: 15,
              borderRadius: 30,
              marginHorizontal: 70,
              marginTop: 100,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "600", color: "#44C7EA" }}>Get Started</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </SafeAreaProvider>
   </ImageBackground>
  );
}

const styles = StyleSheet.create({});
