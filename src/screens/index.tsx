//Components
export { BlackDivider } from "../components/common/BlackDivider";
export { Header } from "../components/common/Header";
export { AvoidView } from "../components/common/KeyboardAvoidingView";
export { RenderDivider } from "../components/flatlist/divider/RenderDivider";
export { RenderFooter } from "../components/flatlist/footer/RenderFooter";
export { RenderHeader } from "../components/flatlist/header/RenderHeader";
export { LogOutButton } from "../components/design/buttons/LogOutButton";

export { CheckoutDevice } from "./check-out/CheckOutDevices";
export { CompletedCheckin } from "./check-in/CompletedCheckin";

export { CompleteCheckOut } from "./check-out/CompletedCheckout";
export { CheckIn } from "./check-in/CheckIn";
export { CheckOutFrontScreen } from "./check-out/CheckOut";

export { ConfirmPin } from "./create-pin/ConfirmPin";
export { CreatePin } from "./create-pin/CreatePin";

export { CreateUser } from "./login/CreateUser";
export { EnterPin } from "./login/EnterPin";
export { WelcomePage } from "./login/Welcome";
export { LoggedIn } from "./login/LoggedIn";

export { Home } from "./home/Home";
export { Specs } from "./home/Specs";
export { Scan } from "./Scan";

export { Navigation } from "../navigation";

//Constants
export { CODE_LENGTH } from "./login/components/constants/constants";
export { PASSWORD_LENGTH } from "./login/components/constants/constants";
export { ValidationErrors } from "./login/components/constants/list";
export { deviceRef } from "../components/constants/constants";
export { userRef } from "../components/constants/constants";
export { authDB } from "../components/constants/constants";

//interfaces
export { Device } from "../assets/interfaces/interface";
export { AvailableDevices } from "../assets/interfaces/interface";
export { TakenDevices } from "../assets/interfaces/interface";

//Redux
export {
  setSelectedDevice,
  selectedDeviceSelector,
} from "../store/reducers/deviceSlice";
export { setPin, selectPin } from "../store/reducers/setPin";
export { useAppDispatch, useAppSelector } from "../store/store";
