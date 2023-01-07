import React, { Dispatch, useRef, useState, useEffect } from "react";
import { View, TextInput, SafeAreaView, Pressable } from "react-native";
import { Button, Heading, Text } from "native-base";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { AvoidView } from "../index";
import { useNavigation } from "@react-navigation/native";
import { style } from "./components/style/style";

interface ToPinInputProps {
  _value: number;
  index: number;
  containerIsFocused: boolean;
  setContainerIsFocused: Dispatch<React.SetStateAction<boolean>>;
  focusedIndex: number;
  setFocusedIndex: Dispatch<React.SetStateAction<number>>;
}

const CODE_LENGTH = 4;

//SECTION Validation on ConfirmPin
enum ValidationErrors {
  EMPTY_FIELD = "EMPTY_FIELD",
  LENGTH_ERROR = "LENGTH_ERROR",
  WRONG_PIN = "WRONG_PIN",
}

const checkValidation = (
  pin: string | undefined,
  confirmPin?: string | undefined
) => {
  //NOTE if the user types the wrong value, it will run the error.
  if (pin != null && confirmPin != null) {
    //NOTE if pin is an empty string
    if (confirmPin === "") {
      return ValidationErrors.EMPTY_FIELD;
    }
    //NOTE if pin is equal our code but not the same as the state
    else if (confirmPin != pin) {
      return ValidationErrors.WRONG_PIN;
    }
    //NOTE if pin is shorter than our code length
    else if (confirmPin.length < CODE_LENGTH) {
      return ValidationErrors.LENGTH_ERROR;
    }
    console.log("pin in error", pin);
  }
  //NOTE if it's the right value, it returns null. And no errors will be seen.
  return null;
};

const errorText = (validationError: ValidationErrors) => {
  if (validationError === ValidationErrors.EMPTY_FIELD) {
    //NOTE if field is empty shoot the following error
    return "Fields can't be empty";
  } else if (validationError === ValidationErrors.LENGTH_ERROR) {
    //NOTE if the pin code is not four digits shoot the following error
    return "Pin too short";
  } else if (validationError === ValidationErrors.WRONG_PIN) {
    //NOTE if the pin code is four digits shoot the following error
    return "Pin does not match";
  }
};

//!SECTION

export function ConfirmPin({ _value, index }: ToPinInputProps) {
  const [confirmPin, setConfirmPin] = useState("");
  const navigation = useNavigation();

  // NOTE we fecth our state from redux
  const pincode = useAppSelector((state) => state.Pin.Pin);
  console.log("Pin from state:", pincode);

  //NOTE set error state
  const [error, setError] = useState<ValidationErrors | null>(null);
  // const validationError = checkValidation(pincode, confirmPin)

  //NOTE redux
  const dispatch = useAppDispatch();

  // ANCHOR we set the state of the focusedIndex to 0
  const [focusedIndex, setFocusedIndex] = useState<number>(0);

  // ANCHOR change the value of the focused container
  const [containerIsFocused, setContainerIsFocused] = useState<boolean>(false);

  // ANCHOR set up array that fills the values with 0
  const codeDigitArray = new Array(CODE_LENGTH).fill(0);

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

  const isValid = () => {
    if (confirmPin) {
      if (confirmPin.length == CODE_LENGTH) {
        return true;
      }
      return false;
    }
    return false;
  };

  const toDigitInput = (_value: number, index: number) => {
    //ANCHOR if theres no input we render an empty string
    const emptyInputChar = " ";
    //ANCHOR key into the code with the current index
    const digit = confirmPin[index] || emptyInputChar;

    //ANCHOR the input code as a whole is focused by the user
    containerIsFocused === true;
    //ANCHOR the index of the digit is equal to the length of the inputted code
    const isCurrentDigit = index === confirmPin.length;
    //ANCHOR the code is full and it's the last digit
    const isLastDigit = index === CODE_LENGTH - 1;
    const isCodeFull = confirmPin.length === CODE_LENGTH;

    //ANCHOR check if the fields are focused or not. Returns isCurrentDigit if true, and returns false if it is the lastDigit and if the code is full.
    const isFocused = isCurrentDigit || (isLastDigit && isCodeFull);

    const containerStyle =
      isFocused && true
        ? { ...style.inputContainer, ...style.inputContainerFocused }
        : style.inputContainer;

    //ANCHOR if the value of the of the focusedIndex changes, useEffect will run as our dependency is set to focusedIndex
    useEffect(() => {
      if (focusedIndex === index) {
        ref?.current?.focus();
      }
    }, [focusedIndex]);

    console.log("   ");
    console.log("the index" + " : " + index);
    console.log("Vores pin er " + " : " + confirmPin);

    return (
      <View key={index} style={containerStyle}>
        <Text style={style.inputText}>{digit}</Text>
      </View>
    );
  };

  return (
    <>
      <SafeAreaView style={style.container}>
        <Heading size="2xl" paddingBottom="15">
          Confirm pin
        </Heading>

        <Pressable style={style.input} onPress={handleOnPress}>
          {codeDigitArray.map(toDigitInput)}
        </Pressable>

        <Text color={"merkleColor.MerkleRed"}>
          {error != null && errorText(error)}
        </Text>

        <TextInput
          onFocus={() => setFocusedIndex(index)}
          ref={ref}
          value={confirmPin}
          onChangeText={(text) => {
            setConfirmPin(text);
            setError(null);
          }}
          onSubmitEditing={handleOnBlur}
          keyboardType="number-pad"
          returnKeyType="done"
          textContentType="oneTimeCode"
          maxLength={CODE_LENGTH}
          style={style.hiddenCodeInput}
          autoFocus={true}
        />

        <Button
          bgColor="greyscale.DentsuBlack"
          marginTop={"6"}
          isDisabled={!isValid()}
          onPress={(e) => {
            const error = checkValidation(pincode, confirmPin);
            // NOTE Not equal to null
            if (error != null) {
              setError(error);
              e.preventDefault();
            } else {
              navigation.reset({
                index: 0,
                routes: [
                  {
                    name: "Welcome",
                  },
                ],
              });
            }
          }}
        >
          Confirm pin
        </Button>
      </SafeAreaView>

      <AvoidView />
    </>
  );
}
