import React from "react";
import { Message } from "semantic-ui-react";

const AlertMessage = ({ header, message }) => {
  return (
    <Message color="green">
      <Message.Header>{header}!</Message.Header>
      <p>{message}</p>
    </Message>
  );
};

export default AlertMessage;
