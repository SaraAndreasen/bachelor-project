import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { View, Button, Text, Heading, FlatList } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { Pressable, ScrollView } from "react-native";
import {
  RenderDivider,
  RenderFooter,
  RenderHeader,
  BlackDivider,
  deviceRef,
  userRef,
  TakenDevices,
} from "../index";
import { updateLocation } from "../../assets/firebase/firestore/UpdateData";
import { firebase } from "@react-native-firebase/auth";
import {
  ALIGN_LEFT,
  DentsuDarkGray,
  DentsuLightGray,
  DIR_ROW,
  FLEX_ONE,
  LightGrayTint,
  PADDING_FIVE,
  POSITION_CENTER,
  TEN_PERC,
} from "../../components/design";

export function Checkout() {
  const navigation = useNavigation();
  const [devicesTaken, setDevicesTaken] = useState<TakenDevices[]>();

  useEffect(() => {
    //NOTE fetch the data from firestore
    const realtimeUpdate = async () => {
      const devices = await deviceRef.where("location", "!=", "CPH").get();
      const getLocationArray: TakenDevices[] = devices.docs.map((doc) => {
        //deconstructing the array
        return { id: doc.id, ...doc.data() } as TakenDevices;
      });
      //save the array in local state
      setDevicesTaken(getLocationArray);
    };
    return () => realtimeUpdate();
  }, []);

  return (
    <>
      <ScrollView>
        <View style={style.container}>
          <Heading size={"2xl"} style={style.checkinHeader}>
            Check-out
          </Heading>
          <Text style={style.headerText}>Check your device out below.</Text>
          <BlackDivider />
        </View>
        <FlatList
          data={devicesTaken}
          ListHeaderComponent={RenderHeader}
          ListFooterComponent={RenderFooter}
          ItemSeparatorComponent={RenderDivider}
          renderItem={({ item }) => {
            //NOTE display only items that has a location
            if (item.location) {
              return (
                <Pressable
                  style={({ pressed }) => [
                    {
                      backgroundColor: pressed
                        ? DentsuLightGray
                        : LightGrayTint,
                    },
                  ]}
                  onPress={async () => {
                    //NOTE Make sure users can't press on another persons device
                    const user = await userRef
                      .where("uid", "==", firebase.auth().currentUser?.uid)
                      .get();
                    const data = user.docs[0].data();
                    const userCPH = data.name + " / CPH";
                    const userHOME = data.name + " / Home";
                    console.log(userCPH); //works
                    console.log(userHOME); //works

                    //NOTE only be able to press if it is the user that is logged in, that is on the location
                    if (item.location == userCPH || item.location == userHOME) {
                      navigation.reset({
                        index: 0,
                        routes: [
                          {
                            name: "Check-out confirm",
                          },
                        ],
                      });
                      updateLocation(item.id, "newLocation");
                    } else {
                      return null;
                    }
                  }}
                >
                  <View style={style.viewRow}>
                    <Text style={style.flatlistModel}>{item.model}</Text>
                    <Text style={style.flatlistSoftware}>{item.software}</Text>
                    <Text style={style.flatlistLocation}>{item.location}</Text>
                    <Text style={style.flatlistId}>{item.device_id}</Text>
                  </View>
                </Pressable>
              );
            } else {
              return null;
            }
          }}
        ></FlatList>
      </ScrollView>
    </>
  );
}

export const style = StyleSheet.create({
  container: {
    maxWidth: 300,
    width: "75%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  checkinHeader: {
    marginTop: 48,
  },
  headerText: {
    marginBottom: 20,
  },
  text: {
    marginTop: PADDING_FIVE,
  },
  ScrollView: {
    marginHorizontal: "3%",
  },
  row: {
    flex: FLEX_ONE,
    flexDirection: DIR_ROW,
    textAlign: POSITION_CENTER,
  },
  cell: {
    justifyContent: POSITION_CENTER,
  },
  viewRow: {
    flexDirection: DIR_ROW,
    justifyContent: "space-between",
  },
  flatlistModel: {
    flex: FLEX_ONE,
    textAlign: ALIGN_LEFT,
    padding: PADDING_FIVE,
  },
  flatlistSoftware: {
    flex: FLEX_ONE,
    textAlign: ALIGN_LEFT,
    padding: PADDING_FIVE,
  },
  flatlistLocation: {
    flex: FLEX_ONE,
    textAlign: ALIGN_LEFT,
    padding: PADDING_FIVE,
  },
  flatlistId: {
    flex: FLEX_ONE,
    textAlign: ALIGN_LEFT,
    padding: PADDING_FIVE,
  },
  flatlistNavigate: {
    backgroundColor: DentsuDarkGray,
  },
  btn: {
    marginTop: TEN_PERC,
    marginBottom: TEN_PERC,
  },
  divider: {
    marginBottom: TEN_PERC,
  },
});
