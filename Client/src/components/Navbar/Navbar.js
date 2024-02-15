  import React, { useState, useEffect, useCallback } from "react";
  import Box from "@mui/system/Box";
  import { useDispatch } from "react-redux";

  import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
  import ExploreIcon from "@mui/icons-material/Explore";
  import AccountCircleIcon from "@mui/icons-material/AccountCircle";
  import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
  import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
  import LoginIcon from "@mui/icons-material/Login";
  import InfoIcon from "@mui/icons-material/Info";
  import { getToken } from "../Auth/getToken";
  import { useAuthContext } from "@asgardeo/auth-react";

  import Grid from "@mui/system/Unstable_Grid";
  import styled from "@mui/system/styled";
  // import { useDispatch, useSelector } from "react-redux";
  import { Link, useNavigate } from "react-router-dom";

  import "./styles.css";


  const mode = "light"; // Replace with your desired mode (either "dark" or "light")

  const Item = styled(Link)(({ theme }) => ({
    border: "0px solid",
    borderColor: mode === "dark" ? "#444d58" : "#ced7e0",
    borderRadius: "0px",
    textAlign: "center",
    letterSpacing: "1px",
    color: "#3D3B3A",
    textDecoration: "none",
    fontWeight: "500",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transition: "color 0.3s", // Add color transition
    "&:hover": {
      color: "#94ba20", // Change text color on hover
    },
  }));

  const IconItem = styled(Item)(({ theme }) => ({
    "&:hover": {
      opacity: 1, 
      color: "#94ba20",
    },
    "&:hover svg": { // Add hover effect for the svg icon
      color: "#94ba20", // Change the color to green on hover
    },
  }));



  const DropdownContent = styled("div")(({ theme }) => ({
    display: "none",
    position: "absolute",
    backgroundColor: "#f5f5f5",
    borderRadius: "10px",
    minWidth: "250px",
    textAlign: "left",
    zIndex: 1,
    top: "100px",
    opacity: 0,
    "&.show": {
      opacity: 1,
      display: "block", // Display the content when shown
    },
  }));

  const DropdownItem = styled("div")(({ theme }) => ({
    padding: "6px 12px",
    textDecoration: "none",
    display: "block",
    borderRadius: "10px",
    fontSize: "13px",
    marginTop: "5px",

    color: "black",
    "&:hover": {
      backgroundColor: "#e1e1e1",
    },
  }));

  const ProfileContainer = styled("div")(({ theme }) => ({
    position: "relative", // Ensure the container is relatively positioned
  }));




  const Navbar = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const {state,getBasicUserInfo,signOut} = useAuthContext();
    const [userDetails, setUserDetails] = useState();

    useEffect(() => {
        if (state?.isAuthenticated) {
          getBasicUserInfo()
          .then((response) => {
            setUserDetails(response);
            window.localStorage.setItem("user", JSON.stringify(response));
          })
          .catch((error) => {
            console.error("Failed to load response " + error);
          });
        }
    }, [getBasicUserInfo]);


   const handleSignOut = () => {
    if(state?.isAuthenticated){
      signOut();
      window.localStorage.clear();
      navigate("/");
    }
      window.location.reload();
    }
    
    const toggleDropdown = () => {
      setIsDropdownOpen(!isDropdownOpen);
    };

    // const role = userDetails?.groups?.includes("ADMIN") ? "ADMIN" : "USER";
      let role;
    if(userDetails?.groups?.includes("ADMIN")){
      role = "ADMIN";
    }else if(userDetails?.groups?.includes("MANUFACTURER")){
      role = "MANUFACTURER";
    }else{
      role = "USER";
    }

    console.log(userDetails);
    console.log(role);  

    const renderComponentOrder = () => {
      switch (role) {
        case "ADMIN":
          return "admin-orders";
        case "MANUFACTURER":
          return "seller-orders";
        default:
          return "user-orders";
      }
    };

    const componentToRenderOrder = renderComponentOrder();

    const renderComponentExplore = () => {
      switch (role) {
        case "ADMIN":
          return "explore";
        case "MANUFACTURER":
          return "addproductdetails";
        default:
          return "explore";
      }
    };

    const componentToRenderExplore = renderComponentExplore();

    return (
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column", // Change to column layout
          justifyContent: "center", // Center vertically
          alignItems: "center", // Center horizontally
        }}
        style={{  width: "100%" ,}} // Add width: "100%" to stretch across the screen
        className="navbar"
      >
        <div className="navBack"></div>


        {state?.isAuthenticated ? (
          <Grid
            container
            position="relative"
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 12, sm: 16, md: 24 }}
          >
            <Grid xs={4} sm={4}>
              <Item></Item>
            </Grid>
            <Grid
              xs={2}
              sm={4}
              sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column", // Change to column layout
                justifyContent: "center", // Center vertically
                alignItems: "center", // Center horizontally
              }}
            >
              <Link to='/'>
                <div
                  style={{
                    position: "relative",
                    top: "0px",
                    left: "-100%",
                    overflow: "hidden",
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src="https://res.cloudinary.com/dl8dikngu/image/upload/v1707476098/ziltkvevsqnizaeizkp4.png"
                    alt="iTeaLogo"
                    width="70%"
                    
                    style={{
                      objectFit: "cover",
                      position: "relative",
                      top: "0px",
                      margin: "-5% 0% -10% 0%" 
                    }}
                  />
                </div>
              </Link>
            </Grid>

            <Grid
              xs={2}
              sm={4}
              sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column", // Change to column layout
                justifyContent: "center", // Center vertically
                alignItems: "right", // Center horizontally
              }}
              
              >
              <Item to={componentToRenderExplore} style={{ marginLeft: "10%"}}>
                <ExploreIcon
                  style={{ marginRight: "5px", color: "black", fontSize: "25px" }}
                />
                <span className="icon-text">
                PRODUCTS
                </span>
              </Item>
            </Grid>
            <Grid
              xs={2}
              sm={2}
              sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column", // Change to column layout
                justifyContent: "center", // Center vertically
                alignItems: "center", // Center horizontally
              }}
            >
              <Item to={componentToRenderOrder}>
                <ShoppingCartIcon
                  style={{ marginRight: "5px", color: "black", fontSize: "25px" }}
                />
                <span className="icon-text">
                  ORDERS
                </span>
              </Item>
            </Grid>
            <Grid
              xs={2}
              sm={8}
              sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column", // Change to column layout
                justifyContent: "center", // Center vertically
                alignItems: "center", // Center horizontally
              }}
            >
              <ProfileContainer>
                <IconItem onClick={toggleDropdown}>
                  <AccountCircleIcon
                    style={{
                      marginRight: "5px",
                      color: "black",
                      fontSize: "25px",
                    }}
                  />
                  <span
                    className="icon-text"
                    style={{ textTransform: "uppercase" }}
                  >
                    {role === "ADMIN"
                      ? "ADMIN PROFILE"
                      : `${userDetails?.givenName} 's Profile`}
                  </span>
                  {!isDropdownOpen ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
                  <DropdownContent className={isDropdownOpen ? "show" : ""} style={{ marginTop:"-65px", marginLeft:"50px", }}>
                    <Link to="profile" style={{ textDecoration: "none" }}>
                      <DropdownItem>Profile</DropdownItem>
                    </Link>
                    {role === "ADMIN" && (
                      <Link to="manage-users" style={{ textDecoration: "none" }}>
                        <DropdownItem>Manage Users</DropdownItem>
                      </Link>
                    )}
                    <DropdownItem onClick={handleSignOut}>Logout</DropdownItem>
                  </DropdownContent>
                </IconItem>
              </ProfileContainer>
            </Grid>
          </Grid>
        ) : 
        
        
        
        
        
        
        (
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 8, sm: 16, md: 24 }}
          >
            <Grid xs={2} sm={4}>
              <Item></Item>
            </Grid>
            <Grid xs={2} sm={4}>
              <Link to="/">
                <div
                  style={{
                    position: "relative",
                    top: "0px",
                    left: "-100%",
                    overflow: "hidden",
                    width: "70%",
                  }}
                >
                  <img
                    src="https://res.cloudinary.com/dl8dikngu/image/upload/v1707476098/ziltkvevsqnizaeizkp4.png"
                    alt="iTeaLogo"
                    width="100%"
                    style={{
                      objectFit: "cover",
                      position: "relative",
                      top: "0px",
                    }}
                  />
                </div>
              </Link>
            </Grid>
            <Grid
              xs={2}
              sm={4}
              sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column", // Change to column layout
                justifyContent: "center", // Center vertically
                alignItems: "center", // Center horizontally
              }}
            >
              <Item to="/explore">
                <ExploreIcon
                  style={{ marginRight: "5px", color: "black", fontSize: "25px" }}
                />
                <span className="icon-text">PRODUCTS</span>
              </Item>
            </Grid>
            <Grid
              xs={2}
              sm={4}
              sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column", // Change to column layout
                justifyContent: "center", // Center vertically
                alignItems: "center", // Center horizontally
              }}
            >
              <Item to="/auth">
                <LoginIcon
                  style={{ marginRight: "5px", color: "black", fontSize: "25px" }}
                />
                <span className="icon-text">SIGNUP/SIGNIN</span>
              </Item>{" "}
            </Grid>
            <Grid
              xs={2}
              sm={4}
              sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column", // Change to column layout
                justifyContent: "center", // Center vertically
                alignItems: "center", // Center horizontally
              }}
            >
              <Item to="/auth">
                <InfoIcon
                  style={{ marginRight: "5px", color: "black", fontSize: "25px" }}
                />
                <span className="icon-text">INFO</span>
              </Item>
            </Grid>
          </Grid>
        )}
      </Box>
    );
  };

  export default Navbar;

