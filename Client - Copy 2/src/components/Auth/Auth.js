import { useAuthContext } from "@asgardeo/auth-react";
import React, { useEffect } from "react";

function Auth() {
  const {state,signIn,signOut} = useAuthContext();


   useEffect(() => {
    if(!state.isAuthenticated){
      signIn()
      .catch((error) => {
        console.error("Failed to sign in "+ error);
      })
    }
  }, []);

    
}

export default Auth;
