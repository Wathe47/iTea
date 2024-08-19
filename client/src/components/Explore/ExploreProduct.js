import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "../../actions/product";
import { Typography, Grid, Button, TextField, Box, Rating, Alert } from "@mui/material";
import Loading from "../Loading/Loading";
import ProductList from "./Explore"; // Ensure this import path matches your file structure
import { addOrder } from "../../actions/order";
import "./styles.css";
import { useAuthContext } from "@asgardeo/auth-react";
import ProductDetails from "./ProductDetails";

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
   const navigate = useNavigate();
   const { id } = useParams();
   const userData = JSON.parse(window.localStorage.getItem("user"));
   const { state, getBasicUserInfo } = useAuthContext();
   const product = useSelector((state) => state.singleProduct);
   const [currentImageIndex, setCurrentImageIndex] = useState(0);
   const [formData, setFormData] = useState(initialState);
   const [showAlert, setShowAlert] = useState(false);


   useEffect(() => {
      dispatch(fetchProductById(id));
   }, [dispatch, id]);

   useEffect(() => {
      if (showAlert) {
         const timer = setTimeout(() => {
            setShowAlert(false);
         }, 5000);
         return () => clearTimeout(timer);
      }
   }, [showAlert]);


   if (!product.id) {
      return <Loading />;
   }

   const handleChange = (e) => {
      const currentDate = new Date();
      const quantity = parseInt(e.target.value, 10);
      setFormData({
         ...formData,
         manufacturerEmail: product.manufacturerEmail,
         productId: product.id,
         imageUrl: product.imageUrls[0],
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

      window.scrollTo({
         top: 0,
         behavior: "smooth",
      });

      setShowAlert(true);
   };




   return (
      <div >
         {showAlert && (<Box sx={{ width: '100%', marginTop: '40px' }}>
            <Alert sx={{ width: '40%', margin: '0px auto', padding: '0', marginTop: '20px', fontSize: '21px', }}>
               Order has been added successfully!
            </Alert>
         </Box>)}
         <Grid container spacing={2} justifyContent="center" alignItems="center" borderRadius={1} boxShadow={2} padding={2}
            sx={{ margin: "5% auto 1% auto ", width: '75%', backgroundColor: "#ebebeb", padding: "2%" }}>

            <Grid item xs={12} md={6} lg={6}>
               <div className="image-carousel-container">
                  <img
                     src={product.imageUrls[currentImageIndex]}
                     alt={product.name}
                     className="product-image"
                     style={{ width: "500px", height: "500px", }}
                  />
               </div>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
               <div style={{ marginTop: "5%", textAlign: "left", marginLeft: "10%" }}>
                  <Typography variant="h5" fontWeight="bold">{product.name}</Typography>
                  <Typography variant="body1">{product.description}</Typography>

                  <Box display="flex" alignItems="center" gap="10px" style={{ margin: "8px" }}>
                     <Rating value={4} readOnly />
                     <Typography variant="body2" color="textSecondary">
                        245 ratings
                     </Typography>
                  </Box>

                  <Box display="flex" alignItems="center" gap="10px" style={{ marginBottom: "16px" }}>
                     <Typography variant="h8">Brand:</Typography>
                     <Link href="#" underline="hover" variant="body2">
                        No Brand
                     </Link>
                     <Typography variant="body2">|</Typography>
                     <Link href="#" underline="hover" variant="body2">
                        More Baking & Cooking from No Brand
                     </Link>
                  </Box>
                  <Typography variant="h4" sx={{ fontWeight: 'bold', color: "#94ba20" }}>LKR {product.price}.00</Typography>
                  <Typography variant="body1">Available Quantity: {product.quantity}</Typography>

               </div>

               <form onSubmit={handleSubmit} style={{ marginTop: "100px" }}>
                  {state?.isAuthenticated ? (
                     <>
                        <Box display="flex" alignItems="center" margin="5% 0 0 15%" gap="30px" >
                           <Typography variant="h7">Quantity</Typography>
                           <TextField
                              name="quantity"
                              placeholder="1"
                              type="number"
                              onChange={handleChange}
                              variant="outlined"
                              required
                              InputProps={{
                                 style: { height: "40px", width: "120px" }, // Adjust the height as needed
                              }}
                           />
                        </Box>
                        <Box display="flex" alignItems="center" margin="5% 0 5% 15%" gap="30px" >
                           <Button type="submit" variant="contained" color="primary" style={{ marginLeft: "5%", backgroundColor: "black" }}>
                              Add to cart
                           </Button>
                           <Button type="submit" variant="contained" color="primary" style={{ marginLeft: "5%", backgroundColor: "#94ba20" }}>
                              Add Order
                           </Button>
                        </Box>
                     </>
                  ) : (
                     <Typography>Sign in to continue the order process!</Typography>
                  )}
               </form>
            </Grid>
         </Grid>

         <ProductDetails />

         <ProductList itemsPerPage={6} heading="SIMILAR PRODUCTS" />
      </div>
   );
};

export default ImageCarousel;
