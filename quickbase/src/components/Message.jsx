import React from "react";
import { MessageWrapper } from "./MessageStyle";

export const Message = (props) => {
  console.log("props.isError", props.isError);
  return (
    <MessageWrapper isError={props.isError}>
      <span>{props.messageVal}</span>
    </MessageWrapper>
  );
};
