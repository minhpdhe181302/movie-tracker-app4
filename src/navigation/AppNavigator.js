import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TabNavigator from "./TabNavigator";
import DetailScreen from "../screens/DetailScreen";
import GenreMoviesScreen from "../screens/GenreMoviesScreen";

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Detail"
        component={DetailScreen}
        options={{ title: "Details" }}
      />
      <Stack.Screen
        name="GenreMovies"
        component={GenreMoviesScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
