import React, { useState, useEffect } from "react";
import { useAuthContext } from "@asgardeo/auth-react";
import { useDispatch, useSelector } from "react-redux";
import {signin} from "../../actions/auth";

function Auth() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const { state, signIn, signOut, getBasicUserInfo } = useAuthContext();
  const [userDetails, setUserDetails] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!state.isAuthenticated) {
      signIn()
      .catch((error) => {
        console.error("Failed to sign in " + error);
      });
    }
  }, [ ]);
    

}

export default Auth;
