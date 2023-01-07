import React, { useState } from "react";
import { VStack, Button, View, Heading, Text } from "native-base";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { style } from "./components/style/style";
import { firebase } from "@react-native-firebase/auth";

export interface UserData {
  name: string;
  email: string;
  password: string;
}

export function CreateUser() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [errorNameFirebase, setErrorNameFirebase] = useState<string>();
  const [errorEmailFirebase, setErrorEmailFirebase] = useState<string>();
  const [errorPasswordFirebase, setErrorPasswordFirebase] = useState<string>();
  const [error, setError] = useState<string>();
  const navigation = useNavigation();

  // const fetchNameFromFirebase = async () => {
  //   await firebase
  //     .firestore()
  //     .collection("users")
  //     .where("name", "==", name)
  //     .get();
  // };
  //create user
  const createAccount = async (
    email: string,
    password: string,
    name: string
  ) => {
    if (!name) {
      setErrorNameFirebase("Cannot have empty name");
      console.log("name");
      return;
    }
    const fetchNameFromFirebase = async (name) => {
      const fetchDuplicateName = await firebase
        .firestore()
        .collection("users")
        .where("name", "==", name)
        .get();
      const duplicateName = fetchDuplicateName.docs[0].data().name;
      console.log("duplicateName", fetchDuplicateName.docs[0].data().name);
      if (name === duplicateName) {
        setErrorNameFirebase(
          "Name already exists. Please check if you have added your last name initial."
        );
        console.log("names", name + "and" + duplicateName);
        return;
      } else {
        console.log("name");
      }
      return;
    };
    const waitForName = async (name) => {
      const firebaseName = await fetchNameFromFirebase(name);

      console.log("firebasename", firebaseName);
    };

    waitForName(name);
    // if (name === duplicateName) {
    //   setErrorNameFirebase(
    //     "Name already exists. Please check if you have added your last name initial."
    //   );
    //   console.log("names", name + "and" + duplicateName);
    //   return;
    // }
    if (!email) {
      setErrorEmailFirebase("Cannot have empty email");
      return;
    }
    if (!email.includes("@merkle.com")) {
      setErrorEmailFirebase("You need to use your work mail");
      return;
    }
    if (!password) {
      setErrorPasswordFirebase("Cannot have empty password");
      return;
    }

    try {
      //create user to firebase authentication, and store the user in the "users" database.
      const userCredentials = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      const user = userCredentials.user;
      const userId = await firebase
        .firestore()
        .collection("users")
        .where("uid", "==", user.uid)
        .get();
      //If there are no values with the user inputs add to database
      if (userId.docs.length === 0) {
        await firebase.firestore().collection("users").add({
          uid: firebase.auth().currentUser?.uid,
          name,
          email,
        });
      }
    } catch (err) {
      console.log(err);

      if (err.code === "auth/invalid-email") {
        const errMsg = "Invalid email";
        setErrorEmailFirebase(errMsg);
        setErrorPasswordFirebase(undefined);
        setErrorNameFirebase(undefined);
        setError(undefined);
        return;
      } else if (err.code === "auth/email-already-in-use") {
        const errMsg = "Email already in use";
        setErrorEmailFirebase(errMsg);
        setErrorPasswordFirebase(undefined);
        setErrorNameFirebase(undefined);
        setError(undefined);
        return;
      } else if (err.code === "auth/weak-password") {
        const errMsg = "Password must be at least 6 characters";
        setErrorPasswordFirebase(errMsg);
        setErrorEmailFirebase(undefined);
        setErrorNameFirebase(undefined);
        setError(undefined);
      } else if (err.code === "firestore/permission-denied") {
        const errMsg = "You do not have permission to do that";
        setError(errMsg);
        setErrorPasswordFirebase(undefined);
        setErrorNameFirebase(undefined);
        setErrorEmailFirebase(undefined);
        return;
      } else {
        console.log("unhandle firebase user creation erro");
      }
    }
  };

  return (
    <>
      {/*HStack is the equivalent to aligning content in a row. In example if you'd use Bootstrap you'd use class="row"*/}

      <KeyboardAvoidingView
        behavior={"position"}
        style={style.containerCU}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
        //behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <VStack width="90%" mx="3" maxW="300px">
              <Heading size={"2xl"} paddingBottom="15" paddingTop={"12"}>
                Create user
              </Heading>
              <Text style={style.textDesc}>First name</Text>
              <Text>
                If you have more than one person with the same name, use your
                first name and the first letter of your last name: Lars L
              </Text>
              <View>
                <TextInput
                  style={style.textInputCU}
                  value={name}
                  placeholder="First name"
                  onChangeText={(text) => {
                    setName(text);
                    setErrorNameFirebase(undefined);
                    setError(undefined);
                    setErrorEmailFirebase(undefined);
                    setErrorPasswordFirebase(undefined);
                  }}
                  keyboardType="default"
                  returnKeyType="done"
                ></TextInput>

                {/*Call the state to display the error codes */}
                <Text color={"primary.MerkleRed"} style={style.errorText}>
                  {errorNameFirebase}
                </Text>
              </View>

              <Text style={style.textDesc}>Email</Text>
              <View>
                <TextInput
                  style={style.textInputCU}
                  value={email}
                  placeholder="Email"
                  autoCapitalize="none"
                  onChangeText={(text) => {
                    setEmail(text);
                    setErrorNameFirebase(undefined);
                    setError(undefined);
                    setErrorEmailFirebase(undefined);
                    setErrorPasswordFirebase(undefined);
                    setErrorEmailFirebase(undefined);
                  }}
                  keyboardType="email-address"
                  returnKeyType="done"
                ></TextInput>

                {/*Call the state to display the error codes */}
                <Text color={"primary.MerkleRed"} style={style.errorText}>
                  {errorEmailFirebase}
                </Text>
              </View>
              <Text style={style.textDesc}>Password</Text>
              <View>
                <TextInput
                  value={password}
                  style={style.textInputCU}
                  placeholder="Password"
                  autoCapitalize="none"
                  secureTextEntry
                  onChangeText={(text) => {
                    setPassword(text);
                    setErrorNameFirebase(undefined);
                    setError(undefined);
                    setErrorEmailFirebase(undefined);
                    setErrorPasswordFirebase(undefined);
                  }}
                  keyboardType="default"
                  returnKeyType="done"
                ></TextInput>

                {/*Call the state to display the error codes */}
                <Text color={"primary.MerkleRed"} style={style.errorText}>
                  {errorPasswordFirebase}
                </Text>
              </View>

              <Button
                marginTop={"10"}
                bgColor={"accent.DentsuTeal"}
                size="lg"
                _pressed={{ bgColor: "accent.DentsuTurquoise" }}
                onPress={() => {
                  createAccount(email, password, name);
                }}
              >
                Create
              </Button>
            </VStack>
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}
