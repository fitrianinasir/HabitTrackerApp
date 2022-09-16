import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { register } from "../../action/userAction";
import "./index.css";
import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

function Register(props) {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "", email: "", password: "" });



  const submitData = async() => {
    dispatch(register(user, () =>{
      navigate('/login')
    }))
  };

  return (
    <div>
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="xl">
          <div className="img-container">
            <div className="login-img-shadow"></div>
            <div className="login-img"></div>
          </div>
          <div className="login-body">
            <h6 className="text-start ms-3 mt-5 app-title">
              HABIT TRACKER APP
            </h6>
            <h3 className="text-start ms-3 mb-4">Register Here</h3>
            <TextField
              id="name"
              label="Name"
              variant="standard"
              sx={{ width: "90%" }}
              InputLabelProps={{ style: { fontSize: 12 } }}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
            <TextField
              id="email"
              label="Email"
              variant="standard"
              sx={{ width: "90%" }}
              style={{ marginTop: "-4rem" }}
              InputLabelProps={{ style: { fontSize: 12 } }}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            <TextField
              id="password"
              label="Password"
              type="password"
              variant="standard"
              sx={{ width: "90%" }}
              style={{ marginTop: "-8rem" }}
              InputLabelProps={{ style: { fontSize: 12 } }}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
            <Button
              variant="contained"
              size="medium"
              className="register-button"
              onClick={() => submitData()}
            >
              Register
            </Button>
            <Typography
              variant="overline"
              display="block"
              gutterBottom
              className="register-caption"
            >
              Already have an account?{" "}
              <a href="/login" className="text-decoration-none">
                Login
              </a>
            </Typography>
            <span className="text-center text-secondary d-block author-caption">
              By
              <a
                href="https://www.linkedin.com/in/fitrianinsr/"
                target="blank"
                className="text-decoration-none ms-1"
              >
                Fitriani Nasir
              </a>
            </span>
          </div>
        </Container>
      </React.Fragment>
    </div>
  );
}

export default Register;
