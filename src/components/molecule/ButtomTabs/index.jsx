import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";

const Icon = ({ label, focus }) => {
  switch (label) {
    case "Home":
      return focus ? <Ionicons name="home" size={24} color="#44C7EA" /> : <Ionicons name="home-outline" size={24} color="#707070" />;
    case "Favorite":
      return focus ? <MaterialIcons name="favorite" size={25} color="#44C7EA" /> : <MaterialIcons name="favorite-border" size={25} color="#707070" />;
    case "Notification":
      return focus ? <Ionicons name="notifications" size={24} color="#44C7EA" /> : <Ionicons name="notifications-outline" size={25} color="#707070" />;
    case "Setting":
      return focus ? <Ionicons name="settings" size={24} color="#44C7EA" /> : <Ionicons name="settings-outline" size={24} color="#707070" />;
    case "Profile":
      return focus ? <FontAwesome5 name="user-alt" size={23} color="#44C7EA" /> : <FontAwesome5 name="user" size={23} color="#707070" />;
  }
  return <MaterialIcons name="favorite-border" size={24} color="#00512c" />;
};

const ButtonTabs = ({ state, descriptors, navigation }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: "white",
        paddingBottom: 50,
        paddingTop: 20,
        paddingHorizontal: 40,
        paddingRight: 10,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        elevation: 10,
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel !== undefined ? options.tabBarLabel : options.title !== undefined ? options.title : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1 }}
          >
            <Icon label={label} focus={isFocused} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default ButtonTabs;

const styles = StyleSheet.create({});
