import styled from "styled-components/native";


export const OTPInputContainer = styled.View`
 justify-content: center;
 align-items: center;
`;

export const TextInputHidden = styled.TextInput`
 width: 300px;
 border-color: #d6d6df;
 border-width: 1px;
 border-radius: 5px;
 padding: 15px;
`;

export const SplitOTPBoxesContainer = styled.Pressable`
 width: 80%;
 flex-direction: row;
 justify-content: space-evenly;
`;
export const SplitBoxes = styled.View`
 border-color: #d6d6df;
 border-width: 2px;
 border-radius: 5px;
 padding: 30px;
 min-width: 50px;
`;

export const SplitBoxText = styled.Text`
 font-size: 20px;
 text-align: center;
 color: #e5e5e5;
`;

export const SplitBoxesFocused = styled(SplitBoxes)`
border-color: #FFC300;
background-color: blue;
`;