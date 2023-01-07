/*import { collection, getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
 
export const firebaseConfig = {
 apiKey: "AIzaSyDs3cEK7owhj3XZ9MHaxTIi08Ki20xG-eo",
 authDomain: "device-booking-95e2c.firebaseapp.com",
 databaseURL: "https://project-id.firebaseio.com",
 projectId: "device-booking-95e2c",
 storageBucket: "device-booking-95e2c.appspot.com",
 messagingSenderId: "356988819777",
 appId: "1:356988819777:ios:9466eb8438365059a669c0",
};
 
const app = initializeApp(firebaseConfig);
 
export const db = getFirestore(app);
 
export const devicesCollecction = collection(db, "devices");
 
//initialize firebase authentication referencing to the config
export const auth = getAuth(app);
 
*/
import firebase from "@react-native-firebase/app";
import { Platform } from "react-native";

// Your secondary Firebase project credentials for Android...

const androidCredentials = {
  clientId:
    "356988819777-ahckoevcqo4mqnd2ce1lctvhf6uupd7f.apps.googleusercontent.com",
  appId: "1:356988819777:android:97c9a2e9060d3707a669c0",
  apiKey: "AIzaSyDDI-nfgSNYxeKhyt6-zkQ4YUPmPtezYgc",
  databaseURL: "https://project-id.firebaseio.com",
  storageBucket: "device-booking-95e2c.appspot.com",
  messagingSenderId: "356988819777",
  projectId: "device-booking-95e2c",
};

// Your secondary Firebase project credentials for iOS...
const iosCredentials = {
  clientId:
    "356988819777-2q72heuhj1j2povh2860dt45tumkm6jd.apps.googleusercontent.com",
  appId: "1:356988819777:ios:9466eb8438365059a669c0",
  apiKey: "AIzaSyDs3cEK7owhj3XZ9MHaxTIi08Ki20xG-eo",
  databaseURL: "https://project-id.firebaseio.com",
  storageBucket: "device-booking-95e2c.appspot.com",
  messagingSenderId: "356988819777",
  projectId: "device-booking-95e2c",
};

// Select the relevant credentials
/*
const credentials = Platform.select({
  android: androidCredentials,
  ios: iosCredentials,
});

const config = {
  name: "SECONDARY_APP",
};

//await firebase.initializeApp(credentials, config);

//await firebase.initializeApp(credentials, config);

const apps = firebase.apps;

apps.forEach((app) => {
  console.log("app name: ", app.name);
});
*/
