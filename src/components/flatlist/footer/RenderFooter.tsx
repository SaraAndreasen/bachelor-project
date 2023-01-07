import React from "react";
import { View, StyleSheet } from "react-native";
import { LightGrayTint, POSITION_CENTER } from "../../design";

export const RenderFooter = () => {
  return <View style={styles.footer}></View>;
};

const styles = StyleSheet.create({
  footer: {
    fontSize: 30,
    paddingVertical: 15,
    fontWeight: "bold",
    textAlign: POSITION_CENTER,
    backgroundColor: LightGrayTint,
  },
});
