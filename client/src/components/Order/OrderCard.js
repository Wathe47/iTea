import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import EditOrder from "./EditOrder"; // Import the EditOrder component


const OrderCard = ({
  id,
  productId,
  productName,
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
        background: cancelled
          ? "rgba(255, 214, 214, 0.8)"
          : "rgba(255,255,255, 0.8)",
      }}
      elevation="0"
    >
      <CardContent>
        <Typography
          sx={{ fontSize: "50px", fontWeight: "600", marginBottom: "10px" }}
        >
          <span style={{ color: "grey" }}>#{id}</span> • {productName}
        </Typography>

        <div style={{ display: "flex" }}>
          <div>
          <Typography sx={{ mb: 0.5 }} color="text.secondary">
              Product ID: {productId}
            </Typography>
            <Typography
              variant="body2"
              style={{ fontWeight: "500", color: "grey" }}
            >
              Customer Email: {customerEmail} <br />
            </Typography>

            <Typography variant="body2">
              Unit Price: LKR {unitPrice}.00 | Quantity: {quantity}
              <br />
              <span style={{ fontWeight: "500", fontSize: "20px" }}>
                Total Price: LKR {totalPrice}.00
              </span>
              <br />
              Delivery Address: {address} <br />
            </Typography>
            <Button
              style={{
                background: "#94ba20",
                color: "white",
                fontSize: "10px",
                marginTop: "10px",
              }}
              onClick={handleToggleDetails}
            >
              MORE
            </Button>
          </div>
          <div
            style={{
              marginLeft: "20%",
              display: showDetails ? "flex" : "none",
            }}
          >

          </div>
        </div>
      </CardContent>
      <CardActions>

        {isUser&&  (
          <Button size="small" onClick={handleEditClick} style={{marginLeft:"5px", marginTop:"-15px"}} >
            Edit
          </Button>
        )}
  
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