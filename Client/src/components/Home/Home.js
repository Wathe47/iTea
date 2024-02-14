import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../actions/product";
import styled from "@mui/system/styled";
import { Link } from "react-router-dom";
import "./style.css";
import Loading from "../Loading/Loading";
import { useAuthContext } from "@asgardeo/auth-react";
import { getToken } from "../Auth/getToken";


import { Button, Container, Card, CardContent, CardMedia, Typography, Grid, Pagination } from "@mui/material";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";


  

const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  console.log(products)
  const {state, getBasicUserInfo} = useAuthContext();
  const [userDetails, setUserDetails] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 16; // Constant value for items per page


  const count = Math.ceil(products.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

const Item = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  border: "0px solid",
  borderColor: theme.palette.mode === "dark" ? "#444d58" : "#ced7e0",
  padding: theme.spacing(1),
  borderRadius: "50px",
  height: "10px",
  textAlign: "center",
}));

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




  if (!products.length) {
    return <Loading />;
  }

  return (
    <div>
<div style={{ backgroundImage: `url('https://res.cloudinary.com/dl8dikngu/image/upload/v1707877727/qmvqaazkjcq3tijo2lh6.webp')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <Container maxWidth="xl" style={{ minHeight: '100vh', display: 'flex', alignItems: 'left', justifyContent: 'space-between' }}>
        <div style={{ marginLeft: '50px', width:"30%" }}>
          
          <Typography variant="h4" gutterBottom style={{marginBottom:"10%", marginTop:"20%"}}>
            Welcome to iTea 
          </Typography>
          <Typography variant="body1" paragraph style={{marginBottom:"5%"}}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel metus quis velit bibendum tristique vel nec arcu. Integer volutpat tellus quis orci consequat, ac aliquam nunc ultrices. Curabitur malesuada sit amet risus nec suscipit. 
          </Typography>
          <Button variant="contained" style={{ backgroundColor: "#94ba20", color: "white",marginTop:"15%" }}>
          Sign Up
        </Button>

        </div>
        <div>
          {/* Your slider component here */}
        </div>
      </Container>
    </div>
    <div className="product-list-container">
    <Grid container spacing={3} justifyContent="center">
      {currentItems.map((product) => (
        <Grid item key={product.id} xs={6} sm={4} md={3} lg={3}>
          <Card sx={{ marginBottom: 2 }} elevation={0} className="explore--card" style={{boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)"}}>
            <Link to={`/explore/${product.id}`} style={{ textDecoration: "none" }}>
              <CardMedia
                component="img"
                style={{ objectFit: "cover", width: "100%", height: "100%" }}
                image={product.imageUrls[0]}
                alt={product.name}
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h7"
                  component="div"
                  style={{
                    color: "black",
                    fontWeight: "600",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                  className="explore--card--name"
                >
                  {product.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                  className="explore--card--details"
                >
                  {product.description}
                  <br />
                  <Typography
                    variant="h7"
                    style={{ fontWeight: "600" }}
                    className="explore--card--price"
                  >
                    LKR {product.price}.00
                  </Typography>
                </Typography>
                <BottomNavigation showLabels style={{ backgroundColor: "transparent" }}>
                  <Link to="/">
                    <BottomNavigationAction
                      label="Add to Cart"
                      icon={<ShoppingCartIcon />}
                      style={{ color: "black" }}
                    />
                  </Link>
                </BottomNavigation>
              </CardContent>
            </Link>
          </Card>
        </Grid>
      ))}
    </Grid>
    <div className="pagination">
      <Pagination
        count={count}
        page={currentPage}
        onChange={handlePageChange}
        variant="outlined"
        shape="rounded"
      />
    </div>
  </div>
  </div>
  );
};

export default Home;



