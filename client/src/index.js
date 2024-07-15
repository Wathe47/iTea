import React from "react";
import { createRoot } from "react-dom/client";
import { MantineProvider } from "@mantine/core"; // Import MantineProvider
import { Provider } from "react-redux";
import { AuthProvider } from "@asgardeo/auth-react";
import store from "./app/store";
import "./index.css";

import App from "./App";

const root = createRoot(document.getElementById("root"));

root.render(

   <AuthProvider

      config={{
         signInRedirectURL: "https://9db0e38b-3313-4f87-81b6-335171ff5794.e1-us-east-azure.choreoapps.dev",
         signOutRedirectURL: "https://9db0e38b-3313-4f87-81b6-335171ff5794.e1-us-east-azure.choreoapps.dev",
         clientID: "Q8zPt1tx2UrNsmSU2YfuLLTVpCga",
         baseUrl: "https://api.asgardeo.io/t/orgwathsalya",
         scope: ["openid", "email", "groups", "profile", "roles"]
      }}

   // config={{
   //    signInRedirectURL: "http://localhost:3000/",
   //    signOutRedirectURL: "http://localhost:3000/",
   //    clientID: "Q8zPt1tx2UrNsmSU2YfuLLTVpCga",
   //    baseUrl: "https://api.asgardeo.io/t/orgwathsalya",
   //    scope: ["openid", "email", "groups", "profile", "roles"]
   // }}
   >

      <Provider store={store}>
         <MantineProvider>
            <App />
         </MantineProvider>
      </Provider>
   </AuthProvider>


);
