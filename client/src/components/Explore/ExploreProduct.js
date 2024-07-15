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

const initialState = {
  manufacturerEmail: "",
  customerEmail: "",
  quantity: null,
  productId: null,
  unitPrice: null,
  totalPrice: null,
  productName: "",
  address: "",
};

const ImageCarousel = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const userData = JSON.parse(window.localStorage.getItem("user"));
  const {state,getBasicUserInfo} = useAuthContext();
  const product = useSelector((state) => state.singleProduct);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  if (!product.id) {
    return <Loading />;
  }

  const handleChange = (e) => {
    const currentDate = new Date();
    const quantity = parseInt(e.target.value, 10);
    setFormData({
      ...formData,
      manufacturerEmail:product.manufacturerEmail,
      productId: product.id,
      customerEmail: userData.email,
      unitPrice: product.price,
      totalPrice: product.price * quantity,
      productName: product.name,
      quantity: quantity,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    dispatch(addOrder(formData));
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
              style={{ width: "100%", height: "100%" ,marginLeft:"10%"}}
            />
            <Button onClick={prevImage}>Prev</Button>
            <Button onClick={nextImage}>Next</Button>
          </div>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <div style={{marginTop:"-10%", textAlign:"left", marginLeft:"25%"}}>
          <Typography variant="h3">{product.name}</Typography>
          <Typography variant="body1">{product.description}</Typography>
          <div style={{height:"80px"}}></div>
          <Typography variant="h6">LKR {product.price}.00</Typography>
          <Typography variant="body2">Available Quantity: {product.quantity}</Typography>

          </div>

          <form onSubmit={handleSubmit} style={{marginTop:"20px"}}>
            {state?.isAuthenticated ? (
              <>
                <TextField
                  name="quantity"
                  placeholder="Quantity"
                  type="number"
                  onChange={handleChange}
                  variant="outlined"
                  required
                  InputProps={{
                    style: { height: "40px", width:"120px" } // Adjust the height as needed
                  }}
                />
                <Button type="submit" variant="contained" color="primary" style={{marginLeft:"5%", backgroundColor:"#94ba20" }}>
                  Add Order
                </Button>
              </>
            ) : (
              <Typography>Sign in to continue the order process!</Typography>
            )}
          </form>
        </Grid>
      </Grid>

      <ProductList />
    </div>
  );
};

export default ImageCarousel;
