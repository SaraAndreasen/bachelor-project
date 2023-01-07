import { StyleSheet } from "react-native";
import {
  ALIGN_LEFT,
  AUTO_VAL,
  DentsuDarkGray,
  DIR_ROW,
  FLEX_ONE,
  FONTSIZE24,
  MarginTop48,
  PADDING_FIVE,
  POSITION_CENTER,
  SpaceBetween,
  TEN_PERC,
  VAL75PERCENT,
  WIDTH300,
} from "../../../../components/design";

export const style = StyleSheet.create({
  container: {
    maxWidth: WIDTH300,
    width: VAL75PERCENT,
    marginLeft: AUTO_VAL,
    marginRight: AUTO_VAL,
  },
  checkinHeader: {
    marginTop: MarginTop48,
    marginBottom: FONTSIZE24,
  },
  text: {
    marginTop: PADDING_FIVE,
  },
  ScrollView: {
    marginHorizontal: "3%",
  },
  row: {
    flex: FLEX_ONE,
    flexDirection: DIR_ROW,
    textAlign: POSITION_CENTER,
  },
  cell: {
    justifyContent: POSITION_CENTER,
  },
  viewRow: {
    flexDirection: DIR_ROW,
    justifyContent: SpaceBetween,
  },
  flatlistModel: {
    flex: FLEX_ONE,
    textAlign: ALIGN_LEFT,
    padding: PADDING_FIVE,
  },
  flatlistSoftware: {
    flex: FLEX_ONE,
    textAlign: ALIGN_LEFT,
    padding: PADDING_FIVE,
  },
  flatlistLocation: {
    flex: FLEX_ONE,
    textAlign: ALIGN_LEFT,
    padding: PADDING_FIVE,
  },
  flatlistId: {
    flex: FLEX_ONE,
    textAlign: ALIGN_LEFT,
    padding: PADDING_FIVE,
  },
  flatlistNavigate: {
    backgroundColor: DentsuDarkGray,
  },
  btn: {
    marginTop: TEN_PERC,
    marginBottom: TEN_PERC,
  },
  divider: {
    marginBottom: TEN_PERC,
  },
});
