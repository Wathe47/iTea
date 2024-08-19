import React, { useState, useEffect } from "react";
import {
   TextField,
   Button,
   Typography,
   Paper,
   Container,
   Box,
   Card,
   CardMedia,
   CardContent,
   Collapse,
   Alert,
   IconButton,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
   fetchProducts,
   updateDetails,
   deleteProduct,
} from "../../actions/product"; // Make sure to import `updateDetails`
import { Link } from "react-router-dom";

import "./products.css";
import { CloseIcon } from "@mantine/core";

const Products = () => {
   const [errors, setErrors] = useState({});
   const specificEmail = JSON.parse(window.localStorage.getItem("user")).email;
   const allProducts = useSelector((state) => state.products);
   const products = allProducts.filter(product => product.manufacturerEmail === specificEmail);
   const [showAlert, setShowAlert] = useState(false);

   const [productData, setProductData] = useState({
      name: "",
      price: "",
      description: "",
      imageUrls: [],
      quantity: "",
      addQuantity: "",
   });

   const [currentId, setCurrentId] = useState(null);
   const [showForm, setShowForm] = useState(false);

   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(fetchProducts());
   }, [dispatch]);

   const handleSubmit = (e) => {
      e.preventDefault();

      const formErrors = [];

      if (!productData.name) {
         formErrors.push("Product Name is required");
      }
      if (!productData.description) {
         formErrors.push("Description is required");
      }
      if (!productData.price) {
         formErrors.push("Price is required");
      }
      if (!productData.addQuantity) {
         productData.addQuantity = 0;
      }

      if (formErrors.length > 0) {
         setErrors(formErrors);
         return;
      }

      const newQuantity =
         parseInt(productData.quantity) + parseInt(productData.addQuantity);

      dispatch(
         updateDetails(currentId, { ...productData, quantity: newQuantity })
      );
      clear();

   };

   const clear = () => {
      setProductData({
         name: "",
         price: "",
         description: "",
         imageUrls: [],
         quantity: "",
         addQuantity: "",
      });

      window.scrollTo({
         top: 0,
         behavior: "smooth",
      });

      setShowAlert(true);
   };

   const handleCardClick = (clickedProduct) => {
      setProductData({
         name: clickedProduct.name,
         price: clickedProduct.price,
         description: clickedProduct.description,
         imageUrls: clickedProduct.imageUrls,
         quantity: clickedProduct.quantity,
      });

      setCurrentId(clickedProduct.id);
      setShowForm(true);

      window.scrollTo({
         top: document.body.scrollHeight,
         behavior: "smooth",
      });
   };

   const addImageURL = () => {
      const newImageURL = prompt("Enter a new image URL");
      if (newImageURL) {
         setProductData((prevData) => ({
            ...prevData,
            imageUrls: [...prevData.imageUrls, newImageURL],
         }));
      }
   };

   useEffect(() => {
      if (showAlert) {
         const timer = setTimeout(() => {
            setShowAlert(false);
         }, 5000);
         return () => clearTimeout(timer);
      }
   }, [showAlert]);

   console.log(showAlert);

   return (
      <Container maxWidth>

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
               MY PRODUCTS
            </Typography>
            {errors.length > 0 && (
               <Paper
                  elevation={3}
                  style={{
                     padding: "10px",
                     color: "red",
                     marginBottom: "10px",
                  }}
               >
                  {errors.join(", ")}
               </Paper>
            )}
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
         <Link to="/addproduct" style={{ color: "whitbacle" }}>
            <Button
               sx={{ my: 0 }}
               variant="filled"
               color="secondary"
               onClick={clear}
               style={{
                  background: "#94ba20",
                  borderRadius: "20px",
                  marginTop: "-30px",
                  marginBottom: "-120px",
                  marginLeft: "70%",
                  color: "white",
                  fontSize: "16px",
                  fontWeight: "bold",
               }}
            >
               ADD PRODUCTS

            </Button>
         </Link>
         {showAlert && (<Box sx={{ width: '100%', marginTop: '40px' }}>
            <Alert sx={{ mb: 2, width: '40%', margin: 'auto', padding: '0', marginTop: '20px', fontSize: '18px', }}>
               Product has been updated successfully!
            </Alert>
         </Box>)}
         <Box
            sx={{
               display: 'grid',
               gridTemplateColumns: {
                  xs: 'repeat(1, 1fr)', // 1 column on extra-small screens
                  sm: 'repeat(2, 1fr)', // 2 columns on small screens
                  md: 'repeat(3, 1fr)', // 3 columns on medium screens
                  lg: 'repeat(4, 1fr)', // 4 columns on large screens
               },
               gap: '80px',
               width: '90%',
               padding: '50px',
               paddingLeft: '80px',
               margin: 'auto',
               mt: 10,
               background: '#ebebeb',
            }}
         >
            {products.map((product) => (
               <Card
               xs={12} sm={8} md={6} lg={4}
               key={product.id}
               style={{
                  maxWidth: '300px',
                  borderRadius: '10px',
                  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
                  display: 'flex',
                  flexDirection: 'column',  // Ensures the card content and buttons stack vertically
                  justifyContent: 'space-between',  // Pushes the buttons to the bottom
               }}
            >
               <CardMedia
                  component="img"
                  alt={product.name}
                  height="250px"
                  image={product.imageUrls[0]}
               />
               <CardContent style={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h9" component="div" fontWeight={'bold'}>
                     {product.name}
                  </Typography>
                  <Typography
                     variant="body2"
                     color="text.secondary"
                     style={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        maxWidth: '100%',
                     }}
                  >
                     {product.description}
                  </Typography>
                  <Typography
                     variant="h6"
                     color="text.primary"
                     style={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        fontWeight: '600',
                     }}
                  >
                     LKR {product.price}.00
                  </Typography>
                  <Typography
                     variant="body2"
                     color="text.primary"
                     style={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        fontWeight: '500',
                     }}
                  >
                     Available Quantity: {product.quantity}
                  </Typography>
               </CardContent>
               <div style={{ display: 'flex', width: '100%' }}>
                  <Button
                     onClick={() => handleCardClick(product)}
                     size="small"
                     style={{
                        background: '#94ba20',
                        color: 'white',
                        fontSize: 'small',
                        borderRadius: '0',
                        width: '50%',
                        height: '50px',
                     }}
                  >
                     Edit
                  </Button>
                  <Button
                     onClick={() => dispatch(deleteProduct(product.id))}
                     size="small"
                     style={{
                        background: 'black',
                        color: 'white',
                        fontSize: 'small',
                        borderRadius: '0',
                        width: '50%',
                        height: '50px',
                     }}
                  >
                     Delete
                  </Button>
               </div>
            </Card>
            
            ))}
         </Box>

         {showForm && (
            <Paper
               className="paper"
               style={{
                  position: "relative",
                  maxWidth: "25%",
                  maxHeight: "4000px",
                  margin: "100px 0 100px 50%",
                  transform: "translate(-50%, 0)",
               }}
               elevation={0}
            >
               <Typography
                  variant="h6"
                  style={{
                     marginBottom: "20px",
                     fontWeight: "600",
                     fontSize: "30px",
                  }}
               >
                  EDIT PRODUCT
               </Typography>
               <Paper
                  className="paper"
                  fullWidth
                  style={{
                     position: "relative",
                     display: "flex",
                     maxWidth: "100%",

                  }}
                  elevation={0}
               >
                  <form
                     autoComplete="off"
                     noValidate
                     className="form"
                     onSubmit={handleSubmit}
                  >
                     <TextField
                        sx={{ my: 0.5 }}
                        name="product_name"
                        variant="outlined"
                        label="Product Name"
                        fullWidth
                        required
                        value={productData.name}
                        onChange={(e) =>
                           setProductData({ ...productData, name: e.target.value })
                        }
                        error={Boolean(errors.name)}
                        helperText={errors.name}
                        onFocus={() => {
                           setErrors({ ...errors, name: "" });
                        }}
                     />

                     <TextField
                        sx={{ my: 0.5 }}
                        multiline
                        name="description"
                        variant="outlined"
                        label="Description"
                        fullWidth
                        required
                        value={productData.description}
                        onChange={(e) =>
                           setProductData({ ...productData, description: e.target.value })
                        }
                        error={Boolean(errors.description)}
                        helperText={errors.description}
                        onFocus={() => {
                           setErrors({ ...errors, description: "" });
                        }}
                     />
                     <TextField
                        sx={{ my: 0.5 }}
                        name="imageUrls"
                        variant="outlined"
                        label="ImageUrls"
                        fullWidth
                        required
                        value={productData.imageUrls.join(", ")}
                        onChange={(e) =>
                           setProductData({
                              ...productData,
                              imageUrls: e.target.value
                                 .split(", ")
                                 .filter((url) => url.trim() !== ""),
                           })
                        }

                     />


                     <TextField
                        sx={{ my: 0.5 }}
                        name="price"
                        variant="outlined"
                        label="Price"
                        fullWidth
                        required
                        value={productData.price}
                        onChange={(e) =>
                           setProductData({ ...productData, price: e.target.value })
                        }
                        error={Boolean(errors.price)}
                        helperText={errors.price}
                        onFocus={() => {
                           setErrors({ ...errors, price: "" });
                        }}
                     />

                     <TextField
                        sx={{ my: 0.5 }}
                        name="quantity"
                        variant="outlined"
                        label="Quantity"
                        fullWidth
                        required
                        value={productData.quantity}
                        onChange={(e) =>
                           setProductData({ ...productData, quantity: e.target.value })
                        }
                        error={Boolean(errors.quantity)}
                        helperText={errors.quantity}
                        onFocus={() => {
                           setErrors({ ...errors, quantity: "" });
                        }}
                     />
                     <TextField
                        sx={{ my: 3 }}
                        name="addQuantity"
                        variant="outlined"
                        label="addQuantity"
                        fullWidth
                        value={productData.addQuantity}
                        onChange={(e) =>
                           setProductData({ ...productData, addQuantity: e.target.value })
                        }
                        error={Boolean(errors.addQuantity)}
                        helperText={errors.addQuantity}
                        onFocus={() => {
                           setErrors({ ...errors, addQuantity: "" });
                        }}
                        style={{ marginTop: "0px" }}
                     />
                  </form>
               </Paper>
               <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px', margin: '30px 0 0 20px', width: "90%" }}>
                  <Button
                     sx={{ my: 0 }}
                     variant="filled"
                     color="secondary"
                     size="small"
                     onClick={clear}
                     style={{
                        background: "white",
                        borderRadius: "20px",
                        marginTop: "-5px",
                        color: "#94ba20",
                        fontSize: "13px",
                     }}

                  >
                     Clear
                  </Button>
                  <Button
                     sx={{ my: 0.5 }}
                     className="buttonSubmit"
                     variant="outlined"
                     size="large"
                     onClick={handleSubmit}
                     type="submit"
                     style={{
                        background: "#94ba20",
                        borderRadius: "20px",
                        border: "none",
                        marginTop: "-10px",
                        color: "white",
                        fontSize: "small",
                     }}
                  >
                     UPDATE
                  </Button>

               </div>
            </Paper>
         )}
      </Container>
   );
};

export default Products;
