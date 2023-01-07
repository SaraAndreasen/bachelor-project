import React, { useEffect } from "react";
import { View, Heading, Button } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { useAppSelector } from "../../store/store";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withSequence,
  useAnimatedProps,
  runOnJS,
} from "react-native-reanimated";
import Svg, { Circle } from "react-native-svg";
import { style } from "./components/style/style";

/*This page is the final page in the checkout flow. Once the user has chosen a device, picked wether to take it home or not, they will eventually end up here. */

const HEIGHT_LITTLE = 25;
const HEIGHT_BIG = 50;
const WIDTH = 10;
const BORDER_RAD = 25;
const CIRCLE_LENGTH = 500;

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export function CompleteCheckOut() {
  //initial values
  const progressA = useSharedValue(0);
  const progressB = useSharedValue(0);
  const circleAnimation = useSharedValue(0);
  const sharedValue = useSharedValue(0);
  const navigation = useNavigation();

  //NOTE fetch device_id from redux
  const deviceID = useAppSelector(
    (state) => state.device.selectedDevice.device_id
  );

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: CIRCLE_LENGTH * (1 - circleAnimation.value),
  }));

  //NOTE set opacity for the animation and other style
  const reanimatedStyleA = useAnimatedStyle(() => {
    return {
      opacity: progressA.value,
      transform: [{ rotate: "145deg" }],
      marginBottom: "-14%",
    };
  }, []);

  //NOTE set opacity for the animation and other style
  const reanimatedStyleB = useAnimatedStyle(() => {
    return {
      opacity: progressB.value,
      transform: [{ rotate: "200deg" }],
    };
  });

  //NOTE switch back to the homepage
  const pageShift = () => {
    navigation.reset({
      index: 0,
      routes: [
        {
          name: "Checkout-screen",
        },
      ],
    });
  };

  //NOTE to get the callback to work, you need a worklet, with runOnJS, with the function you want to call
  const flowCompleted = () => {
    "worklet";
    runOnJS(pageShift)();
  };

  useEffect(() => {
    sharedValue.value = withSequence(
      (progressA.value = withDelay(250, withTiming(1, { duration: 150 }))),
      (progressB.value = withDelay(500, withTiming(1, { duration: 300 }))),
      (circleAnimation.value = withDelay(
        1000,
        withTiming(1, { duration: 1000 }, flowCompleted)
      ))
    );
  }, []);

  console.log("device id from state => ", deviceID);
  //
  return (
    <>
      {/*Display the ID from redux */}
      <View>
        <Heading size={"xl"} style={style.h1}>
          You have now booked {deviceID}.
        </Heading>
      </View>
      {/* 
      <Button onPress={() => navigation.reset("all-devices-screen")}>
        Back
      </Button> */}

      <View style={style.mainContainer}>
        <View style={style.containerA}>
          {/*front */}
          <View style={style.containerC}>
            {/*Middle */}

            <View style={style.containerB}>
              {/*Center */}
              <Svg width="100" height="100">
                <AnimatedCircle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="#41547D"
                  strokeWidth={7}
                  strokeDasharray={CIRCLE_LENGTH}
                  animatedProps={animatedProps}
                  strokeLinecap={"round"}
                />
              </Svg>
              {/*Center end */}
            </View>
            <Animated.View
              style={[
                {
                  height: HEIGHT_LITTLE,
                  width: WIDTH,
                  backgroundColor: "#00CACF",
                  transform: [{ rotate: "145deg" }],
                  borderRadius: BORDER_RAD,
                  marginTop: "5%",
                  marginBottom: "-12%",
                  marginRight: "3%",
                },
                reanimatedStyleA,
              ]}
            />
            <Animated.View
              style={[
                {
                  height: HEIGHT_BIG,
                  width: WIDTH,
                  backgroundColor: "#00CACF",
                  transform: [{ rotate: "200deg" }],
                  borderRadius: BORDER_RAD,
                  marginLeft: "4%",
                },
                reanimatedStyleB,
              ]}
            />
            {/*Middle end */}
          </View>

          {/*Front end */}
        </View>
      </View>
    </>
  );
}
