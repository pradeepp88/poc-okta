import React from "react";
import { Message } from "semantic-ui-react";
import { Button, Form } from "semantic-ui-react";

const Conflict = () => {
  return (
    <div className="general-wrapper">
      <Message color="yellow">
        <Message.Header>
          Do you have any other login credential (eg: Email )
        </Message.Header>
        <p>If so, please enter the email id in the below textbox.</p>
      </Message>
      <Form success>
        <Form.Input label="Email ID" placeholder="Your email " />
        <Button>Submit</Button>
      </Form>
    </div>
  );
};

export default Conflict;
