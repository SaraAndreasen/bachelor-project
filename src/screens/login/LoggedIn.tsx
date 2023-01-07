import { View, Text } from "react-native";
import React, { useState } from "react";
import { NativeBaseProvider, extendTheme } from "native-base";
import { Provider } from "react-redux";
import { store } from "../../store/store";
import { Navigation } from "../../navigation";
import { firebase } from "@react-native-firebase/auth";

export function LoggedIn() {
  const theme = extendTheme({
    colors: {
      primary: {
        MerkleBlue: "#12295d",
        MerkleRed: "#f23a1d",
        BlueTint1: "#41547d",
        RedTint1: "#ff644c",
      },
      accent: {
        DentsuPurple: "#5b19c4",
        PurpleTint1: "#996ddf",
        DentsuTurquoise: "#00cacf",
        TurqouiseTint1: "#a2f9fb",
        MerkleYellow: "#ffdc69",
        YellowTint1: "#fff3cd",
        DentsuTeal: "#06757e",
        TealTint1: "#439ca3",
      },
      greyscale: {
        DentsuBlack: "#05051e",
        DentsuDarkGray: "#60607d",
        DarkGreyTint: "#8888a1",
        DentsuMidGray: "#aeaebc",
        MidGrayTint: "#d6d6df",
        DentsuLightGray: "#e5e5e9",
        LightGrayTint: "#f2f2f4",
      },
      /*Use Merkles own font? (https://fonts.adobe.com/fonts/proxima-nova) */
    },
  });

  const user = firebase.auth().currentUser?.email;
  console.log("USER EMAIL", user);
  return (
    <Provider store={store}>
      <NativeBaseProvider theme={theme}>
        <Navigation />
      </NativeBaseProvider>
    </Provider>
  );
}
