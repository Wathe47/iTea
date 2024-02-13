import React, { useEffect, useState } from "react";
import { Button, Container, Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../actions/product";
import styled from "@mui/system/styled";
import { Link } from "react-router-dom";
import "./style.css";
import Loading from "../Loading/Loading";
import { useAuthContext } from "@asgardeo/auth-react";
import { getToken } from "../Auth/getToken";

const Item = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  border: "0px solid",
  borderColor: theme.palette.mode === "dark" ? "#444d58" : "#ced7e0",
  padding: theme.spacing(1),
  borderRadius: "50px",
  height: "10px",
  textAlign: "center",
}));

const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  console.log(products)
  const {state, getBasicUserInfo} = useAuthContext();
  const [userDetails, setUserDetails] = useState(null);


  const [activeSlide, setActiveSlide] = useState(0); // New state for active slide index

  useEffect(() => {
    console.log("hi")

    if(state?.isAuthenticated ){
      getBasicUserInfo()
      .then((response) => {
        console.log(response);
        setUserDetails(response);

      })
      .catch((error) => {
        console.error("Failed to load response "+ error);
      })
    }
  }, []);


  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);


  // Function to navigate to the next slide
  const nextSlide = () => {
    setActiveSlide((prevActiveSlide) => 
      prevActiveSlide >= products.length - 1 ? 0 : prevActiveSlide + 1
    );
  };

  // Function to navigate to the previous slide
  const prevSlide = () => {
    setActiveSlide((prevActiveSlide) => 
      prevActiveSlide <= 0 ? products.length - 1 : prevActiveSlide - 1
    );
  };

  if (!products.length) {
    return <Loading />;
  }

  return (
    <Container maxWidth="100%" style={{ marginTop: "150px" }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <div className="slider-container">
            {products.map((item, index) => (
              <div
                key={item.id}
                className={`slide ${index === activeSlide ? "active" : ""}`}
                style={{ display: index === activeSlide ? "block" : "none" }}
              >
                <Link to={`/explore/${item.id}`} style={{ textDecoration: "none" }}>
                  <img src={item.imageUrls[0]} alt={item.name} />
                  <Typography variant="body2" className="slide-title" color="white">
                    {item.name}
                  </Typography>
                </Link>
              </div>
            ))}
            <Button className="prev" onClick={prevSlide}>Prev</Button>
            <Button className="next" onClick={nextSlide}>Next</Button>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
