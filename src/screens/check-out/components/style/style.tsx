import { StyleSheet } from "react-native";
import {
  FLEX_ONE,
  POSITION_ABSOLUTE,
  POSITION_CENTER,
  POSITION_ZERO,
  VALUE_100_PERC,
} from "../../../../components/design";

export const style = StyleSheet.create({
  mainContainer: {
    flex: FLEX_ONE,
    height: VALUE_100_PERC,
    justifyContent: POSITION_CENTER,
    alignItems: POSITION_CENTER,
  },
  containerA: {
    //backgroundColor: "#46A4F2",
    width: VALUE_100_PERC,
    height: VALUE_100_PERC,
    alignItems: POSITION_CENTER,
    justifyContent: POSITION_CENTER,
  },
  containerB: {
    alignItems: POSITION_CENTER,
    justifyContent: POSITION_CENTER,
    // backgroundColor: "#F2B3D9",
    position: POSITION_ABSOLUTE,
    left: POSITION_ZERO,
    top: POSITION_ZERO,
    width: VALUE_100_PERC,
    height: VALUE_100_PERC,
  },
  containerC: {
    width: VALUE_100_PERC,
    height: VALUE_100_PERC,
    alignItems: POSITION_CENTER,
    justifyContent: POSITION_CENTER,
    marginBottom: "15%",
    //backgroundColor: "#E8F29B",
  },
  h1: {
    textAlign: POSITION_CENTER,
    marginTop: "40%",
  },
});
