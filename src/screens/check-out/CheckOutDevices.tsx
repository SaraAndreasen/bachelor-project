import React, { useEffect, useState } from "react";
import { View, Text, Heading, FlatList } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { Pressable, ScrollView } from "react-native";
import {
  RenderDivider,
  RenderFooter,
  RenderHeader,
  BlackDivider,
  AvailableDevices,
  deviceRef,
  userRef,
  useAppDispatch,
  setSelectedDevice,
} from "../index";
import { style } from "../check-in/components/style/style";
import { firebase } from "@react-native-firebase/auth";
import { DentsuLightGray, LightGrayTint } from "../../components/design";

export function CheckoutDevice({ route }) {
  const navigation = useNavigation();
  const [availableDevices, setAvailableDevices] = useState([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    //NOTE fetch the data from firestore
    const realtimeUpdate = async () => {
      const devices = await deviceRef.where("location", "==", "CPH").get();
      const getLocationArray: AvailableDevices[] = devices.docs.map((doc) => {
        //deconstructing the array
        return { id: doc.id, ...doc.data() } as AvailableDevices;
      });
      //save the array in local state
      setAvailableDevices(getLocationArray);
    };
    realtimeUpdate();
  }, []);

  //NOTE update to name/away
  const updateCheckOutLocation = async (id: string, name: string) => {
    const docRef = firebase.firestore().collection("devices").doc(id);
    const user = await userRef
      .where("uid", "==", firebase.auth().currentUser?.uid)
      .get();
    const data = user.docs[0].data();

    docRef.update({
      location: data.name + " / " + route.params.location,
    });
  };
  console.log("devices", availableDevices);
  return (
    <>
      <ScrollView>
        <View style={style.container}>
          <Heading size={"2xl"} style={style.checkinHeader}>
            Check-out to {route.params.location}
          </Heading>
          <BlackDivider />
        </View>
        <FlatList
          data={availableDevices}
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
                    const newDeviceLocation = data.name + route.params.location;
                    console.log(newDeviceLocation); //works

                    // NOTE only be able to press if it is the user that is logged in, that is on the location
                    navigation.reset({
                      index: 0,
                      routes: [
                        {
                          name: "Check-out confirm",
                        },
                      ],
                    });
                    console.log("Location", item.location);
                    console.log("item id", item.id);
                    dispatch(setSelectedDevice(item));
                    updateCheckOutLocation(item.id, "newLocation");
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
