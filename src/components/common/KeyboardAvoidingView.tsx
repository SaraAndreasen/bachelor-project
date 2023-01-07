import React from "react";
import { KeyboardAvoidingView, Platform } from "react-native";

export function AvoidView() {
  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      ></KeyboardAvoidingView>
    </>
  );
}
