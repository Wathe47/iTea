import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../actions/product";
import { Card, CardContent, CardMedia, Typography, Grid, Pagination, Box } from "@mui/material";
import { Link } from "react-router-dom";
import "./styles.css";
import Loading from "../Loading/Loading";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  console.log(products);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 16; // Constant value for items per page

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const count = Math.ceil(products.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  if (!currentItems.length) {
    return <Loading />;
  }

  return (
   <>
    <Box>
            <Typography
               variant="h4"
               style={{
                  fontFamily: "Poppins",
                  fontWeight: "600",
                  marginTop: "50px",
                  fontWeight: "bold",
               }}
            >
               EXPLORE PRODUCTS
            </Typography>
            {products.length === 0 && (
               <Typography
                  variant="h6"
                  style={{
                     fontFamily: "Poppins",
                     marginTop: "50px",
                     marginBottom: "30px",
                  }}
               >
                  No products found.
               </Typography>
            )}   
         </Box>
         
         <div className="product-list-container" style={{ background: "#ebebeb", margin: "40px auto", padding:"20px", width:'90%'}}>
      <Grid container spacing={3} justifyContent="space-around" sx={{margin:"10px"}}  >
        {currentItems.map((product) => (
          <Grid item key={product.id} xs={6} sm={4} md={3} lg={3}>
            <Card sx={{ marginBottom: 5 }} elevation={0} className="explore--card" style={{boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)", borderRadius:"15px",width:"350px"}}>
              <Link to={`/explore/${product.id}`} style={{ textDecoration: "none" }}>
                <CardMedia
                  component="img"
                  style={{ objectFit: "cover", width: "100%", height: "200px"}}
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
                      variant="h6"
                      style={{ fontWeight: "600" }}
                      className="explore--card--price"
                    >
                      LKR {product.price}.00
                    </Typography>
                  </Typography>
                  <BottomNavigation showLabels style={{ backgroundColor: "transparent" }}>
                    <Link to="/home">
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
   </>
    
  );
};

export default ProductList;
