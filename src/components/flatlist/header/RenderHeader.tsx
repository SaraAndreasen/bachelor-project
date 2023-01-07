import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const RenderHeader = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>Model</Text>
      <Text style={styles.headerText}>Software</Text>
      <Text style={styles.headerText}>Location</Text>
      <Text style={styles.headerText}>Device ID</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerText: {
    marginTop: 20,
    fontSize: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
