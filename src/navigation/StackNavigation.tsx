import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  Home,
  Specs,
  CheckIn,
  CheckoutDevice,
  CheckOutFrontScreen,
  CompleteCheckOut,
  CompletedCheckin,
  CreateUser,
  WelcomePage,
} from "../screens";
const Stack = createNativeStackNavigator();
export function SpecsNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="all-devices-screen"
        component={Home}
        options={{ title: "" }}
      />
      <Stack.Screen
        name="Specs"
        component={Specs}
        options={{ title: "", headerTintColor: "black" }}
      />
    </Stack.Navigator>
  );
}

export function CheckOutNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Checkout-screen"
        component={CheckOutFrontScreen}
        options={{ title: "", headerTintColor: "black" }}
      />

      <Stack.Screen
        name="Check-out device"
        component={CheckoutDevice}
        options={{ title: "", headerTintColor: "black" }}
      />

      <Stack.Screen
        name="Check-out confirm"
        component={CompleteCheckOut}
        options={{ title: "", headerTintColor: "black" }}
      />
    </Stack.Navigator>
  );
}

export function CheckInNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Checkin-screen"
        component={CheckIn}
        options={{ title: "", headerTintColor: "black" }}
      />
      <Stack.Screen
        name="Checkin-complete"
        component={CompletedCheckin}
        options={{ title: "", headerTintColor: "black" }}
      />
    </Stack.Navigator>
  );
}

export function CreateUserNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="create user" component={CreateUser} />
    </Stack.Navigator>
  );
}
export function LoginNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="login-screen" component={WelcomePage} />
    </Stack.Navigator>
  );
}
