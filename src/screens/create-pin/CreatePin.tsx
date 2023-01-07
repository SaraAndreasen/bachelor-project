import React, {
  Dispatch,
  useRef,
  useState,
  useEffect,
  ReactElement,
} from "react";
import {
  View,
  TextInput,
  StyleSheet,
  SafeAreaView,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { Button, Heading, Text } from "native-base";
import { useAppDispatch } from "../../store/store";
import { setPin } from "../../store/reducers/setPin";
import { AvoidView } from "../index";
import { useNavigation } from "@react-navigation/native";

interface ToPinInputProps {
  _value: number;
  index: number;
  containerIsFocused: boolean;
  setContainerIsFocused: Dispatch<React.SetStateAction<boolean>>;
  focusedIndex: number;
  setFocusedIndex: Dispatch<React.SetStateAction<number>>;
}

const CODE_LENGTH = 4;

//SECTION Validation on CreatePin
enum ValidationErrors {
  EMPTY_FIELD = "EMPTY_FIELD",
  LENGTH_ERROR = "LENGTH_ERROR",
  CORRECT_LENGTH = "CORRECT_LENGTH",
}

const checkValidation = (pin: string | undefined) => {
  //NOTE if the user types the wrong value, it will run the error.
  if (pin != null) {
    //NOTE if pin is an empty string
    if (pin.trim().length === 0) {
      return ValidationErrors.EMPTY_FIELD;
    }
    //NOTE if pin is shorter than our code length
    if (pin.length < CODE_LENGTH) {
      return ValidationErrors.LENGTH_ERROR;
    }
    //NOTE if pin is the same length at the code_length
    else if (pin === CODE_LENGTH.toString()) {
      return ValidationErrors.CORRECT_LENGTH;
    }
  }
  //NOTE if it's the right value, it returns null. And no errors will be seen.
  return null;
};

const errorText = (validationError: ValidationErrors) => {
  if (validationError === ValidationErrors.EMPTY_FIELD) {
    //NOTE if field is empty shoot the following error
    return "Field can't be empty";
  } else if (validationError === ValidationErrors.LENGTH_ERROR) {
    //NOTE if the pin code is not four digits shoot the following error
    return "Pin too short";
  } else if (validationError === ValidationErrors.CORRECT_LENGTH) {
    return "Pin long enough";
  }
};

//!SECTION

export function CreatePin({ _value, index }: ToPinInputProps) {
  const [pin, setPinCode] = useState("");
  const [pinReady, setPinReady] = useState(false);
  const navigation = useNavigation();
  //const test = useSelector(pinSlice);

  //NOTE set error state
  const [error, setError] = useState<ValidationErrors | null>(null);

  const dispatch = useAppDispatch();

  // ANCHOR we set the state of the focusedIndex to 0
  const [focusedIndex, setFocusedIndex] = useState<number>(0);

  // ANCHOR change the value of the focused container
  const [containerIsFocused, setContainerIsFocused] = useState<boolean>(false);

  // ANCHOR set up array that fills the values with 0
  const codeDigitArray: number[] = new Array(CODE_LENGTH).fill(0);

  //ANCHOR reference the hidden text input
  const ref = useRef<TextInput>(null);

  //ANCHOR on press handler that should be true if the container is focused.
  const handleOnPress = () => {
    setContainerIsFocused(true);
    ref?.current?.focus();
  };
  //ANCHOR on blur handler that should be false if the container is not focused.
  const handleOnBlur = () => {
    setContainerIsFocused(false);
  };

  useEffect(() => {
    //Update on ready value
    setPinReady(pin.length === CODE_LENGTH);
  }, [pin]);

  //NOTE Disable button until the pin is as long as the code length. Extra validation.
  const isValid = () => {
    if (pin) {
      if (pin.length == CODE_LENGTH) {
        return true;
      }
      return false;
    }
    return false;
  };

  const toDigitInput = (_value: number, index: number): ReactElement => {
    //ANCHOR if theres no input we render an empty string
    const emptyInputChar = " ";
    //ANCHOR key into the code with the current index
    const digit = pin[index] || emptyInputChar;

    //ANCHOR the input code as a whole is focused by the user
    containerIsFocused === true;
    //ANCHOR the index of the digit is equal to the length of the inputted code
    const isCurrentDigit = index === pin.length;
    //ANCHOR the code is full and it's the last digit
    const isLastDigit = index === CODE_LENGTH - 1;
    const isCodeFull = pin.length === CODE_LENGTH;

    //ANCHOR check if the fields are focused or not. Returns isCurrentDigit if true, and returns false if it is the lastDigit and if the code is full.
    const isFocused = isCurrentDigit || (isLastDigit && isCodeFull);

    const containerStyle =
      isFocused && true
        ? { ...styles.inputContainer, ...styles.inputContainerFocused }
        : styles.inputContainer;

    //ANCHOR if the value of the of the focusedIndex changes, useEffect will run as our dependency is set to focusedIndex
    useEffect(() => {
      if (focusedIndex === index) {
        ref?.current?.focus();
      }
    }, [focusedIndex]);

    console.log(" ");
    console.log("The digit is" + " : " + digit);
    console.log(digit);
    console.log("Vores pin er " + " : " + pin);

    return (
      <View key={index} style={containerStyle}>
        <Text style={styles.inputText}>{digit}</Text>
      </View>
    );
  };
  //dispatch(setPin(pin)); navigation.navigate('ConfirmPin')
  return (
    <>
      <SafeAreaView style={styles.container}>
        <Heading size={"2xl"} paddingBottom="15">
          Create pin
        </Heading>
        <Pressable style={styles.input} onPress={handleOnPress}>
          {codeDigitArray.map(toDigitInput)}
        </Pressable>
        <Text color={"merkleColor.MerkleRed"}>
          {error != null && errorText(error)}
        </Text>
        <TextInput
          onFocus={() => setFocusedIndex(index)}
          ref={ref}
          value={pin}
          onChangeText={(text) => {
            setError(null);
            setPinCode(text);
          }}
          onSubmitEditing={handleOnBlur}
          keyboardType="number-pad"
          returnKeyType="done"
          textContentType="oneTimeCode"
          maxLength={CODE_LENGTH}
          style={styles.hiddenCodeInput}
          autoFocus={true}
        />
        <TouchableOpacity>
          <Button
            bg="merkleColor.DentsuBlack"
            marginTop={"6"}
            isDisabled={!isValid()}
            onPress={(e) => {
              const error = checkValidation(pin);
              // NOTE Not equal to null
              if (error != null) {
                setError(error);
                e.preventDefault();
              } else {
                dispatch(setPin(pin));
                navigation.navigate("ConfirmPin");
              }
            }}
          >
            Continue
          </Button>
        </TouchableOpacity>
      </SafeAreaView>

      <AvoidView />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F4",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: "70%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  hiddenCodeInput: {
    position: "absolute",
    height: 0,
    width: 0,
    opacity: 0,
    borderWidth: 0,
    borderColor: "#777",
  },
  inputContainer: {
    borderColor: "#cccccc",
    borderWidth: 2,
    borderRadius: 4,
    padding: 15,
    minWidth: 60,
    alignItems: "center",
  },
  inputText: {
    fontSize: 23,
    padding: 0,
  },
  inputContainerFocused: {
    borderColor: "#05051E",
    backgroundColor: "#D6D6DF",
  },
  disabledButton: {
    backgroundColor: " #ffa500",
  },
  errorText: {
    color: "#f23a1d",
  },
});
