import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";
import MyListScreen from "../screens/MyListScreen";
import SettingsScreen from "../screens/SettingsScreen";
import { COLORS } from "../styles/colors";
import { SHADOWS } from "../styles/theme";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: COLORS.surface,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: COLORS.border,
        },
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 18,
          color: COLORS.textPrimary,
        },
        tabBarStyle: {
          backgroundColor: COLORS.surface,
          borderTopWidth: 1,
          borderTopColor: COLORS.border,
          paddingBottom: 8,
          paddingTop: 8,
          height: 60,
          ...SHADOWS.medium,
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textLight,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => <TabIcon icon="🏠" color={color} />,
          headerTitle: "Movie & Book Tracker",
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color, size }) => <TabIcon icon="🔍" color={color} />,
          headerTitle: "Search",
        }}
      />
      <Tab.Screen
        name="My List"
        component={MyListScreen}
        options={{
          tabBarIcon: ({ color, size }) => <TabIcon icon="📚" color={color} />,
          headerTitle: "My Collection",
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color, size }) => <TabIcon icon="⚙️" color={color} />,
          headerTitle: "Settings",
        }}
      />
    </Tab.Navigator>
  );
}

function TabIcon({ icon, color }) {
  return (
    <span
      style={{
        fontSize: 24,
        filter:
          color === COLORS.primary ? "brightness(1.1)" : "brightness(0.8)",
      }}
    >
      {icon}
    </span>
  );
}
