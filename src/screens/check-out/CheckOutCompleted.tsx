import React from "react";
import { useAppSelector } from "../../store/store";
import { View, Text, StyleSheet, Alert } from "react-native";
import { Button, Heading } from "native-base";
import { BlackDivider } from "../../components/common/BlackDivider";
import { AUTO_VAL, DentsuTeal, DIR_ROW, FiftyPercent, FONTSIZE24, FONTWEIGHTBOLD, MarginTop15, MarginTop25, POSITION_CENTER, Val50, VAL75PERCENT, WIDTH300 } from "../../components/design";

/*The page for chosing if the user wants to take the device home or keep it in the office */

export function Test() {
  //NOTE fetch device_id from redux
  const deviceID = useAppSelector(
    (state) => state.device.selectedDevice.device_id
  );
  //const device_id = useAppSelector((state) => state.device.selectedDevice);
  //console.log("device id from state => ", device_id);

  return (
    <>
      <View>
        <View style={style.headerContainer}>
          <Heading size={"2xl"} style={style.container}>
            You have now booked
          </Heading>
          <View style={style.deviceIdContainer}>
            <Text style={style.deviceTitleId}>{deviceID}</Text>
          </View>
          <BlackDivider />

          <Button></Button>
        </View>
      </View>
    </>
  );
}

const style = StyleSheet.create({
  container: {
    marginTop: MarginTop25,
  },
  specsContainer: {
    alignItems: POSITION_CENTER,
    marginTop: MarginTop15,
  },
  headerContainer: {
    maxWidth: WIDTH300,
    width: VAL75PERCENT,
    marginLeft: AUTO_VAL,
    marginRight: AUTO_VAL,
  },
  deviceTitleId: {
    fontSize: FONTSIZE24,
    fontWeight: FONTWEIGHTBOLD,
    marginBottom: MarginTop15,
    color: DentsuTeal,
  },
  textOne: { fontSize: FONTSIZE24, fontWeight: FONTWEIGHTBOLD },
  deviceIdContainer: {
    flexDirection: DIR_ROW,
  },
  bookingBtn: {
    width: FiftyPercent,
    backgroundColor: DentsuTeal,
  },
  btnContainer: {
    flexDirection: DIR_ROW,
    maxWidth: WIDTH300,
    marginLeft: AUTO_VAL,
    marginRight: AUTO_VAL,
    marginTop: Val50,
  },
});
