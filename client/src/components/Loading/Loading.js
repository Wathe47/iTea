import React from "react";
import { Container, Grow, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

import "./styles.css";

const Loading = ({text}) => {
  return (
    <Grow in>
      <Container
        fullWidth
        style={{
          marginTop: "200px",
          alignItems: "center",
          justifyContent: "center",
          justifyItems: "center",
        }}
        className="loading-background"
      >
        <div>
          <img
            src="https://res.cloudinary.com/dl8dikngu/image/upload/v1716957275/Screenshot_from_2024-05-29_10-01-25_bxhh5i.png"
            alt="Loading"
            width="40%"
          />
        </div>
        <div style={{marginTop:'60px'}}>
          <Typography variant="h2">{text}</Typography>
        </div>
      </Container>
    </Grow>
  );
};

export default Loading;



