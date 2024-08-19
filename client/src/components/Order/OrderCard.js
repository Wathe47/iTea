import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import EditOrder from "./EditOrder"; // Import the EditOrder component
import { Box, Grid } from "@mui/material";


const OrderCard = ({
   id,
   productId,
   productName,
   imageUrl,
   unitPrice,
   customerEmail,
   totalPrice,
   quantity,
   cancelled,
   address,
   isUser,
}) => {

   const dispatch = useDispatch();
   const userData = useSelector((state) => state.auth.authData);
   const [isEditModalOpen, setEditModalOpen] = useState(false);

   const handleEditClick = () => {
      setEditModalOpen(true);
   };

   const [showDetails, setShowDetails] = useState(false);

   const handleToggleDetails = () => {
      setShowDetails(!showDetails);
   };

   return (
      <Card
         sx={{
            minWidth: "80%",
            padding: "10px 20px",
            textAlign: "left",
            marginLeft: "10%",
            marginBottom: "15px",
            background: '#ebebeb',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
            borderRadius: '10px',   
         }}
         elevation="0"
         borderRadius={5} boxShadow={6}
      >
         <CardContent>
            <Typography
               sx={{ fontSize: "24px", fontWeight: "600" }}
            >
               <span style={{ color: "grey", marginRight: '2%' }}>#{256078 + id}</span> {productName} - (PID - {productId})
            </Typography>

            <Box sx={{ width: '100%', height: '120px', marginTop: '-70px' }}>
               <Grid container spacing={2} justifyContent="center" alignItems="center"
                  sx={{ margin: "5% auto 1% auto ", width: '100%', padding: "2%" }}>
                  <Grid item xs={12} md={4} lg={2} sx={{}}>
                     <img
                        src={imageUrl}
                        alt={productName}
                        className="product-image"
                        style={{ width: "100px", height: "100px",borderRadius:'15px'}}
                     />
                  </Grid>

                  <Grid item xs={12} md={4} lg={2} sx={{}}>
                     <Grid container direction={'column'} justifyContent="flex-start" alignItems="center" >
                        <Grid item xs={12} md={4} lg={1} >
                           <Typography fontWeight={'bold'} variant="body1">Customer Email</Typography>
                        </Grid>
                        <Grid item xs={12} md={4} lg={1} >
                           <Typography variant="body1">{customerEmail}</Typography>
                        </Grid>
                     </Grid>
                  </Grid>
                  <Grid item xs={12} md={4} lg={2} sx={{}}>
                     <Grid container direction={'column'} justifyContent="flex-start" alignItems="center" >
                        <Grid item xs={12} md={4} lg={1} >
                           <Typography fontWeight={'bold'} variant="body1">Unit Price</Typography>
                        </Grid>
                        <Grid item xs={12} md={4} lg={1} >
                           <Typography variant="body1">{unitPrice}</Typography>
                        </Grid>
                     </Grid>
                  </Grid>
                  <Grid item xs={12} md={4} lg={2} sx={{}}>
                     <Grid container direction={'column'} justifyContent="flex-start" alignItems="center" >
                        <Grid item xs={12} md={4} lg={1} >
                           <Typography fontWeight={'bold'} variant="body1">Quantity</Typography>
                        </Grid>
                        <Grid item xs={12} md={4} lg={1} >
                           <Typography variant="body1">{quantity}</Typography>
                        </Grid>
                     </Grid>
                  </Grid>
                  <Grid item xs={12} md={4} lg={2} sx={{}}>
                     <Grid container direction={'column'} justifyContent="flex-start" alignItems="center" >
                        <Grid item xs={12} md={4} lg={1} >
                           <Typography fontWeight={'bold'} variant="body1">Total</Typography>
                        </Grid>
                        <Grid item xs={12} md={4} lg={1} >
                           <Typography variant="body1">{totalPrice}</Typography>
                        </Grid>
                     </Grid>
                  </Grid>
                  <Grid item xs={12} md={4} lg={2} sx={{}}>
                     {isUser && (
                        <Button 
                           onClick={handleEditClick}
                           style={{
                              background: "#000000",
                              color: "white",
                              fontSize: "10px",
                              marginRight: '5%'
                           }}
                        >
                           Edit
                        </Button>
                     )}
                     <Button
                        style={{
                           background: "#94ba20",
                           color: "white",
                           fontSize: "10px",
                        }}
                        onClick={handleToggleDetails}
                     >
                        Proceed
                     </Button>
                  </Grid>
               </Grid>
            </Box>
         </CardContent>
         <CardActions>



         </CardActions>


         {isEditModalOpen && (
            <EditOrder
               order={{
                  id,
                  productId,
                  productName,
                  unitPrice,
                  customerEmail,
                  totalPrice,
                  quantity,
                  oldQuantity: quantity,
               }}
               onClose={() => setEditModalOpen(false)}
            />
         )}
      </Card>
   );
};

export default OrderCard;