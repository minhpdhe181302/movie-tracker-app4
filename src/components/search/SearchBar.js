import React from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { COLORS } from "../../styles/colors";
import { SPACING, BORDER_RADIUS, SHADOWS } from "../../styles/theme";

export default function SearchBar({
  value,
  onChangeText,
  onSearch,
  placeholder,
  loading,
}) {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={COLORS.textLight}
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSearch}
        style={styles.input}
        returnKeyType="search"
      />
      <TouchableOpacity
        style={styles.button}
        onPress={onSearch}
        disabled={loading}
      >
        <Text style={styles.buttonText}>{loading ? "..." : "🔍"}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.md,
    gap: SPACING.sm,
  },
  input: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    fontSize: 16,
    color: COLORS.textPrimary,
    ...SHADOWS.small,
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.lg,
    justifyContent: "center",
    alignItems: "center",
    ...SHADOWS.small,
  },
  buttonText: {
    fontSize: 20,
  },
});
