import React, { useEffect, useRef, useState } from "react";
import { useOktaAuth } from "@okta/okta-react";
import OktaSignIn from "@okta/okta-signin-widget";
import "@okta/okta-signin-widget/dist/css/okta-sign-in.min.css";
import logo from "./humber.svg";
import { useHistory } from "react-router-dom";

import config from "./config";
import { Image } from "semantic-ui-react";
import PrivacyModal from "./PrivacyModal";

const Login = ({ setCorsErrorModalOpen }) => {
  const { oktaAuth } = useOktaAuth();
  const widgetRef = useRef();
  const history = useHistory();

  const queryParams = new URLSearchParams(window.location.search);
  const otp = queryParams.get("otp");
  const state = queryParams.get("state");

  useEffect(() => {
    if (!widgetRef.current) {
      return false;
    }

    const { issuer, clientId, redirectUri, scopes, useInteractionCode } =
      config.oidc;
    const widget = new OktaSignIn({
      baseUrl: issuer.split("/oauth2")[0],
      clientId,
      redirectUri,
      logo,
      i18n: {
        en: {
          "primaryauth.title": "Sign In With your humber account",
        },
      },
      authParams: {
        issuer,
        scopes,
      },
      useInteractionCodeFlow: useInteractionCode,
      state,
      otp,
    });

    widget.renderEl(
      { el: widgetRef.current },
      (res) => {
        // res.status - SUCCESS
        oktaAuth.handleLoginRedirect(res.tokens);
        console.log("TERMS:::TRUE");
        history.push("/terms");
      },
      (err) => {
        throw err;
      }
    );

    const isCorsError = (err) => err.name === "AuthApiError" && !err.statusCode;

    widget.on("afterError", (_context, error) => {
      if (isCorsError(error)) {
        setCorsErrorModalOpen(true);
      }
    });

    return () => widget.remove();
  }, [oktaAuth]);

  return (
    <div className="login-wrapper">
      <div className="image-wrapper">
        <Image
          className="humberImg"
          src="https://login.humber.ca/cas/img/3284.jpg"
        />
      </div>
      <div className="login-widget">
        <div className="widgetRender">
          <div ref={widgetRef} />
        </div>
      </div>
    </div>
  );
};

export default Login;
