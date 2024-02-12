import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "../../actions/product";
import { Typography, Grid, Button, TextField } from "@mui/material";
import Loading from "../Loading/Loading";
import ProductList from "./Explore"; // Ensure this import path matches your file structure
import { addOrder } from "../../actions/order";
import "./styles.css";
import { useAuthContext } from "@asgardeo/auth-react";
import axios from "axios";

const initialState = {
  customerEmail: "",
  quantity: null,
  productId: null,
  unitPrice: null,
  totalPrice: null,
  orderDate: null,
  productName: "",
  address: "",
};

const ImageCarousel = () => {

  const {state,getBasicUserInfo,signOut} = useAuthContext();
  const [userDetails, setUserDetails] = useState();

  const { id } = useParams();
  const userData = userDetails ;
  const product = useSelector((state) => state.singleProduct);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [formData, setFormData] = useState(initialState);


  useEffect( () => {

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

  }, [getBasicUserInfo,state.isAuthenticated]);


  useEffect(() => {
    axios.get(`http://localhost:8081/api/v1/inventory/fetch/${id}`);
  }, [id]);

  if (!product.id) {
    return <Loading />;
  }

  const handleChange = (e) => {
    const currentDate = new Date();
    const quantity = parseInt(e.target.value, 10);
    setFormData({
      ...formData,
      productId: product.id,
      customerEmail: userDetails.email,
      address: userDetails.street_address + ", " + userDetails.city + ", " + userDetails.country + ", " + userDetails.postal_code,
      unitPrice: product.price,
      totalPrice: product.price * quantity,
      orderDate: currentDate,
      productName: product.name,
      quantity: quantity,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8082/api/v1/order/add", formData);
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % product.imageUrls.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + product.imageUrls.length) % product.imageUrls.length);
  };

  return (
    <div style={{ marginTop: "80px" }}>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item xs={12} md={6} lg={6}>
          <div className="image-carousel-container">
            <img
              src={product.imageUrls[currentImageIndex]}
              alt={product.name}
              className="product-image"
            />
            <Button onClick={prevImage}>Prev</Button>
            <Button onClick={nextImage}>Next</Button>
          </div>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Typography variant="h5">{product.name}</Typography>
          <Typography variant="body1">{product.description}</Typography>
          <Typography variant="body2">Available Quantity: {product.quantity}</Typography>
          <Typography variant="h6">LKR {product.price}.00</Typography>
          <form onSubmit={handleSubmit}>
            {state?.isAuthenticated ? (
              <>
                <TextField
                  name="quantity"
                  label="Quantity"
                  type="number"
                  onChange={handleChange}
                  variant="outlined"
                  required
                />
                <Button type="submit" variant="contained" color="primary">
                  Add Order
                </Button>
              </>
            ) : (
              <Typography>Sign in to continue the order process!</Typography>
            )}
          </form>
        </Grid>
      </Grid>

      <Typography variant="h4" style={{ textAlign: "center", marginTop: "2rem" }}>
        Explore More
      </Typography>
      <ProductList />
    </div>
  );
};

export default ImageCarousel;
