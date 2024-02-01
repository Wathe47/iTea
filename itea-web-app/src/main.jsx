import React from "react";
import { render } from "react-dom";
import { AuthProvider } from "@asgardeo/auth-react";
import App from "./App";

const Index = () => (
    <AuthProvider
    config={ {
      signInRedirectURL: "http://localhost:3000",
      signOutRedirectURL: "http://localhost:3000",
      clientID: "jweDabmkfrTPx2oQaSgEBijWQXUa",
      baseUrl: "https://api.asgardeo.io/t/wathsalyagamage",
      scope: [ "openid","profile" ]
  } }
    >
        <App/>
    </AuthProvider>
);

render((<Index />), document.getElementById("root"));