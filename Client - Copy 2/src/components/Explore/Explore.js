import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../actions/product";
import { Card, CardContent, CardMedia, Typography, Grid, Pagination } from "@mui/material";
import { Link } from "react-router-dom";
import "./styles.css";
import Loading from "../Loading/Loading";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import axios from "axios";

const ProductList = () => {

  const products = useSelector((state) => state.products);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 16; // Constant value for items per page

  useEffect(() => {
    // dispatch(fetchProducts());
    axios.get("http://localhost:8081/api/v1/inventory/all");

  }, []);

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
    <div className="product-list-container">
      <Grid container spacing={3} justifyContent="center">
        {currentItems.map((product) => (
          <Grid item key={product.id} xs={6} sm={4} md={3} lg={3}>
            <Card sx={{ marginBottom: 2 }} elevation={0} className="explore--card">
              <Link to={`/explore/${product.id}`} style={{ textDecoration: "none" }}>
                <CardMedia
                  component="img"
                  style={{ objectFit: "cover", height: "350px" }}
                  image={product.imageUrls[1]}
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
                        style={{ color: "#cfcfcf" }}
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
  );
};

export default ProductList;
