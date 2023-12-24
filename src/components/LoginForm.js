import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Input,
  InputLabel,
  Link,
 // TextField,
  Typography,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [error, setError] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(
    localStorage.getItem("rememberMe") === "true"
  );
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setData((prevData) => ({
      ...prevData,
      email: e.target.value,
    }));
  };

  const handlePasswordChange = (e) => {
    setData((prevData) => ({
      ...prevData,
      password: e.target.value,
    }));
  };

  const handleLogin = (event) => {
    event.preventDefault();

    const newError = {};

    if (!data.email.trim()) {
      newError.email = "Email is required";
    }

    const emailRegex =/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      // /^(?=.*[A-Z0-9._%+-])(?=.*[@])[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!data.email.trim()) {
      newError.email = "Email is required";
    } else if (!emailRegex.test(data.email)) {
      newError.email = "Invalid email address";
    }

    if (!data.password.trim()) {
      newError.password = "Password is required";
    } else if (
      data.password.length < 8 ||
      !/[!@#$%^&*(),.?":{}|<>]/.test(data.password)
    ) {
      newError.password =
        "Password must be at least 8 characters long and contain at least one special character.";
    }

    if (Object.keys(newError).length > 0) {
      setError(newError);

      setTimeout(() => {
        setError({});
      }, 3000);
      return;
    }

    console.log("Email:", data.email);
    console.log("Password:", data.password);

    navigate("/dashboard");
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleRememberMeChange = () => {
    const newValue = !rememberMe;
    setRememberMe(newValue);
  };

  useEffect(() => {
    localStorage.setItem("rememberMe", String(rememberMe));
    console.log(rememberMe);
  }, [rememberMe]);
  return (
    <div>
      <div className="split-screen">
        <div className="left-panel">
          <img
            src="https://t4.ftcdn.net/jpg/04/60/71/01/360_F_460710131_YkD6NsivdyYsHupNvO3Y8MPEwxTAhORh.jpg"
            alt=""
            className="background-image"
          />
        </div>
        <div className="right-panel">
          <div className="loginForm">
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "30ch" },
              }}
              noValidate
              autoComplete="off"
              onSubmit={handleLogin}
            >
              <div>
                <Typography
                  variant="body1"
                  style={{ textDecoration: "underline", color:'blueviolet'}}
                >
                 <h3> LOGIN</h3>
                </Typography>
              </div>
              <div>
              <FormControl sx={{ m: 1, width: "30ch" }} variant="standard">
              <InputLabel htmlFor="standard-adornment-password">
                    Email
                  </InputLabel>
                  <Input
                    id="standard-adornment-email"
                    type="email"
                    placeholder="yourname@email.com"
                    onChange={handleEmailChange}
                    name="email"
                    style={{ backgroundColor: 'white' }}
                    />
               
                </FormControl>
                  {error.email && <div className="error">{error.email}</div>}
              
              </div>
              <div>
                <FormControl sx={{ m: 1, width: "30ch" }} variant="standard">
                  <InputLabel htmlFor="standard-adornment-password">
                    password
                  </InputLabel>
                  <Input
                    id="standard-adornment-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password@123"
                    onChange={handlePasswordChange}
                    name="password"
                    style={{ backgroundColor: 'white' }}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleTogglePasswordVisibility}
                          onMouseDown={(e) => e.preventDefault()}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                 
                    {error.password && (
                      <div className="password">{error.password}</div>
                    )} 
                    
                </FormControl>
              </div>
              <div className="form-control">
                <FormControlLabel
                  required
                  control={<Checkbox style={{ color: 'white' }} />}
                  label="Remember me"
                  onChange={handleRememberMeChange}
                />
              </div>
              <div>
                <Button variant="contained" size="medium" type="submit">
                  LOGIN
                </Button>
              </div>
              <div>
                <p>
                  Don't have an account?
                  <Link
                    component="button"
                    variant="body1"
                    onClick={() => {
                      navigate("/register");
                    }}
                  >
                    Register here
                  </Link>
                </p>
              </div>
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
