import React, { useState, useEffect } from "react";
import { useAuthContext } from "@asgardeo/auth-react";



function Auth() {

  const { state, signIn } = useAuthContext();


  useEffect(() => {
    if (!state.isAuthenticated) {
      signIn()
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error("Failed to sign in " + error);
      });
    }

  }, [ ]);
    

}

export default Auth;
