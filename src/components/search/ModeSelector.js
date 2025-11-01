import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { COLORS } from "../../styles/colors";
import { SPACING, BORDER_RADIUS, SHADOWS } from "../../styles/theme";

export default function ModeSelector({ mode, onModeChange }) {
  const modes = [
    { id: "movie", label: "🎬 Movies", color: COLORS.movie },
    { id: "book", label: "📚 Books", color: COLORS.book },
  ];

  return (
    <View style={styles.container}>
      {modes.map((m) => (
        <TouchableOpacity
          key={m.id}
          onPress={() => onModeChange(m.id)}
          style={[
            styles.button,
            mode === m.id && styles.buttonActive,
            {
              backgroundColor: mode === m.id ? m.color : COLORS.surfaceLight,
            },
          ]}
        >
          <Text
            style={[
              styles.buttonText,
              mode === m.id && styles.buttonTextActive,
            ]}
          >
            {m.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    padding: SPACING.md,
    gap: SPACING.md,
  },
  button: {
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderRadius: BORDER_RADIUS.md,
    minWidth: 120,
    alignItems: "center",
    ...SHADOWS.small,
  },
  buttonActive: {
    ...SHADOWS.medium,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.textSecondary,
  },
  buttonTextActive: {
    color: COLORS.surface,
  },
});
