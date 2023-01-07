import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

//NOTE CREATE
export async function addDevice() {
  try {
    const docRef = await addDoc(collection(db, "devices"), {
      model: "test",
      software: "teeest",
      location: "TEST",
    });
    console.log("document written with ID:", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
