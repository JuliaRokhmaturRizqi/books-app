import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import {
  Register,
  Splashscreen,
  Home,
  Login,
  Favorite,
  Setting,
  Profile,
  Cart,
  Notification,
  DetailProduk,
  Search,
  MyOrder,
  Checkout,
  PaymentMethod,
  MyBookScreen,
  LanguageScreen,
  HelpCenterScreen,
  PasswordScurity,
  UbahKataSandi,
  EditProfileScreen,
  PopulerBookScreen,
  NewBookScreen,
  ReadBookScreen,
  EditAlamat,
} from "../pages";
import { ButtonTabs } from "../components/molecule";
import { CartProvider } from "../components/molecule/CartContext";
import { FavoriteProvider } from "../components/molecule/FavoriteContext";
import { UserProvider } from "../components/molecule/UserContext";
import { OrderProvider } from "../components/molecule/OrderContext";

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

const MainApp = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }} tabBar={(props) => <ButtonTabs {...props} />}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Favorite" component={Favorite} />
      <Tab.Screen name="Notification" component={Notification} />
      <Tab.Screen name="Setting" component={Setting} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

const Router = () => {
  return (
    <UserProvider>
      <CartProvider>
        <FavoriteProvider>
          <OrderProvider>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Splashscreen" component={Splashscreen} />
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Register" component={Register} />
              <Stack.Screen name="Cart" component={Cart} />
              <Stack.Screen name="DetailProduk" component={DetailProduk} />
              <Stack.Screen name="Favorite" component={Favorite} />
              <Stack.Screen name="Search" component={Search} />
              <Stack.Screen name="MyOrder" component={MyOrder} />
              <Stack.Screen name="Checkout" component={Checkout} />
              <Stack.Screen name="PaymentMethod" component={PaymentMethod} />
              <Stack.Screen name="MyBookScreen" component={MyBookScreen} />
              <Stack.Screen name="LanguageScreen" component={LanguageScreen} />
              <Stack.Screen name="HelpCenterScreen" component={HelpCenterScreen} />
              <Stack.Screen name="PasswordScurity" component={PasswordScurity} />
              <Stack.Screen name="UbahKataSandi" component={UbahKataSandi} />
              <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
              <Stack.Screen name="PopulerBookScreen" component={PopulerBookScreen} />
              <Stack.Screen name="NewBookScreen" component={NewBookScreen} />
              <Stack.Screen name="ReadBookScreen" component={ReadBookScreen} />
              <Stack.Screen name="EditAlamat" component={EditAlamat} />
              <Stack.Screen name="MainApp" component={MainApp} />
            </Stack.Navigator>
          </OrderProvider>
        </FavoriteProvider>
      </CartProvider>
    </UserProvider>
  );
};

export default Router;

const styles = StyleSheet.create({});
