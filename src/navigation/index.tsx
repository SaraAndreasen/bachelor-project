import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faArrowTurnDown,
  faArrowTurnUp,
  faMobileScreenButton,
} from "@fortawesome/free-solid-svg-icons";
import {
  CheckInNavigator,
  CheckOutNavigator,
  SpecsNavigator,
} from "./StackNavigation";

export function Navigation() {
  const Tab = createBottomTabNavigator();
  return (
    <>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="All Devices"
          screenOptions={({ route }) => ({
            headerShown: false,
            unmountOnBlur: true,
            tabBarIcon: ({ focused }) => {
              let focusedIcon;
              if (route.name === "Check-out") {
                focusedIcon = focused ? (
                  <FontAwesomeIcon
                    icon={faArrowTurnUp}
                    style={style.navigationIconFocused}
                    size={20}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faArrowTurnUp}
                    style={style.navigationIcon}
                  />
                );
              } else if (route.name === "Check-in") {
                focusedIcon = focused ? (
                  <FontAwesomeIcon
                    icon={faArrowTurnDown}
                    style={style.navigationIconFocused}
                    size={20}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faArrowTurnDown}
                    style={style.navigationIcon}
                  />
                );
              } else if (route.name === "All Devices") {
                focusedIcon = focused ? (
                  <FontAwesomeIcon
                    icon={faMobileScreenButton}
                    style={style.navigationIconFocused}
                    size={20}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faMobileScreenButton}
                    style={style.navigationIcon}
                  />
                );
              }
              return focusedIcon;
            },
            tabBarActiveTintColor: "#06757e",
            tabBarInactiveTintColor: "gray",
          })}
        >
          <Tab.Screen name="Check-out" component={CheckOutNavigator} />
          <Tab.Screen name="All Devices" component={SpecsNavigator} />
          <Tab.Screen name="Check-in" component={CheckInNavigator} />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}

const style = StyleSheet.create({
  navigationIcon: {
    color: "gray",
  },
  navigationIconFocused: {
    color: "#06757e",
  },
});
