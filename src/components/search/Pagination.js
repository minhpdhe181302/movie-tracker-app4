import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { COLORS } from "../../styles/colors";
import { SPACING, BORDER_RADIUS, SHADOWS } from "../../styles/theme";

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  loading,
}) {
  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, !canGoPrevious && styles.buttonDisabled]}
        onPress={() => onPageChange(currentPage - 1)}
        disabled={!canGoPrevious || loading}
      >
        <Text
          style={[
            styles.buttonText,
            !canGoPrevious && styles.buttonTextDisabled,
          ]}
        >
          ← Trước
        </Text>
      </TouchableOpacity>

      <View style={styles.pageInfo}>
        <Text style={styles.pageText}>
          Trang {currentPage} / {totalPages}
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.button, !canGoNext && styles.buttonDisabled]}
        onPress={() => onPageChange(currentPage + 1)}
        disabled={!canGoNext || loading}
      >
        <Text
          style={[styles.buttonText, !canGoNext && styles.buttonTextDisabled]}
        >
          Sau →
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: SPACING.md,
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.md,
    marginHorizontal: SPACING.md,
    marginVertical: SPACING.md,
    ...SHADOWS.small,
  },
  button: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.sm,
    minWidth: 80,
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: COLORS.surfaceLight,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.surface,
  },
  buttonTextDisabled: {
    color: COLORS.textLight,
  },
  pageInfo: {
    paddingHorizontal: SPACING.md,
  },
  pageText: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.textPrimary,
  },
});
