import React from "react";
import { Container, Grow } from "@mui/material";
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
            src="https://res.cloudinary.com/dl8dikngu/image/upload/v1707476098/ziltkvevsqnizaeizkp4.png"
            alt="Loading"
            width="20%"
          />
        </div>
        <div>
          <h1>{text}</h1>
        </div>
      </Container>
    </Grow>
  );
};

export default Loading;



