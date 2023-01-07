import React from "react";
import { StyleSheet } from "react-native";
import { View, Button, Text, VStack, Heading } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { useAppSelector } from "../../store/store";
import {
  AUTO_VAL,
  DentsuTeal,
  DIR_ROW,
  FiftyPercent,
  MarginTop25,
  Val50,
  VAL75PERCENT,
  WIDTH300,
} from "../../components/design";

export function CompletedCheckin() {
  const deviceID = useAppSelector(
    (state) => state.device.selectedDevice.device_id
  );
  const navigation = useNavigation();
  return (
    <>
      <View style={style.headerContainer}>
        <Heading size={"2xl"} style={style.container}>
          Check-in completed.
        </Heading>
        <Text>The device is now checked in. Thank you for returning it.</Text>

        <View paddingTop="32" style={style.btnContainer}>
          <Button
            style={style.bookingBtn}
            size="lg"
            bg={"accent.DentsuTeal"}
            _pressed={{ bgColor: "accent.DentsuTurquoise" }}
            onPress={() => {
              console.log("pressed");
              navigation.reset({
                index: 0,
                routes: [
                  {
                    name: "Checkin-screen",
                  },
                ],
              });
            }}
          >
            Back to Home
          </Button>
        </View>
      </View>
    </>
  );
}

const style = StyleSheet.create({
  bookingBtn: {
    width: FiftyPercent,
  },
  headerContainer: {
    maxWidth: WIDTH300,
    width: VAL75PERCENT,
    marginLeft: AUTO_VAL,
    marginRight: AUTO_VAL,
  },
  container: {
    marginTop: MarginTop25,
  },
  btnContainer: {
    flexDirection: DIR_ROW,
    maxWidth: WIDTH300,
    marginLeft: AUTO_VAL,
    marginRight: AUTO_VAL,
    marginTop: Val50,
  },
});
