import React, { useEffect, useRef } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import OktaSignIn from '@okta/okta-signin-widget';
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';
import logo from './humber.svg';
import { Route, useHistory, Switch } from 'react-router-dom';

import config from './config';

const Login = ({ setCorsErrorModalOpen }) => {
  const { oktaAuth } = useOktaAuth();
  const widgetRef = useRef();
  const history = useHistory();

  // Fetch otp and state from query params from email callback verification URI
  // Application should have http://localhost:8080/login as the email callback verification URI
  const queryParams = new URLSearchParams(window.location.search);
  const otp = queryParams.get('otp');
  const state = queryParams.get('state');

  useEffect(() => {
    if (!widgetRef.current) {
      return false;
    }

    const { issuer, clientId, redirectUri, scopes, useInteractionCode } =
      config.oidc;
    const widget = new OktaSignIn({
      /**
       * Note: when using the Sign-In Widget for an OIDC flow, it still
       * needs to be configured with the base URL for your Okta Org. Here
       * we derive it from the given issuer for convenience.
       */
      baseUrl: issuer.split('/oauth2')[0],
      clientId,
      redirectUri,
      logo,
      i18n: {
        en: {
          'primaryauth.title': 'Sign In With your humber account',
        },
      },
      authParams: {
        // To avoid redirect do not set "pkce" or "display" here. OKTA-335945
        issuer,
        scopes,
      },
      useInteractionCodeFlow: useInteractionCode, // Set to true, if your org is OIE enabled
      state,
      otp,
    });

    widget.renderEl(
      { el: widgetRef.current },
      (res) => {
        console.log("HANDLE REDIRECT ??????", res)
        // res.status - SUCCESS
        oktaAuth.handleLoginRedirect(res.tokens);
        history.push('/terms');
      },
      (err) => {
        throw err;
      }
    );

    // Note: Can't distinguish CORS error from other network errors
    const isCorsError = (err) => err.name === 'AuthApiError' && !err.statusCode;

    widget.on('afterError', (_context, error) => {
      if (isCorsError(error)) {
        setCorsErrorModalOpen(true);
      }
    });

    return () => widget.remove();
  }, [oktaAuth]);

  return (
    <div>
      <div>
        <div>
          <div ref={widgetRef} />
        </div>
      </div>
    </div>
  );
};

export default Login;
