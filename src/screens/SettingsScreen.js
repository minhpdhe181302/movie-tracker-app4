import React from "react";
import {
  View,
  Text,
  Alert,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS } from "../styles/colors";
import { SPACING, BORDER_RADIUS, SHADOWS } from "../styles/theme";

export default function SettingsScreen() {
  async function clearData() {
    Alert.alert(
      "⚠️ Clear All Data",
      "Are you sure you want to delete all your saved movies and books? This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete All",
          style: "destructive",
          onPress: async () => {
            await AsyncStorage.clear();
            Alert.alert("✅ Success", "All data has been cleared.");
          },
        },
      ]
    );
  }

  const settingsOptions = [
    {
      title: "About",
      icon: "ℹ️",
      description: "App information and version",
      action: () =>
        Alert.alert(
          "Movie & Book Tracker",
          "Version 1.0.0\n\nTrack your favorite movies and books with ratings and comments.\n\nMade with ❤️"
        ),
    },
    {
      title: "Clear All Data",
      icon: "🗑️",
      description: "Remove all saved items",
      action: clearData,
      danger: true,
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerIcon}>⚙️</Text>
        <Text style={styles.headerTitle}>Settings</Text>
        <Text style={styles.headerSubtitle}>Manage your app preferences</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>General</Text>
        {settingsOptions.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionCard,
              option.danger && styles.optionCardDanger,
            ]}
            onPress={option.action}
            activeOpacity={0.7}
          >
            <View style={styles.optionIcon}>
              <Text style={styles.optionIconText}>{option.icon}</Text>
            </View>
            <View style={styles.optionContent}>
              <Text
                style={[
                  styles.optionTitle,
                  option.danger && styles.optionTitleDanger,
                ]}
              >
                {option.title}
              </Text>
              <Text style={styles.optionDescription}>{option.description}</Text>
            </View>
            <Text style={styles.optionArrow}>›</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          🎬 Track movies and books you love 📚
        </Text>
        <Text style={styles.footerSubtext}>Made with React Native & Expo</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    backgroundColor: COLORS.surface,
    padding: SPACING.xl,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerIcon: {
    fontSize: 48,
    marginBottom: SPACING.sm,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  headerSubtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  section: {
    padding: SPACING.md,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.textLight,
    textTransform: "uppercase",
    marginBottom: SPACING.md,
    letterSpacing: 0.5,
  },
  optionCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    ...SHADOWS.small,
  },
  optionCardDanger: {
    borderWidth: 1,
    borderColor: COLORS.error + "30",
  },
  optionIcon: {
    width: 48,
    height: 48,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.background,
    alignItems: "center",
    justifyContent: "center",
    marginRight: SPACING.md,
  },
  optionIconText: {
    fontSize: 24,
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs / 2,
  },
  optionTitleDanger: {
    color: COLORS.error,
  },
  optionDescription: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  optionArrow: {
    fontSize: 24,
    color: COLORS.textLight,
    marginLeft: SPACING.sm,
  },
  footer: {
    padding: SPACING.xl,
    alignItems: "center",
    marginTop: SPACING.lg,
  },
  footerText: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  footerSubtext: {
    fontSize: 12,
    color: COLORS.textLight,
  },
});
