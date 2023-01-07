import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, Heading } from "native-base";
import { BlackDivider } from "../../components/common/BlackDivider";
import { useNavigation } from "@react-navigation/native";
import {
  AUTO_VAL,
  FLEX_ONE,
  FONTSIZE24,
  MarginTop48,
  POSITION_CENTER,
  VAL75PERCENT,
  WIDTH300,
} from "../../components/design";

/*The page for chosing if the user wants to take the device home or keep it in the office */

export function CheckOutFrontScreen() {
  const navigation = useNavigation();
  return (
    <>
      <View style={style.headerContainer}>
        <Heading size={"2xl"} style={style.checkinHeader}>
          Check-out
        </Heading>
        <Text style={style.headerText}>
          Choose where you want to take a device below.
        </Text>
        <BlackDivider />
      </View>
      <View style={style.btnContainer}>
        <Button
          bgColor={"accent.DentsuTeal"}
          marginBottom={"10"}
          size={"lg"}
          _pressed={{ bgColor: "accent.DentsuTurquoise" }}
          onPress={() =>
            navigation.navigate("Check-out device", {
              location: "Home",
            })
          }
        >
          Home
        </Button>
        <Button
          bgColor={"accent.DentsuTeal"}
          size={"lg"}
          _pressed={{ bgColor: "accent.DentsuTurquoise" }}
          onPress={() =>
            navigation.navigate("Check-out device", {
              location: "CPH",
            })
          }
        >
          Office
        </Button>
      </View>
    </>
  );
}

//Use of props to transfer Home and CPH??
const style = StyleSheet.create({
  checkinHeader: {
    marginTop: MarginTop48,
  },
  headerContainer: {
    maxWidth: WIDTH300,
    width: VAL75PERCENT,
    marginLeft: AUTO_VAL,
    marginRight: AUTO_VAL,
  },
  headerText: {
    marginBottom: FONTSIZE24,
  },
  btnContainer: {
    flex: FLEX_ONE,
    justifyContent: POSITION_CENTER,
    maxWidth: WIDTH300,
    width: VAL75PERCENT,
    marginLeft: AUTO_VAL,
    marginRight: AUTO_VAL,
  },
  btnText: {
    fontSize: FONTSIZE24,
  },
});
