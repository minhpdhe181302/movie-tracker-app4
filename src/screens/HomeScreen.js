import React from "react";
import { View, Text } from "react-native";

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        📚 Book / Movie Tracker
      </Text>
      <Text>Welcome! Use the Search tab to find movies or books.</Text>
    </View>
  );
}
