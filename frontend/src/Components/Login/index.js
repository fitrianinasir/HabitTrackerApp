import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "./index.css";

function index(props) {
  return (
    <div>
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="xl">
          <div className="login-img-shadow"></div>
          <div className="login-img"></div>
          <div className="login-body">
            <h1 className="font-pacifico">LOGIN</h1>
            <TextField
              id="email"
              label="Email"
              variant="standard"
              sx={{ width: "90%" }}
            />
            <TextField
              id="password"
              label="Password"
              type="password"
              variant="standard"
              sx={{ width: "90%" }}
              style={{ marginTop: "-3rem" }}
            />
            <Button variant="contained" size="medium" className="login-button">
              LOGIN
            </Button>
            <Typography variant="overline" display="block" gutterBottom className="login-caption">
              Don't have an account? <a href="/" className="text-decoration-none">Register</a>
            </Typography>
          </div>
        </Container>
      </React.Fragment>
    </div>
  );
}

export default index;
