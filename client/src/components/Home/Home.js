import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../actions/product";
import styled from "@mui/system/styled";
import { Link } from "react-router-dom";
import "./style.css";
import Loading from "../Loading/Loading";
import { useAuthContext } from "@asgardeo/auth-react";

import { Button, Container, Card, CardContent, CardMedia, Typography, Grid, Pagination, Box, RadioGroup, FormControl, FormLabel, Paper, FormControlLabel, BottomNavigation, BottomNavigationAction } from "@mui/material";
import ShoppingCart from "@mui/icons-material/ShoppingCart";


const Home = () => {
   const dispatch = useDispatch();
   const products = useSelector((state) => state.products);
   const { state, getBasicUserInfo } = useAuthContext();
   const [userDetails, setUserDetails] = useState(null);
   const [currentPage, setCurrentPage] = useState(1);
   const itemsPerPage = 16; 
 
 
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

   const teaProducts = [
      {
         id: 1,
         title: "Green Tea Bliss",
         description: "Experience the serene flavor of our premium Green Tea Bliss. Rich in antioxidants, this tea promotes health and wellness with every sip.",
         imageUrl: "https://bizenglish.adaderana.lk/wp-content/uploads/Pluckers-at-a-tea-estate1-1.jpg"
      },
      {
         id: 2,
         title: "Chamomile Calm",
         description: "Unwind with our Chamomile Calm tea. Known for its soothing properties, this tea is perfect for relaxing after a long day.",
         imageUrl: "https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fill,g_auto,w_1500,ar_3:2/cs%2F2022%2FAT%2FYogi%20Tea%2FSC%20Workshop%2FStocksy_txpc79ae61fqZL300_Medium_798998"
      },
      {
         id: 3,
         title: "Earl Grey Elegance",
         description: "Indulge in the classic taste of our Earl Grey Elegance. Infused with bergamot, this tea offers a refreshing and aromatic experience.",
         imageUrl: "https://www.ethicaltrade.org/sites/default/files/styles/letterbox_full_bp_med_1x/public/images/tea%20field%201.jpg?itok=1VIlKzH8"
      }
   ];


   useEffect(() => {
      if (state?.isAuthenticated) {
         getBasicUserInfo()
            .then((response) => {
               setUserDetails(response);
            })
            .catch((error) => {
               console.error("Failed to load response " + error);
            })
      }
   }, [state]);

   useEffect(() => {
      dispatch(fetchProducts());
   }, [dispatch]);

   const welcomeNote = userDetails?.givenName ? (
      <Typography variant="h4" gutterBottom style={{ marginBottom: "10%", marginTop: "20%", fontFamily: "poppins", fontSize: '60px', fontWeight: "bold", textShadow: "4px 4px 25px grey" }}>
         Welcome back, <span style={{ fontSize: "60px" }}> {userDetails.givenName}! </span>
      </Typography>
   ) : (
      <Typography variant="h4" gutterBottom style={{ marginBottom: "10%", marginTop: "20%", fontFamily: "poppins", fontSize: '60px', fontWeight: "bold", textShadow: "4px 4px 25px grey" }}>
         Welcome to <span style={{ fontSize: "100px" }}> iTEA </span>
      </Typography>
   )

   return (
      <div>
         <div style={{ backgroundImage: `url('https://res.cloudinary.com/dl8dikngu/image/upload/v1716977653/macro-photograph-of-a-tea-cup-filled-with-steeping-tea-tendrils-of-mist-rising-from-the-surface-te_skqcwx.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <Container maxWidth="xl" style={{ minHeight: '100vh', display: 'flex', alignItems: 'left', justifyContent: 'space-between' }}>

               <div style={{ width: "40%", marginLeft: "-130px" }}>
                  <div style={{ marginLeft: '50px' }}>

                  </div>{welcomeNote}<div >
                     <Typography variant="body1" paragraph style={{ marginBottom: "5%", fontFamily: "poppins", fontSize: "20px", fontWeight: "400", marginLeft: "50px" }}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel metus quis velit bibendum tristique vel nec arcu. Integer volutpat tellus quis orci consequat, ac aliquam nunc ultrices.
                     </Typography>
                     <Link to="/explore" style={{ textDecoration: "none" }}>
                        <Button variant="contained" style={{ backgroundColor: "#94ba20", color: "white", fontWeight: "600", fontSize: "16px", borderRadius: "10px", padding: "10px 30px", marginLeft: "50px", marginTop: "50px" }}>
                           Explore
                        </Button>
                     </Link>
                  </div>
               </div>
            </Container>
         </div>


         <Box sx={{ flexGrow: 1, padding: '20px', width: '80%', margin: '100px auto' }}>
            <Grid container direction='row' justifyContent="space-around" alignItems='center' sx={{ marginLeft: '80px' }}>
               {teaProducts.map((product) => (
                  <Grid key={product.id} item xs={12} sm={6} md={4}>
                     <Card sx={{ maxWidth: 345, boxShadow: 3, borderRadius: '15px' }} >
                        <CardMedia
                           component="img"
                           height="140"
                           image={product.imageUrl}
                           alt={product.title}
                        />
                        <CardContent>
                           <Typography gutterBottom variant="h5" component="div">
                              {product.title}
                           </Typography>
                           <Typography variant="body2" color="text.secondary">
                              {product.description}
                           </Typography>
                        </CardContent>
                        <Link style={{ textDecoration: 'none', marginBottom: '20px' }}>
                           <Button variant="contained" size="small" style={{ backgroundColor: "#94ba20", color: "white", fontWeight: "600", fontSize: "13px", borderRadius: "10px", padding: "5px 20px", margin: "15px 0px" }}>
                              Read More
                           </Button>
                        </Link>
                     </Card>
                  </Grid>
               ))}
            </Grid>
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
                        icon={<ShoppingCart />}
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



