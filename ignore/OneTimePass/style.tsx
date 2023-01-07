import styled from "styled-components/native";


//styled components
export const color = {
    dentsuBlack: "#05051E",
    lightGrayTint: "#F2F2F4",
    dentsuDarkGray: "#60607D",
    midGrayTint: "#D6D6DF",
    white: "#f9ffe3",
};

export const OTPInputSection = styled.View`
    justify-content: center;
    align-items: center;
    margin-vertical: 30px;
`

export const HiddenTextInput = styled.TextInput`
    border-color: ${color.lightGrayTint};
    border-width: 2px;
    border-radius: 5px;
    padding: 12px;
    margin-top: 15px;
    width: 300px;
    color:  #ff0000;
`

export const OTPInputContainer = styled.Pressable `
    width: 70%;
    flex-direction: row;
    justify-content: space-around;
`

export const OTPInput = styled.View`
    border-color: ${color.midGrayTint};
    min-width: 15%;
    border-width: 2px;
    border-radius: 5px;
    padding: 12px;
`

export const OTPInputText = styled.TextInput`
    font-size: 22px;
    font-weight: bold;
    text-align: center;
    color:  ${color.lightGrayTint};
`


export const OTPInputFocused = styled(OTPInput)`

`

export const StyledOTPInput = styled.View`
    border-color: #ff0000;
`

export const StyledButton = styled.TouchableOpacity`
    margin-top: 25px;
    padding: 15px;
    background-color: ${color.dentsuBlack};
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    margin-vertical: 5px;
    height: 60px;
    width: 70%;
` 

export const ButtonText = styled.Text`
color: ${color.midGrayTint};
font-size: 15px;
`

export const ButtonContainer = styled.TouchableOpacity`
background-color:  #008000;
padding: 20px;
justify-content: center;
width: 200px;
margin-top: 30px;
`



//<Button bg="merkleColor.DentsuBlack">Submit</Button>