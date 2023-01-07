import firestore from "@react-native-firebase/firestore";
import auth, { firebase } from "@react-native-firebase/auth";

//firebase.initializeApp(config)

//Fetch devices collection from firebase
export const deviceRef = firestore().collection("devices");

//fetch users collection from firebase
export const userRef = firestore().collection("users");

//auth firebase
export const authDB = firebase.auth();
