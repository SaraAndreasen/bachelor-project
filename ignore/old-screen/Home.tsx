import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Pressable,
  Alert,
} from "react-native";
import { VStack, Button, Text, Stack, Heading } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "../store/store";
import {
  BlackDivider,
  Device,
  deviceRef,
  userRef,
  RenderDivider,
  RenderHeader,
  RenderFooter,
} from "./index";
import { setDeviceID } from "../store/reducers/deviceIdSlice";
import { setID } from "../store/reducers/deviceDocIdSlice";
import { setName } from "../store/reducers/nameSlice";
import { firebase } from "@react-native-firebase/auth";
import {
  ALIGN_LEFT,
  DentsuLightGray,
  DIR_ROW,
  FLEX_ONE,
  LightGrayTint,
  PADDING_FIVE,
  POSITION_CENTER,
  RedTint2,
} from "../components/design";
import {
  RedTint3,
  SpaceAround,
  SpaceBetween,
} from "../../src/components/design";

export function Home() {
  const navigation = useNavigation();
  const user = useAppSelector((state) => state.user);
  const [devices, setDevice] = useState<any>();
  const [name, setNameLocal] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const devicesList = useRef();
  //console.log("Home user from state", user);

  const dispatch = useAppDispatch();

  //TODO Distribution + app center (firebase crashlytics (Events)). Splash screen +  development provisioning profile

  //Fetch user name
  const fetchUserName = async () => {
    try {
      //fetch the current user ID from the authentication and chain it to the data object.
      const user = await userRef
        .where("uid", "==", firebase.auth().currentUser?.uid)
        .get();
      const data = user.docs[0].data();

      console.log("user data => ", data.name);

      setNameLocal(data.name);
    } catch (err) {
      console.log(err);
    }
  };

  //NOTE Fetch device data
  useEffect(() => {
    //realtime database updates
    const unsub = deviceRef.onSnapshot((querySnapshot) => {
      const list: Device[] = [];
      //loop through our querySnapshot array with a forEach loop and save it as the Device interface
      querySnapshot.forEach((doc) => {
        const {
          device_id,
          location,
          model,
          model_num,
          producer,
          software,
          year,
        } = doc.data() as Device;
        //append the elements into the list array
        list.push({
          id: doc.id,
          device_id,
          location,
          model,
          model_num,
          producer,
          software,
          year,
        });
        setDevice(list);

        fetchUserName();
        if (loading) {
          setLoading(false);
          return <ActivityIndicator size="large" />;
        }
      });
    });

    //NOTE if the user is not signed in, return them to the welcome screen
    if (!user) return navigation.navigate("Welcome");

    //unsubscribe from realtime changes
    return () => unsub();
  }, [user]);

  //console.log("devices =>", devices);

  //NOTE move to index 0 at screen change
  const moveToTop = () => devicesList.current.scrollToIndex({ index: 0 });

  //NOTE set up conditions for colour change
  const getColor = (c) => {
    if (c == "CPH") {
      return 1;
    }
    if (c == " / Home") {
      return 2;
    }
    if (c == " / CPH") {
      return 3;
    }
  };

  return (
    <>
      <SafeAreaView>
        <ScrollView>
          <View>
            <VStack>
              <Stack w="75%" maxW="300px" mx="auto" space={6} paddingTop="12">
                <Heading size={"2xl"}>Welcome, {name}</Heading>
                <Button
                  bg="greyscale.DentsuBlack"
                  size="lg"
                  _pressed={{ bg: "merkleColor.TealTint2" }}
                  onPress={() => {
                    navigation.navigate("CheckinDevice");
                    moveToTop();
                  }}
                >
                  Check-in device
                </Button>
                <Button
                  bg="merkleColor.DentsuBlack"
                  size="lg"
                  _pressed={{ bg: "merkleColor.TealTint2" }}
                  onPress={() => {
                    navigation.navigate("Scan");
                    moveToTop();
                  }}
                >
                  Scan
                </Button>
                <BlackDivider />
                <Text fontSize={"3xl"}>Check out device</Text>
              </Stack>
            </VStack>
          </View>
          <FlatList
            ref={devicesList}
            data={devices}
            ListHeaderComponent={RenderHeader}
            ListFooterComponent={RenderFooter}
            ItemSeparatorComponent={RenderDivider}
            initialNumToRender={10}
            maxToRenderPerBatch={5}
            windowSize={21}
            contentContainerStyle={{
              flexGrow: 1,
            }}
            renderItem={({ item }) => (
              <Pressable
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed ? DentsuLightGray : LightGrayTint,
                  },
                ]}
                onPress={() => {
                  //NOTE only press if the location is singlehandedly CPH
                  if (item.location == "CPH") {
                    navigation.navigate("CheckoutDestination");
                    dispatch(setDeviceID(item.device_id));
                    dispatch(setID(item.id));
                    dispatch(setName(name));
                  } else {
                    Alert.alert("Device is already checked out.");
                    return null;
                  }
                }}
              >
                <View style={styles.viewRow}>
                  <Text style={styles.flatlistModel}>{item.model}</Text>
                  <Text style={styles.flatlistSoftware}>{item.software}</Text>
                  <Text
                    style={[
                      getColor(item.location) == 1 ? styles.cph : styles.away,
                    ]}
                  >
                    {item.location}
                  </Text>
                  <Text style={styles.flatlistId}>{item.device_id}</Text>
                </View>
              </Pressable>
            )}
          ></FlatList>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  away: {
    backgroundColor: RedTint2,
    flex: FLEX_ONE,
    textAlign: ALIGN_LEFT,
    padding: PADDING_FIVE,
  },
  cph: {
    backgroundColor: LightGrayTint,
    flex: FLEX_ONE,
    textAlign: ALIGN_LEFT,
    padding: PADDING_FIVE,
  },
  text: {
    fontSize: 42,
  },
  rowAway: {
    backgroundColor: RedTint3,
    flexDirection: DIR_ROW,
    justifyContent: SpaceAround,
    textAlign: POSITION_CENTER,
  },
  viewRow: {
    flexDirection: DIR_ROW,
    justifyContent: SpaceBetween,
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
});
