import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "../styles/colors";
import { SPACING, BORDER_RADIUS, SHADOWS, TYPOGRAPHY } from "../styles/theme";

export default function HomeScreen({ navigation }) {
  const features = [
    { icon: "🎬", title: "Movies", color: COLORS.movie, screen: "Search" },
    { icon: "📚", title: "Books", color: COLORS.book, screen: "Search" },
    { icon: "⭐", title: "My List", color: COLORS.accent, screen: "My List" },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[COLORS.primary, COLORS.primaryDark]}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>✨ Track Your Entertainment</Text>
        <Text style={styles.headerSubtitle}>Discover, Rate & Remember</Text>
      </LinearGradient>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Access</Text>
          <View style={styles.featureGrid}>
            {features.map((feature, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.featureCard, { borderColor: feature.color }]}
                onPress={() => navigation.navigate(feature.screen)}
              >
                <Text style={styles.featureIcon}>{feature.icon}</Text>
                <Text style={styles.featureTitle}>{feature.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📊 Your Stats</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Movies</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Books</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Total</Text>
            </View>
          </View>
        </View>

        <View style={styles.welcomeCard}>
          <Text style={styles.welcomeText}>
            🎯 Start exploring movies and books!
          </Text>
          <Text style={styles.welcomeSubtext}>
            Use the search tab to find your favorites
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.xl,
    paddingHorizontal: SPACING.md,
    borderBottomLeftRadius: BORDER_RADIUS.xl,
    borderBottomRightRadius: BORDER_RADIUS.xl,
    ...SHADOWS.medium,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.surface,
    textAlign: "center",
    marginBottom: SPACING.xs,
  },
  headerSubtitle: {
    fontSize: 16,
    color: COLORS.surface,
    textAlign: "center",
    opacity: 0.9,
  },
  content: {
    flex: 1,
    padding: SPACING.md,
  },
  section: {
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    ...TYPOGRAPHY.h3,
    marginBottom: SPACING.md,
  },
  featureGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  featureCard: {
    width: "31%",
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    alignItems: "center",
    borderWidth: 2,
    ...SHADOWS.small,
  },
  featureIcon: {
    fontSize: 36,
    marginBottom: SPACING.sm,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.textPrimary,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    marginHorizontal: SPACING.xs,
    alignItems: "center",
    ...SHADOWS.small,
  },
  statNumber: {
    fontSize: 32,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
  welcomeCard: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.lg,
    alignItems: "center",
    ...SHADOWS.small,
    marginBottom: SPACING.xl,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  welcomeSubtext: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: "center",
  },
});
