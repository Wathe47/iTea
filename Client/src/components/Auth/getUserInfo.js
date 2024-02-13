import { useEffect, useState } from "react";
import { useAuthContext } from "@asgardeo/auth-react";
import { signin } from "../../actions/auth";
import { useDispatch } from "react-redux";
import {getToken} from "./getToken";


const useUserInfo = () => {

const dispatch = useDispatch();
const {state,getBasicUserInfo,signOut} = useAuthContext();
const [userDetails, setUserDetails] = useState();
const [user,setUser] = useState();
useEffect(() => {
    const fetchData = async () => {
      if (state?.isAuthenticated) {
        try {
          const response = await getBasicUserInfo();
          console.log(response);
  
          dispatch(signin(response));
  
          const token = await getToken();
          console.log(token);
  
          if (response?.groups.includes("ADMIN")) {
            response.token = token;
          }
  
          setUserDetails(response);
          console.log(userDetails);
        } catch (error) {
          console.error("Failed to load response " + error);
        }
      }
    };
  
    fetchData();
  }, );
  
    
    return userDetails;

}

export default useUserInfo;