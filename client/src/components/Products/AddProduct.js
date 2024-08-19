import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import "./addProduct.css";
import { addProduct } from "../../actions/product";
import { validateProductForm } from "../../validation/formValidation";
import { useAuthContext } from "@asgardeo/auth-react";
import { Box, Grid } from "@mantine/core";

const AddProductForm = () => {

   const navigate = useNavigate();
   const [errors, setErrors] = useState({});

   const user = JSON.parse(window.localStorage.getItem("user"));

   const [productData, setProductData] = useState({
      name: "",
      price: "",
      description: "",
      quantity: "",
      manufacturerEmail: user?.email,
      imageUrls: [], // Change to an array
   });

   const currentId = useSelector((state) => state.products.currentId);
   const product = useSelector((state) =>
      currentId ? state.products.find((p) => p.id === currentId) : null
   );
   const dispatch = useDispatch();

   useEffect(() => {
      if (product) setProductData(product);
   }, [product]);



   const handleSubmit = (event) => {
      event.preventDefault();
      const formErrors = validateProductForm(productData);
      setErrors(formErrors);

      if (Object.keys(formErrors).length > 0) {
         return;
      }

      dispatch(addProduct(productData));

      navigate("/products");
      clear();
   };

   const handleImageUrlsChange = (event) => {
      const imageUrlsArray = event.target.value
         .split(", ")
         .map((url) => url.trim());

      setProductData({ ...productData, imageUrls: imageUrlsArray });
   };

   const clear = () => {
      setProductData({
         name: "",
         price: "",
         description: "",
         quantity: "",
         imageUrls: [],
      });
   };

   return (
      <Paper
         className="paper"
         style={{
            position: "relative",
            display: "flex",
            maxWidth: "35%",
            margin: "100px 0 100px 50%",
            transform: "translate(-50%, 0)",
         }}
         elevation={0}
      >
         <form
            autoComplete="off"
            noValidate
            className="form"
            onSubmit={handleSubmit}
         >
            <Typography
               variant="h6"
               style={{
                  marginBottom: "20px",
                  fontWeight: "600",
                  fontSize: "30px",
               }}
            >
               ADD PRODUCT
            </Typography>

            <TextField
               sx={{ my: 0.5 }}
               name="name"
               variant="outlined"
               label="Product Name"
               fullWidth
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
               multiline
               name="imageUrls"
               variant="outlined"
               label='Image URLS (link.jpg, link.jpg)'
               fullWidth
               value={productData.imageUrls.join(", ")}
               onChange={handleImageUrlsChange}
               error={Boolean(errors.imageUrls)}
               helperText={errors.imageUrls}
               onFocus={() => {
                  setErrors({ ...errors, imageUrls: "" });
               }}
            />

            <TextField
               sx={{ my: 0.5 }}
               name="quantity"
               variant="outlined"
               label="Quantity"
               fullWidth
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
               sx={{ my: 0.5 }}
               name="price"
               variant="outlined"
               label="Price"
               fullWidth
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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '30px', width: '100%' }}>
               <Button
                  variant="outlined"
                  size="large"
                  type="submit"
                  onClick={() => navigate("/products")}
                  style={{
                     background: "#94ba20",
                     borderRadius: "20px",
                     border: "none",
                     color: "white",
                     fontSize: "small",
                  }}
               >
                  BACK
               </Button>

               <div style={{ display: 'flex', gap: '10px' }}>
                  <Button
                     variant="filled"
                     color="secondary"
                     size="small"
                     onClick={clear}
                     style={{
                        background: "white",
                        borderRadius: "20px",
                        color: "#94ba20",
                        fontSize: "small",
                     }}
                  >
                     Clear
                  </Button>
                  <Button
                     className="buttonSubmit"
                     variant="outlined"
                     size="large"
                     type="submit"
                     style={{
                        background: "#94ba20",
                        borderRadius: "20px",
                        border: "none",
                        color: "white",
                        fontSize: "small",
                     }}
                  >
                     CREATE
                  </Button>
               </div>
            </div>

         </form>
      </Paper>
   );
};

export default AddProductForm;
