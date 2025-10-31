import React from "react";
import { View, Text, Button, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SettingsScreen() {
  async function clearData() {
    await AsyncStorage.clear();
    Alert.alert("Cleared", "All data removed.");
  }

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>⚙️ Settings</Text>
      <Button title="Clear all data" onPress={clearData} />
    </View>
  );
}
