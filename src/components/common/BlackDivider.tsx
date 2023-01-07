import React from "react";
import { Divider } from "native-base";
import { style } from "../../screens/check-in/CheckIn";

export function BlackDivider() {
  return (
    <>
      <Divider
        bg="greyscale.DentsuBlack"
        thickness="2"
        orientation="horizontal"
      />
    </>
  );
}
