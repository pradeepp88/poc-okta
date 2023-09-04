import React, { useState } from "react";
import { Message } from "semantic-ui-react";
import { Button, Form } from "semantic-ui-react";
import axios from "axios";
import AlertMessage from "./AlertMessage";

const Conflict = () => {
  const [emailSuccess, setEmailSuccess] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [progress, setProgress] = useState(false);
  const [code, setCode] = useState(null);
  const [mergeSuccess, setMergeSuccess] = useState(false);

  const sendEmail = () => {
    setProgress(true);
    axios
      .post(
        "https://humber-poc-cgi.workflows.okta.com/api/flo/d856674875d68127e1c45e8daa479556/invoke",
        {
          alternateemail: userEmail,
          firstName: "Srijith",
          lastName: "sarman",
          email: "srijith.sarman@gmail.com",
        }
      )
      .then((res) => {
        setProgress(false);
        setEmailSuccess(true);
      })
      .catch((err) => {
        setProgress(false);
        setEmailSuccess(false);
        console.error("ERR", err);
      });
  };

  const sendCode = () => {
    setProgress(true);
    axios
      .post(
        "https://humber-poc-cgi.workflows.okta.com/api/flo/d856674875d68127e1c45e8daa479556/invoke",
        {
          alternateemail: userEmail,
          firstName: "Srijith",
          lastName: "sarman",
          email: "srijith.sarman@gmail.com",
          code: code,
        }
      )
      .then((res) => {
        setProgress(false);
        setMergeSuccess(true);
      })
      .catch((err) => {
        setProgress(false);
        setMergeSuccess(false);
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

      {emailSuccess && !mergeSuccess && (
        <>
          <AlertMessage
            header={`Success`}
            message={`You would have received an email in your Inbox/Spam. Check for the Code
        and enter the same within the input box and submit`}
          />
          <Form success>
            <Form.Input
              label="Code"
              placeholder="Secret Code"
              onChange={(e) => setCode(e.target.value)}
            />
            <Button onClick={sendCode}>Submit Code</Button>
          </Form>
        </>
      )}

      {mergeSuccess && (
        <AlertMessage
          header={`Merge Success`}
          message={`Both profiles has been consolidated into one!`}
        />
      )}
    </div>
  );
};

export default Conflict;
