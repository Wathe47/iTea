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
      signIn().catch((error) => {
        console.error("Failed to sign in " + error);
      });
    }

    
    if(state.isAuthenticated ){
      getBasicUserInfo()
      .then((response) => {
        console.log(response);
        setUserDetails(response);
      })
      .catch((error) => {
        console.error("Failed to load response "+ error);
      })
    }

    dispatch(
      signin(userDetails, (error) => {
        if (error) {
          setErrorMessage(error.message);
        }
      })
    );

    setUser(JSON.parse(localStorage.getItem("profile")));
    console.log(user)
  }, [state.isAuthenticated, signIn]);

  return null;
}

export default Auth;
