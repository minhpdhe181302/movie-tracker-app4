import { StyleSheet } from "react-native";
import { COLORS } from "./colors";

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const BORDER_RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};

export const SHADOWS = {
  small: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  large: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
};

export const TYPOGRAPHY = {
  h1: {
    fontSize: 32,
    fontWeight: "bold",
    color: COLORS.textPrimary,
  },
  h2: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.textPrimary,
  },
  h3: {
    fontSize: 20,
    fontWeight: "600",
    color: COLORS.textPrimary,
  },
  body: {
    fontSize: 16,
    color: COLORS.textPrimary,
  },
  bodySecondary: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  caption: {
    fontSize: 12,
    color: COLORS.textLight,
  },
};

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    ...SHADOWS.small,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderRadius: BORDER_RADIUS.md,
    alignItems: "center",
    justifyContent: "center",
    ...SHADOWS.small,
  },
  buttonText: {
    color: COLORS.surface,
    fontSize: 16,
    fontWeight: "600",
  },
});
