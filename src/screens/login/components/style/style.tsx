import { StyleSheet } from "react-native";
import {
  BORDER_RADIUS_FOUR,
  BORDER_WIDTH_TWO,
  DentsuBlack,
  DIR_ROW,
  FLEX_ONE,
  LightGrayTint,
  MerkleRed,
  MidGrayTint,
  PADDING_FIVE,
  PADDING_TWENTYTHREE,
  POSITION_ABSOLUTE,
  POSITION_CENTER,
  POSITION_ZERO,
  SpaceBetween,
  VALUE_ZERO,
} from "../../../../components/design";

export const style = StyleSheet.create({
  dividerWelcome: {
    // marginTop: -15,
  },
  containerCU: {
    flex: FLEX_ONE,
    alignItems: POSITION_CENTER,
    justifyContent: POSITION_CENTER,
    //marginTop: "5%",
  },
  textInputCU: {
    borderWidth: BORDER_WIDTH_TWO,
    borderRadius: BORDER_RADIUS_FOUR,
    padding: PADDING_FIVE,
    borderColor: MidGrayTint,
    marginBottom: "4.5%",
  },
  keyBoardCU: {
    flex: FLEX_ONE,
    alignItems: POSITION_CENTER,
    justifyContent: POSITION_CENTER,
  },
  containerEP: {
    flex: FLEX_ONE,
    backgroundColor: LightGrayTint,
    alignItems: POSITION_CENTER,
    justifyContent: POSITION_CENTER,
  },
  inputEP: {
    width: "70%",
    flexDirection: DIR_ROW,
    justifyContent: SpaceBetween,
  },
  hiddenCodeInput: {
    position: POSITION_ABSOLUTE,
    height: POSITION_ZERO,
    width: POSITION_ZERO,
    opacity: VALUE_ZERO,
    borderWidth: VALUE_ZERO,
    borderColor: "#777",
  },
  inputContainer: {
    borderColor: "#cccccc",
    borderWidth: BORDER_WIDTH_TWO,
    borderRadius: BORDER_RADIUS_FOUR,
    padding: 15,
    minWidth: 60,
    alignItems: POSITION_CENTER,
  },
  inputText: {
    fontSize: PADDING_TWENTYTHREE,
    padding: VALUE_ZERO,
  },
  inputContainerFocused: {
    borderColor: DentsuBlack,
    backgroundColor: MidGrayTint,
  },
  textInputW: {
    padding: PADDING_FIVE,
    borderWidth: BORDER_WIDTH_TWO,
    borderRadius: BORDER_RADIUS_FOUR,
    borderColor: MidGrayTint,
  },
  errorText: {
    color: MerkleRed,
  },
  textDesc: {
    fontSize: 20,
  },
  welcomeContainer: {
    marginTop: 30,
  },
  loginBtn: {
    // marginTop: -15,
    backgroundColor: "#06757e",
  },
  errorMsg: {
    // padding: 0,
    // margin: 0,
  },
});
