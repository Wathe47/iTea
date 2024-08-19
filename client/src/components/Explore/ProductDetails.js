import React from 'react';
import { Box, Typography, Divider, Grid, Rating, List, ListItem, ListItemText, LinearProgress } from '@mui/material';

const ProductOverview = () => {
   return (
      <Box padding={2} >
         <Typography variant="h6" fontWeight={'bold'} gutterBottom align='left'>
            Product details of Zesta - Premium Tea 95g - Foil Pack
         </Typography>

         <Grid container spacing={2} marginTop={2} marginLeft={4}>
            <Grid item xs={6}>
               <List dense>
                  <ListItem>
                     <ListItemText primary="• Traditional Tea all around our nation." />
                  </ListItem>
                  <ListItem>
                     <ListItemText primary="• The true taste of Sri Lankan tea." />
                  </ListItem>
               </List>
            </Grid>
            <Grid item xs={6}>
               <ListItem>
                  <ListItemText primary="• High Quality Tea." />
               </ListItem>
               <ListItem>
                  <ListItemText primary="• Handpicked pure Ceylon tea from high and medium grown plantations." />
               </ListItem>
            </Grid>
         </Grid>
         <Divider />

      </Box>
   );
};

const Specifications = () => {
   return (
      <Box padding={2} >
         <Typography variant="h6" fontWeight={'bold'} gutterBottom align='left'>
            Specifications of Zesta - Premium Tea 95g - Foil Pack
         </Typography>

         <Grid container spacing={2} marginTop={2}>
            <Grid item xs={6}>
               <Typography align='left' marginLeft={8}><strong>Brand:</strong> Zesta</Typography>
            </Grid>
            <Grid item xs={6}>
               <Typography align='left' marginLeft={8}><strong>SKU:</strong> 100541498_LK-1005992558</Typography>
            </Grid>
            <Grid item xs={12} marginTop={1} align='left' marginLeft={8}>
               <Typography><strong>What's in the box:</strong> Package includes 1x of Zesta - Premium Tea 95g - Foil Pack</Typography>
            </Grid>
         </Grid>
      </Box>
   );
};

const Ratings = () => {
   return (
      <Box padding={2}>
         <Typography variant="h6" fontWeight={'bold'} gutterBottom align='left'>
            Ratings & Reviews of Zesta - Premium Tea 95g - Foil Pack
         </Typography>

         <Grid container spacing={2} marginTop={2}>
            <Grid item xs={6} >
               <Grid container spacing={0} marginTop={2}>
                  <Grid item xs={12}>
                     <Typography variant="h3" component="span" fontWeight="bold" marginLeft={'-65%'}>
                        4.3
                     </Typography>
                     <Typography variant="h5" component="span" color="textSecondary" marginLeft={0.5}>
                        /5
                     </Typography>
                  </Grid>
                  <Grid item xs={12}>
                     <Box marginLeft={'-45%'}>
                        <Rating value={4.4} precision={0.1} readOnly size='large' sx={{ fontSize: '3rem' }} />
                     </Box>
                  </Grid>
                  <Grid item xs={12}>
                     <Typography variant="body1" color="textSecondary" marginLeft={'-65%'}>
                        245 Ratings
                     </Typography>
                  </Grid>
               </Grid>
            </Grid>
            <Grid item xs={6}>
               <Grid container spacing={1} marginLeft={'-35%'} marginTop={'1%'}>
                  <Grid item xs={12}>
                     <Box display="flex" alignItems="center">
                        <Rating value={5} precision={0.5} readOnly size="small" />
                        <Box width="50%" marginLeft={1} marginRight={1}>
                           <LinearProgress variant="determinate" value={85} sx={{
                              height: 8, 
                              backgroundColor: '#e0e0e0', 
                              '& .MuiLinearProgress-bar': {
                                 backgroundColor: 'orange', 
                              }
                           }} />
                        </Box>
                        <Typography marginLeft={'2%'}>203</Typography>
                     </Box>
                  </Grid>
                  <Grid item xs={12}>
                     <Box display="flex" alignItems="center">
                        <Rating value={4} precision={0.5} readOnly size="small" />
                        <Box width="50%" marginLeft={1} marginRight={1}>
                           <LinearProgress variant="determinate" value={10} sx={{
                              height: 8, 
                              backgroundColor: '#e0e0e0', 
                              '& .MuiLinearProgress-bar': {
                                 backgroundColor: 'orange', 
                              }
                           }} />
                        </Box>
                        <Typography marginLeft={'2%'}>23</Typography>
                     </Box>
                  </Grid>
                  <Grid item xs={12}>
                     <Box display="flex" alignItems="center">
                        <Rating value={3} precision={0.5} readOnly size="small" />
                        <Box width="50%" marginLeft={1} marginRight={1}>
                           <LinearProgress variant="determinate" value={0} sx={{
                              height: 8, 
                              backgroundColor: '#e0e0e0', 
                              '& .MuiLinearProgress-bar': {
                                 backgroundColor: 'orange', 
                              }
                           }} />
                        </Box>
                        <Typography marginLeft={'2%'}>0</Typography>
                     </Box>
                  </Grid>
                  <Grid item xs={12}>
                     <Box display="flex" alignItems="center">
                        <Rating value={2} precision={0.5} readOnly size="small" />
                        <Box width="50%" marginLeft={1} marginRight={1}>
                           <LinearProgress variant="determinate" value={3} sx={{
                              height: 8, 
                              backgroundColor: '#e0e0e0', 
                              '& .MuiLinearProgress-bar': {
                                 backgroundColor: 'orange', 
                              }
                           }} />
                        </Box>
                        <Typography marginLeft={'2%'}>10</Typography>
                     </Box>
                  </Grid>
                  <Grid item xs={12}>
                     <Box display="flex" alignItems="center">
                        <Rating value={1} precision={0.5} readOnly size="small" />
                        <Box width="50%" marginLeft={1} marginRight={1}>
                           <LinearProgress variant="determinate" value={2} sx={{
                              height: 8, 
                              backgroundColor: '#e0e0e0', 
                              '& .MuiLinearProgress-bar': {
                                 backgroundColor: 'orange', 
                              }
                           }} />
                        </Box>
                        <Typography marginLeft={'2%'}>6</Typography>
                     </Box>
                  </Grid>
               </Grid>
            </Grid>
         </Grid>

      </Box>
   );
};

const ProductDetails = () => {
   return (
      <>
         <Box maxWidth="80%" margin="auto" bgcolor="#ebebeb" borderRadius={1} boxShadow={2} padding={2}>
            <ProductOverview />
            <Specifications />
         </Box>
         <Box maxWidth="80%" margin="auto" bgcolor="#ebebeb" borderRadius={1} boxShadow={2} padding={2} marginTop="1%" marginBottom="10%">
            <Ratings />
         </Box>
      </>
   );
};

export default ProductDetails;
