import { StyleSheet } from "react-native";
import {
  BORDER_RADIUS_FOUR,
  BORDER_WIDTH_TWO,
  DentsuBlack,
  DIR_ROW,
  LightGrayTint,
  MerkleRed,
  MidGrayTint,
  POSITION_ABSOLUTE,
  POSITION_CENTER,
  POSITION_ZERO,
} from "../../../../components/design";

export const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: LightGrayTint,
    alignItems: POSITION_CENTER,
    justifyContent: POSITION_CENTER,
  },
  input: {
    width: "70%",
    flexDirection: DIR_ROW,
    justifyContent: "space-between",
  },
  hiddenCodeInput: {
    position: POSITION_ABSOLUTE,
    height: POSITION_ZERO,
    width: POSITION_ZERO,
    opacity: POSITION_ZERO,
    borderWidth: POSITION_ZERO,
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
    fontSize: 23,
    padding: POSITION_ZERO,
  },
  inputContainerFocused: {
    borderColor: DentsuBlack,
    backgroundColor: MidGrayTint,
  },
  errorText: {
    color: MerkleRed,
  },
});
