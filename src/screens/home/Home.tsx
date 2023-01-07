import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  SafeAreaView,
  ScrollView,
  Pressable,
} from "react-native";
import { VStack, Text, Stack, Heading } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch } from "../../store/store";
import { setSelectedDevice } from "../index";
import {
  BlackDivider,
  Device,
  deviceRef,
  RenderDivider,
  RenderHeader,
  RenderFooter,
} from "../index";
//import { firebase } from "@react-native-firebase/auth";
import {
  ALIGN_LEFT,
  DentsuLightGray,
  DIR_ROW,
  FLEX_ONE,
  LightGrayTint,
  PADDING_FIVE,
  POSITION_CENTER,
  RedTint2,
  RedTint3,
  SpaceAround,
  SpaceBetween,
} from "../../components/design";
import { LogOutButton } from "../index";
import { firebase } from "@react-native-firebase/auth";

export function Home() {
  const navigation = useNavigation();
  const [specs, setSpecs] = useState([]);
  const devicesList = useRef();

  const dispatch = useAppDispatch();

  //TODO Distribution + app center (firebase crashlytics (Events)). Splash screen +  development provisioning profile

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
        setSpecs(list);
      });
    });

    //unsubscribe from realtime changes
    return () => unsub();
  }, []);

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
                <Heading size={"2xl"}>Devices</Heading>
                <BlackDivider />
                <LogOutButton />
              </Stack>
            </VStack>
          </View>
          <FlatList
            ref={devicesList}
            data={specs}
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
                  navigation.navigate("Specs");
                  dispatch(setSelectedDevice(item));
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
