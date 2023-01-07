import React, {useEffect, useRef, useState} from "react";
import { StyleSheet, View, Pressable, Keyboard } from "react-native";
import { OTPInputContainer, TextInputHidden, SplitOTPBoxesContainer, SplitBoxes, SplitBoxText, SplitBoxesFocused } from "./styles";


//Til app siden
/*
<Stack.Screen name="CreatePin" options={{ title: '' }}>
{(props) => <CreatePin {...props} code={otpCode} setCode={setOTPCode} maximumLength={maximumCodeLength} setIsPinReady={setIsPinReady}/>}
</Stack.Screen>
*/
/*Code used to create the four boxes:
https://www.youtube.com/watch?v=nT18Fe6j8uQ

for app.js
  //otpCode stores the value from the string that is being entered in the input field.
  const [otpCode, setOTPCode] = useState("");
  //isPinReady is a boolean that is false by default and will be true when the user has entered the four digits of the pin code.
  const [isPinReady, setIsPinReady] = useState(false);
  //We declare how long the pincode will be.
  const maximumCodeLength: number = 4;

The components are created via Styled Components.
*/

const OTPInput = ({code, setCode, maximumLength, setIsPinReady}) => {
   
  /*Creating an array with a maximum length of four(which we pass using our props), using the array.fill() method. We then initialize the input field indices (index in plural) with 0. When we log the new array out we should get an array with four elements of 0.  If we only get one element, the prop is not passed correctly.*/
  const boxArray = new Array(maximumLength).fill(0);
  //console.log(boxArray)
 

  //To handle the onBlur event, we're using the useRef hook and handleOnBlur function
  const inputRef = useRef();


  /*When we press each box we want the current input box to be highlighted. To do that, we want to declare a Boolean state, that check whether the field is in focus. By default it is false.*/
  const [isInputBoxFocused, setIsInputBoxFocused] = useState(false);

  //We set the focus state we created above to true, and use the inputRef to trigger it into focus.
  const handleOnPress = () => {
    setIsInputBoxFocused(true);
    inputRef.current.focus();
  }

//With the handleOnBlur, we set the focus state back to false.
  const handleOnBlur = () => {
    setIsInputBoxFocused(false);
  };

  //useEffect will only run when the 'code' value changes, as we added it as a dependency.
  useEffect(() => {
    //update pin read status
    setIsPinReady(code.length === maximumLength);

    return () => {
      setIsPinReady(false)
    };
  }, [code]);


 /*The next step in the Array-journey, is to create a function to handle the mapping of each value in the array, and then render a box for each value. */
  const boxDigit = (_, index) => {
    //when an input box is empty, the emptyInout string will render. It does that by extracting the code input string using the index.
    const emptyInput = "";
    const digit = code[index] || emptyInput;

    //check if the mapping's current value is the current digit
    const isCurrentValue = index === code.length;

    //check for the last digit
    const isLastValue = index === maximumLength - 1;

    //Check if the length of the code is the same as the maximum length we specified earlier.
    const isCodeComplete = code.length === maximumLength;

    //Check if the value is focused. ( || for each operand, converts it to boolean. If the result is true, stops and returns the original value.) If isCurrentValue is false, it keeps running and checks on isLastValue and isCodeComplete only if they're both true.
    const isValueFocused = isCurrentValue || (isLastValue && isCodeComplete);

    //If both text input and value are focused, we will return the SplitBoardFocused - otherwise it returns SplitBoxes.
    const StyledSplitBoxes = isInputBoxFocused && isValueFocused ? SplitBoxesFocused : SplitBoxes;




    //At last the component for SplitBoxes will be returned, with the SplitBoxText. SplitBoxtext value is the digit, and the index will be passed as the key to the SplitBoxes.
    return (
      <StyledSplitBoxes key={index}>
        <SplitBoxText>{digit}</SplitBoxText>
      </StyledSplitBoxes>
    );
  };


  

  //Next up in the SplitOTPBoxesContainer, we're mapping through the boxArray, and we then pass in the boxDigit function to render the split boxes. It will render the boxes in reference to the number of digtigs, in the boxArray - if done right, should be four.
 return <>
 <View style={styles.container}>
      <OTPInputContainer>
        <SplitOTPBoxesContainer>{boxArray.map(boxDigit)}</SplitOTPBoxesContainer>
          <TextInputHidden 
          value={code}
          onChangeText={setCode}
          maxLength={maximumLength}
          ref={inputRef}
          onBlur={handleOnBlur} />
      </OTPInputContainer>
    
    </View>
 </>
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
   });

export default OTPInput;