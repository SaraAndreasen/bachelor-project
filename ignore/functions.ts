//SECTION Validation on ConfirmPin
enum ValidationErrors {
  EMPTY_FIELD = "EMPTY_FIELD",
  LENGTH_ERROR = "LENGTH_ERROR",
  WRONG_PIN = "WRONG_PIN",
  CORRECT_LENGTH = "CORRECT_LENGTH",
  REGEX = "REGEX",
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
