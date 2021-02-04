import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";

import { GithubProvider } from "./context/Context";
import { Auth0Provider } from "@auth0/auth0-react";

// domain & client id are obtained by Auth0.com users.
// The redirect url is set to localhost:3000 in the auth0 application settings page. later, change it to the url of the hosting application.
//  cachedlocation is set to local storage b/c, the project redirects the user to login page, logging the user out after a 404 error loading page. It needs to redirect the user to the dashboard insted of logging out.

ReactDOM.render(
  <Auth0Provider
    domain="taurusilver.us.auth0.com"
    clientId="CAGxHudhlEBy060KTujVQktFYKbZfkMS"
    redirectUri={window.location.origin}
    cacheLocation="localstorage"
    returnTo="https://taurusilver7.github.io"
  >
    <GithubProvider>
      <App />
    </GithubProvider>
  </Auth0Provider>,
  document.getElementById("root")
);
