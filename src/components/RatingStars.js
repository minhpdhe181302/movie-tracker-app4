import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { COLORS } from "../styles/colors";
import { SPACING } from "../styles/theme";

export default function RatingStars({ rating, onChange }) {
  const stars = [1, 2, 3, 4, 5];

  return (
    <View style={styles.container}>
      {stars.map((s) => (
        <TouchableOpacity
          key={s}
          onPress={() => onChange(s)}
          style={styles.starButton}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.star,
              { color: s <= rating ? COLORS.star : COLORS.starInactive },
            ]}
          >
            {s <= rating ? "★" : "☆"}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginVertical: SPACING.sm,
    gap: SPACING.xs,
  },
  starButton: {
    padding: SPACING.xs,
  },
  star: {
    fontSize: 32,
  },
});
