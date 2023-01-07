import React, { useState } from "react";
import { VStack, Button, Stack, View, Heading, Text } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { useAppSelector } from "../../store/store";
import { BlackDivider } from "../index";
import { TextInput } from "react-native";
import { style } from "./components/style/style";
import { firebase } from "@react-native-firebase/auth";

/*The welcome screen - the first page the user sees when opening the app. Here they can proceed to login or create a pin. */

//SECTION Pincode
/*
Redo the pincode so that you have to create a pincode after you've logged in and then it is saved in local storage along with an access token from firebase.
So whenever you login you create a new passcode that you use for that session. When the session is over you create a new passcode to use for the current authentication token.
*/

//!SECTION

//NOTE save user login in async storage where it does a login check and then if the user is logged in for the first time it spits out a method to create a pin code, then as long as the user session is active, it should give the pincode that the user can enter. When the user session is no longer active, it should prompt the user to create a new pin code

export function WelcomePage() {
  const navigation = useNavigation();
  const userEmail = useAppSelector((state) => state.user.email);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorEmailFirebase, setErrorEmailFirebase] = useState<string>();
  const [errorPasswordFirebase, setErrorPasswordFirebase] = useState<string>();
  const [error, setError] = useState<string>();

  // console.log("Pin from state", pin);
  //console.log("user from state", user);
  console.log("email from state", userEmail);
  //console.log("password from state", userPassword);
  console.log("saved email local state", email);

  const login = async (email: string, password: string) => {
    if (!email) {
      //Cannot have empty email
      setErrorEmailFirebase("Cannot have empty email");
      return;
    }
    if (!password) {
      //Cannot have empty password
      setErrorPasswordFirebase("Password can't be empty");
      return;
    }
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (err) {
      console.log(err);
      if (err.code === "auth/invalid-email") {
        const errMsg = "Invalid email";
        console.log(err);
        setErrorEmailFirebase(errMsg);
        setErrorPasswordFirebase(undefined);
        setError(undefined);
        console.log("invalid email");
        return;
      } else if (err.code === "auth/wrong-password") {
        const errMsg = "Wrong password";
        setErrorPasswordFirebase(errMsg);
        setErrorEmailFirebase(undefined);
        setError(undefined);
        console.log("Wrong password");
        return;
      } else if (err.code === "auth/user-not-found") {
        const errMsg = "Invalid user";
        setError(errMsg);
        return;
      } else if (err.code === "auth/network-request-failed") {
        const errMsg = "An error occured";
        setError(errMsg);
        return;
      } else {
        console.log("unhandled firebase login error");
      }
    }
  };

  return (
    <>
      {/*HStack is the equivalent to aligning content in a row. In example if you'd use Bootstrap you'd use class="row"*/}
      <View style={[style.welcomeContainer]}>
        <VStack>
          <Stack w="75%" maxW="300px" mx="auto" space={6} paddingTop={"16"}>
            <Heading size="2xl">Welcome</Heading>

            <TextInput
              style={[style.textInputW]}
              value={email}
              placeholder="E-mail"
              keyboardType="email-address"
              returnKeyType="done"
              textContentType="emailAddress"
              autoCapitalize="none"
              onChangeText={(text) => {
                setEmail(text);
                setErrorEmailFirebase(undefined);
                setError(undefined);
              }}
            />

            <TextInput
              style={[style.textInputW]}
              value={password}
              placeholder="Password"
              keyboardType="default"
              returnKeyType="done"
              textContentType="password"
              autoCapitalize="none"
              secureTextEntry
              onChangeText={(text) => {
                setPassword(text);
                setErrorPasswordFirebase(undefined);
                setError(undefined);
              }}
            />

            {error === undefined && (
              <Text color={"merkleColor.MerkleRed"} style={style.errorText}>
                {errorEmailFirebase}
              </Text>
            )}

            {error === undefined && (
              <Text color={"merkleColor.MerkleRed"} style={style.errorText}>
                {errorPasswordFirebase}
              </Text>
            )}

            {errorPasswordFirebase === undefined && (
              <Text color={"merkleColor.MerkleRed"} style={style.errorText}>
                {error}
              </Text>
            )}

            <Button
              bgColor={"accent.DentsuTeal"}
              size="lg"
              onPress={() => {
                login(email, password);
              }}
              _pressed={{ bgColor: "accent.DentsuTurquoise" }}
            >
              Login
            </Button>
            <View style={style.dividerWelcome}>
              <BlackDivider />
            </View>
            <Button
              bgColor={"accent.DentsuTeal"}
              size="lg"
              onPress={() => {
                navigation.navigate("create user");
              }}
              _pressed={{ bgColor: "accent.DentsuTurquoise" }}
            >
              Create user
            </Button>
          </Stack>
        </VStack>
      </View>
    </>
  );
}
