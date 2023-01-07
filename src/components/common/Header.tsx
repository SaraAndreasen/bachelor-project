import React from "react";
import { Image } from "react-native";
import { HStack, Box, StatusBar } from "native-base";

export function Header() {
  return (
    <>
      {/*NOTE The box and Statusbar below are together. Without the box, all the content would be ontop of the StatusBar. */}
      <StatusBar barStyle="default" hidden={true} />
      <Box safeAreaTop bgColor="greyscale.DentsuBlack" />
      <HStack
        bgColor="greyscale.DentsuBlack"
        px="1"
        py="3"
        justifyContent={"center"}
        w="100%"
      >
        <HStack padding={"1.5"}>
          <Image
            source={require("../../assets/2022-05_Merkle-logo-white_150.png")}
          ></Image>
        </HStack>
      </HStack>
    </>
  );
}
