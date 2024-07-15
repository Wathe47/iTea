import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "@mui/material";
import { useAuthContext } from "@asgardeo/auth-react";
import "./styles.css";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import Loading from "../Loading/Loading";
import { fetchOrderBymanufacturerEmail } from "../../actions/order";
import OrderCard from "./OrderCard";

const SellerOrder = () => {
  const dispatch = useDispatch();

  const ordersData = useSelector((state) => state.order.orders);
  const {state} = useAuthContext();
   
  const userData = JSON.parse(window.localStorage.getItem("user"));

  useEffect(() => {
    console.log(userData?.email)
    dispatch(fetchOrderBymanufacturerEmail(userData?.email));
  }, []);
  
  if (!ordersData[0]) {
    return <Loading text={"No Orders Found!"} />;
  }
  if (!state?.isAuthenticated) {
    return (
      <div>
        <Loading />
        <div
          style={{
            marginTop: "20px",
            fontSize: "30px",
            fontFamily: "playlist",
            color: "green",
          }}
        >
          Sign In First!
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        marginTop: "80px",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img
        src="https://png.pngtree.com/thumb_back/fh260/background/20230518/pngtree-the-candy-shop-at-gordon-s-wizarding-world-image_2536653.jpg"
        alt="background"
        className="product--background"
      />
      <div style={{ marginTop: "100px" }}>
        <Grid container spacing={2}>
          <Grid
            item
            xs={11}
            container
          >
            {ordersData.map((order) => (
              <Grid item xs={12}>
                <OrderCard
                  id={order.id}
                  userName={userData.username}
                  userId={userData.userid}
                  productId={order.productId}
                  productName={order.productName}
                  customerEmail={order.customerEmail}
                  unitPrice={order.unitPrice}
                  totalPrice={order.totalPrice}
                  quantity={order.quantity}
                  userRole={userData.applicationRoles}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default SellerOrder;
