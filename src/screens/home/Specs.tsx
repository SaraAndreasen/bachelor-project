import React from "react";
import { useAppSelector } from "../../store/store";
import { View, Text, StyleSheet, Alert } from "react-native";
import { Button, Heading } from "native-base";
import { BlackDivider } from "../../components/common/BlackDivider";
import { useNavigation } from "@react-navigation/native";
import {
  AUTO_VAL,
  DentsuTeal,
  DIR_ROW,
  FiftyPercent,
  FONTSIZE24,
  FONTWEIGHTBOLD,
  MarginTop15,
  MarginTop25,
  POSITION_CENTER,
  Val50,
  VAL75PERCENT,
  WIDTH300,
} from "../../components/design";

/*The page for chosing if the user wants to take the device home or keep it in the office */

export function Specs() {
  const navigation = useNavigation();
  //NOTE fetch device_id from redux
  const allInfo = useAppSelector((state) => state.device.selectedDevice);

  console.log("Devices", allInfo);

  return (
    <>
      <View>
        <View style={style.headerContainer}>
          <Heading size={"2xl"} style={style.container}>
            Specifications
          </Heading>
          <View style={style.deviceIdContainer}>
            <Text style={style.textOne}>For</Text>
            <Text style={style.deviceTitleId}> {allInfo.device_id}</Text>
          </View>
          <BlackDivider />
        </View>
        <View style={style.specsContainer}>
          <View style={style.deviceIdContainer}>
            <Text style={style.textOne}>Model</Text>
            <Text style={style.deviceTitleId}> {allInfo.model}</Text>
          </View>
          <View style={style.deviceIdContainer}>
            <Text style={style.textOne}>Model number</Text>
            <Text style={style.deviceTitleId}> {allInfo.model_num}</Text>
          </View>
          <View style={style.deviceIdContainer}>
            <Text style={style.textOne}>Year introduced</Text>
            <Text style={style.deviceTitleId}> {allInfo.year}</Text>
          </View>
          <View style={style.deviceIdContainer}>
            <Text style={style.textOne}>Software</Text>
            <Text style={style.deviceTitleId}> {allInfo.software}</Text>
          </View>
          <View style={style.deviceIdContainer}>
            <Text style={style.textOne}>Location</Text>
            <Text style={style.deviceTitleId}> {allInfo.location}</Text>
          </View>
          <View style={style.deviceIdContainer}>
            <Text style={style.textOne}>Device id</Text>
            <Text style={style.deviceTitleId}> {allInfo.device_id}</Text>
          </View>
        </View>
        <View style={style.btnContainer}>
          <Button
            bgColor={"accent.DentsuTeal"}
            size="lg"
            onPress={() => {
              if (allInfo.location != "CPH") {
                Alert.alert("This device is not free");
              } else {
                navigation.navigate("Check-out");
              }
            }}
            _pressed={{ bgColor: "accent.DentsuTurquoise" }}
          >
            Book device
          </Button>
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
