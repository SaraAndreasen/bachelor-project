import React from "react";
import { Button, View } from "native-base";
import { firebase } from "@react-native-firebase/auth";

export function LogOutButton() {
  return (
    <>
      <View>
        <Button
          bg="accent.DentsuTeal"
          colorScheme={"success"}
          size={"sm"}
          _pressed={{ bg: "accent.DentsuTurquoise" }}
          onPress={() => {
            firebase
              .auth()
              .signOut()
              .then(() => console.log("user signed out"));
          }}
        >
          Logout
        </Button>
      </View>
    </>
  );
}
