import React from "react";
import { View, Text } from "native-base";
import { useNavigation } from "@react-navigation/native";

export function Scan() {
  const navigation = useNavigation();
  return (
    <>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Scan Screen</Text>
      </View>
    </>
  );
}
