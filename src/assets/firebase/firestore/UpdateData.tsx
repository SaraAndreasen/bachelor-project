import { firebase } from "@react-native-firebase/auth";
import { userRef } from "../../.././screens/index";

//NOTE UPDATE to CPH
export const updateLocation = async (id: string, newLocation: string) => {
  const idRef = firebase.firestore().collection("devices").doc(id);
  await idRef
    .update({
      location: "CPH",
    })
    .then(() => {
      console.log("Devices updated");
    });
};

//NOTE Update to Name/CPH
export const updateCheckOutOffice = async (id: string, name: string) => {
  const docRef = firebase.firestore().collection("devices").doc(id);
  const user = await userRef
    .where("uid", "==", firebase.auth().currentUser?.uid)
    .get();
  const data = user.docs[0].data();

  docRef.update({
    location: data.name + " / CPH",
  });
};

//NOTE update to name/away
export const updateCheckOutHome = async (id: string, name: string) => {
  const docRef = firebase.firestore().collection("devices").doc(id);
  const user = await userRef
    .where("uid", "==", firebase.auth().currentUser?.uid)
    .get();
  const data = user.docs[0].data();

  docRef.update({
    location: data.name + " / Home",
  });
};

//NOTE update to name/away
export const updateCheckOutLocation = async (id: string, name: string) => {
  const docRef = firebase.firestore().collection("devices").doc(id);
  const user = await userRef
    .where("uid", "==", firebase.auth().currentUser?.uid)
    .get();
  const data = user.docs[0].data();

  docRef.update({
    location: data.name + " / Home",
  });
};
