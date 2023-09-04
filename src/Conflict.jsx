import React, { useState } from "react";
import { Message } from "semantic-ui-react";
import { Button, Form } from "semantic-ui-react";
import axios from "axios";

const Conflict = () => {
  const [emailSuccess, setEmailSuccess] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [progress, setProgress] = useState(false);
  const sendEmail = () => {
    setProgress(true);
    axios
      .post(
        "https://humber-poc-cgi.workflows.okta.com/api/flo/d856674875d68127e1c45e8daa479556/invoke",
        {
          alternateemail: userEmail,
        }
      )
      .then((res) => {
        setProgress(false);
        setEmailSuccess(true);
      })
      .catch((err) => {
        setEmailSuccess(false);
        console.error("ERR", err);
      });
  };

  return (
    <div className="general-wrapper">
      {!emailSuccess && (
        <>
          <Message color="yellow">
            <Message.Header>
              It seems you already have another registered email / credential
              with us already.
            </Message.Header>
            <p>
              Please enter the email id in the below textbox. We will send a
              verification code to the email to consolidate the accounts
            </p>
          </Message>
          <Form success>
            <Form.Input
              label="Email ID"
              placeholder="Your email"
              onChange={(e) => setUserEmail(e.target.value)}
            />
            <Button onClick={sendEmail}>Submit</Button>
          </Form>
        </>
      )}

      {progress && (
        <>
          <h1> Sending the email...</h1>
          <div className="lds-ellipsis">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </>
      )}
      {emailSuccess && (
        <>
          <Message color="green">
            <Message.Header>Success!</Message.Header>
            <p>
              You would have received an email in your Inbox/Spam. The accounts
              will be consolidated from our side. You don't need to do anything
              from your side, we will keep you updated once the consolidation is
              done.
            </p>
          </Message>
        </>
      )}
    </div>
  );
};

export default Conflict;
