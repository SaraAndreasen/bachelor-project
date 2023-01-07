import { firebase } from "@react-native-firebase/auth";
import { useNavigation } from "@react-navigation/native";

//log user out
export const logout = () => {
  firebase
    .auth()
    .signOut()
    .then(() => console.log("user signed out"));
};
