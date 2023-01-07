import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CreateUser, WelcomePage } from "../screens";
import { LoggedOut } from "../screens/logout/Welcome";
import { NavigationContainer } from "@react-navigation/native";
const Stack = createNativeStackNavigator();

export function CreateUserNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="logged out"
          component={WelcomePage}
          options={{ title: "", headerTintColor: "black" }}
        />
        <Stack.Screen
          name="create user"
          component={CreateUser}
          options={{ title: "", headerTintColor: "black" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
