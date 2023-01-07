import React, { useRef, useState, useEffect, Dispatch } from "react";
import { View, Text, StyleSheet, KeyboardAvoidingView, Pressable, Keyboard, Alert, Platform } from "react-native";
import { Button, Heading } from "native-base";
import styled from "styled-components/native";
import { color, OTPInputSection, HiddenTextInput, OTPInputContainer, OTPInput, OTPInputText, OTPInputFocused, StyledButton, ButtonText, ButtonContainer } from "../components/style";

//we set the types
interface ToCodeDigitInputProps {
  _value: number;
  index: number;
  value: number;
  maxLength: number;
  code: string;
  setCode: Dispatch<React.SetStateAction<string>>;
  inputContainerIsFocused: boolean;
  focusedIndex: number;
  setFocusedIndex: Dispatch<React.SetStateAction<number>>;
  pinReady: boolean;
  setPinReady: Dispatch<React.SetStateAction<boolean>>;
}

const ToCodeDigitInput = ({_value, value, index, maxLength, code, setCode, inputContainerIsFocused, focusedIndex, setFocusedIndex, pinReady, setPinReady}: ToCodeDigitInputProps) => {
  //String to render when an input box is empty
    const emptyInputChar = " ";
    //next we extract each digit from the code input string using the index. If it's empty we fall to the emptyInputChar
    // const digit = code[index] || emptyInputChar;
    //we give digit a state, that is an empty string,
    const [digit, setDigit] = useState<string | undefined>();

    const [backgroundColor, setBackgroundColor] = useState<string | undefined>();

    //Change color on fields that are not oin focus.
    const handleOnBlur = (text) => {
     Alert.alert(
      "Blur activated",
      "Blur has been activated"
     )
    };

    //formatting
      //check if the current box or digit is the one to be focused
      const isCurrentDigit = index === code.length;
      const textInputRef = useRef(null);

      //next we check if it is the last digit, and if it is the same as the maxLength
      const isLastDigit = index === maxLength - 1;
      const isCodeFull = code.length === maxLength;

      //if the value of the focusedIndex state changes, useEffect will run as our dependency is set to focusedIndex.
      useEffect(() => {
        if (focusedIndex === index) {
          textInputRef?.current?.focus()
        }
      }, [focusedIndex])
      

      //now we check if the digit is focused, and if it is, we want to toggle between the two OTP inputs
      const isDigitFocused = isCurrentDigit || (isLastDigit && isCodeFull)

      const StyledOTPInput = inputContainerIsFocused && isDigitFocused ? OTPInputFocused : OTPInput;

      //index is the number we write in the input field.

    return <>
    <View>
      <StyledOTPInput 
      key={index}
      //How we change the backgrounds on the inputs
      style={{
        backgroundColor
      }}
      >
        <OTPInputText 
            ref={textInputRef} 
            maxLength={1} 
            keyboardType="number-pad"
            returnKeyType="done"
            textContentType="oneTimeCode"
            onFocus={() => {
              setFocusedIndex(index);
              setBackgroundColor('#8888A1');
              //setFocusedIndex(index.(something))
              console.log('Dette er indexet' + ' ' + index)
            }}
            onBlur={handleOnBlur}
            onChangeText={(text) => {
              //have to figure something out, doesn't read past console.log('onChangeText)
              console.log('onChangeText')
              setDigit(text)
              //text is inbuild inside the method, but when that text is equal and the type is also equal to 1, then the current index will be incremented with one. This makes it possible to go to the next box, once something has been typed.
              //BUG: FIXED USING MAXLENGTH={1} ON THE OTPInputText - not sure if right approach.
              //if focusedIndex === index ??
              if (text.length === 1) {
                if(focusedIndex === 3){
                  return;
                }
                console.log(index);
                setFocusedIndex((index) => index + 1);
              }
              else if(!text.length){
                if(focusedIndex === 0){
                  return;
                }
                setFocusedIndex((index) => index - 1)
                setBackgroundColor('#F2F2F4');
                console.log("else if" + index);
              }
              else {
                //BUG:
                /*We can delete the values, just not from the same index we're at. To delete we have to "reset", by pressing outside the boxes and then by going into the field again.
                This makes us able to delete the data.
                Problem is that it doesn't update when the user stops input. As soon as the value is null, not returning to previous field.
                */
                setFocusedIndex((index) => index - 1);
               // updateData = input;
                console.log(index)
              }
              console.log("Indtastet tal:" + text)
          }}
          >
          {digit}</OTPInputText>
      </StyledOTPInput>
    </View>
    </>
};

const OTPInputField = ( {value, index, setPinReady, code, setCode, maxLength, pinReady}: ToCodeDigitInputProps ) => {
  const codeDigitsArray = new Array(maxLength).fill(0);
  
  //ref for text input
  const textInputRef = useRef(null);
 //Monitoring input focus
  const [inputContainerIsFocused, setInputContainerIsFocused] = useState(false);
  //we set the state of the focusedIndex to 0.
  const [focusedIndex, setFocusedIndex] = useState(0);


  const handleOnPress = () => {
    setInputContainerIsFocused(true);
    textInputRef?.current?.focus();
  }

  const handleOnBlur = () => {
    setInputContainerIsFocused(false);
  };

  /*
  useEffect(() => {
    //update pin ready value
      setPinReady(code.length === maxLength)
      return () => setPinReady(false) ;
  }, [code])
  //we set the code prop as the dependency, so it will only change when it is the 'code' prop that is being changed.
*/

//onsole.log(codeDigitsArray);

return <>
  <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
    <Pressable style={styles.container} onPress={Keyboard.dismiss}>
      <Heading size={"2xl"} paddingBottom="15">Create pin</Heading>

        {/*Below is the map method that makes the one input field into four */}

            <View style={styles.main} key={index}>
              {codeDigitsArray.map((value, index) => <ToCodeDigitInput _value={value} index={index} maxLength={maxLength} code={code} setCode={setCode} inputContainerIsFocused={inputContainerIsFocused} focusedIndex={focusedIndex} setFocusedIndex={setFocusedIndex} pinReady={pinReady} setPinReady={setPinReady} />)}
            </View>

            <ButtonContainer
            disabled={!pinReady}
            style={{
              backgroundColor: !pinReady ? "grey" : "#000000",
            }}
            >
              <ButtonText
                style={{
                  color: !pinReady ? "black" : "#EEEEEE"
                }}
              >Enter pin</ButtonText>
            </ButtonContainer>

    </Pressable>
</KeyboardAvoidingView>
 </>
};

const styles = StyleSheet.create({
  main: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    float:'left',
    flex: 1,
    alignItems: "center",
    marginTop: 80,
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: 'space-around',
  },
  header: {
    backgroundColor: '#F2F2F4',
    padding: 20
  },
  h1: {
    fontSize: 32,
    fontWeight: 'bold'
  },
  body: {
    backgroundColor: '#60607D',
    padding: 20,
    color: '#F2F2F4'
  }
});

export default OTPInputField;