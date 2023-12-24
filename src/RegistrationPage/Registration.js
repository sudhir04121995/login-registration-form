import React, { useEffect, useState } from "react";
import "./Registration.css";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  Link,
  FormHelperText,
  InputAdornment,
  IconButton,
 
 
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Registration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    password: "",
    confirmPassword: "",
  });
  const [countries, setCountries] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState({});

  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [errorDob, setErrorDob] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  
  const handleDobChange = (event) => {
    const date = event.target.value;
    setDob(date);
    setError({ ...error, dob: '' });
    console.log('Date of Birth:', date);
  };

  const validateDob = () => {
    if (!dob) {
      setErrorDob('Date of Birth is required');
      return false;
    }
    
    return true;
  };

  const handleChange = (field) => (event) => {
    const value=event.target.value;
    setFormData({ ...formData, [field]: value });
    setError({ ...error, [field]: "" }); 
    console.log(`${field}:`, value);
  };

  const handleGenderChange = (event) => {
   const selectedGender=event.target.value
    setGender(selectedGender);
    setError({ gender: '' });
    console.log(handleChange)
    console.log('Gender:', selectedGender);
  };


  const validateForm = () => {
    let newErrors = {};
  
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
  
   
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
  
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      newErrors.email = "Enter a valid email address";
    }
  
    
    const mobileRegex = /^[0-9]{10}$/;
    if (!formData.mobileNumber.trim() || !mobileRegex.test(formData.mobileNumber.trim())) {
      newErrors.mobileNumber = "Enter a valid 10-digit mobile number";
    }
  
   
 

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    } else if (!/[A-Z]/.test(formData.password)) {
      newErrors.password = "Password must contain at least one uppercase letter";
    } else if (!/[a-z]/.test(formData.password)) {
      newErrors.password = "Password must contain at least one lowercase letter";
    } else if (!/\d/.test(formData.password)) {
      newErrors.password = "Password must contain at least one number";
    } else if (!/[@#$%^&*!]/.test(formData.password)) {
      newErrors.password = "Password must contain at least one special character";
    }
  
    
    
    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Confirm Password is required";
    } else if (formData.password.trim() !== formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Passwords do not match";
    }
  
    setError(newErrors);
    return Object.keys(newErrors).length === 0; 
  };
  
  const handleValidation = () => {
    if (!gender) {
      setError({gender:'Please select a gender.'});
      return false;
    }
    return true;
  };

  const maxFileSize = 5 * 1024 * 1024; 

  const handleFileChange = (event) => {
    const file = event.target.files[0];

   
    if (!file) {
      setError({file:'Please select a file.'});
      return;
    }

    
    if (!file.type.startsWith('image/')) {
      setError({file:'Invalid file type. Please select an image.'});
    
      return;
    }

    
    if (file.size > maxFileSize) {
      setError({file:'File size exceeds the limit (5 MB). Please choose a smaller file.'});
      return;
    }

    
    setError({});
    setSelectedFile(file);
    console.log('Selected File:', file);
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
   
  //   if (!handleValidation() && validateForm() && selectedNationality && validateDob()) {
  //     console.log('Form Submitted Successfully!');
  //     return;
      
  //   }

   
  //   if (!selectedNationality) {
  //     setError({ nationality:'Please select a nationality.' });
      
  //     return;
  //   }
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!handleValidation()) {
      console.log('Validation failed');
    }
  
    if (!validateForm()) {
      console.log('Form validation failed');
    }
  
    if (!selectedNationality) {
      console.log('Nationality not selected');
    }
  
    if (!validateDob()) {
      console.log('Date of Birth validation failed');
    }
    console.log('Form Data:', formData);
    console.log('Selected Nationality:', selectedNationality);
    console.log('Gender:', gender);
    console.log('Date of Birth:', dob);
    console.log('Selected File:', selectedFile);
  
    // Continue with your existing conditions
    if (!handleValidation() && validateForm() && selectedNationality && validateDob()) {
      console.log('Form Submitted Successfully!');
      return;
    }
  
    if (!selectedNationality) {
      setError({ nationality: 'Please select a nationality.' });
      return;
    }
  };
  

  useEffect(() => {
    
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        setCountries(data); 
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  },[]);


  const [selectedNationality, setSelectedNationality] = useState(null);

  const handleNationalityChange = (_, newValue) => {
   
    setSelectedNationality(newValue);
    setError('');
    console.log('Nationality:', newValue);
  };
  
  
 

  return (
    
    <div className="margin">
      <Box
        component="form"
        onSubmit={handleSubmit}
        
        sx={{
          "& .MuiTextField-root": { m: 2, width: "45ch" },
        }}
      >
        <div>
          <Typography
            variant="body1"
            style={{ textDecoration: "underline", color: "blue" }}
          >
            <h1>REGISTRATION</h1>
          </Typography>
        </div>
        <div>
  <TextField
    margin="normal"
    required
    fullWidth
    placeholder="Enter Your First Name"
    label="First Name"
    name="firstName"
    value={formData.firstName}
    onChange={handleChange("firstName")}
  />
   {error.firstName && (
            <Typography variant="body2" color="error" className="error">
              {error.firstName}
            </Typography>
          )}
  <TextField
    margin="normal"
    required
    fullWidth
    placeholder="Enter Your Last Name"
    label="Last Name"
    name="lastName"
    value={formData.lastName}
    onChange={handleChange("lastName")}
  />
  {error.lastName && (
            <Typography variant="body2" color="error" className="error">
              {error.lastName}
            </Typography>
          )}
 
</div>

          
        <div>
            
        <TextField
  margin="normal"
  required
  fullWidth
  label="Email Address"
  placeholder="yourname@email.com"
  name="email"
  type="email"
  value={formData.email}
  onChange={handleChange("email")} 
/>

{error.email && (
            <Typography variant="body2" color="error" className="error">
              {error.email}
            </Typography>
          )}

     
             
<div>
  <TextField
    margin="normal"
    required
    fullWidth
    placeholder="Enter Your Mobile Number"
    label="Mobile Number"
    name="mobileNumber"
    type="tel"
    value={formData.mobileNumber}
    onChange={handleChange("mobileNumber")}
  />
  {error.mobileNumber && (
            <Typography variant="body2" color="error" className="error">
              {error.mobileNumber}
            </Typography>
          )}
</div>

<div>
  <TextField
    margin="normal"
    required
    fullWidth
    label="Password"
    name="password"
    placeholder="Password@123"
    type={showPassword ? 'text' : 'password'}
    value={formData.password}
    onChange={handleChange("password")}
    InputProps={{
      endAdornment: (
        <InputAdornment position="end">
          <IconButton onClick={handleTogglePasswordVisibility} edge="end">
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </InputAdornment>
      ),
    }}
  />
  {error.password && (
            <Typography variant="body2" color="error" className="error">
              {error.password}
            </Typography>
          )}

  <TextField
    margin="normal"
    required
    fullWidth
    label="confirm-Password"
    placeholder="Password@123"
    name="confirmPassword"
    type="password"
    value={formData.confirmPassword}
    onChange={handleChange("confirmPassword")}
  />
  {error.confirmPassword && (
            <Typography variant="body2" color="error" className="error">
              {error.confirmPassword}
            </Typography>
          )}
</div>

</div>
<div className="two-inputs">
  <Autocomplete
    options={countries}
    getOptionLabel={(option) => option.name.common}
    onChange={handleNationalityChange}
    renderInput={(params) => (
      <>
        <TextField
          {...params}
          label="Nationality"
          name="nationality"
          value={params.inputProps.value}
          variant="outlined"
          sx={{ width: '35ch' }}
          required
        />
      </>
    )}
  />
{error.nationality && (
            <Typography variant="body2" color="error" className="error">
              {error.nationality}
            </Typography>
          )}
  <div>
  <TextField
              fullWidth
              label="Date of Birth"
              type="date"
              variant="outlined"
              name="dob"
              required
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                style: { paddingRight: '10px' },
              }}
              value={dob}
              onChange={handleDobChange}
            />
            {errorDob && (
              <Typography variant="body2" color="error" className="error">
                {errorDob}
              </Typography>
            )}
  </div>
  
</div>


        <div>
          
        <Grid item xs={12}>
  <FormControl component="fieldset" error={Boolean(error)}>
    <FormLabel component="legend">Gender</FormLabel>
    <RadioGroup row value={gender} onChange={handleGenderChange}>
      <FormControlLabel value="male" control={<Radio />} label="Male" />
      <FormControlLabel value="female" control={<Radio />} label="Female" />
      <FormControlLabel value="other" control={<Radio />} label="Other" />
    </RadioGroup>
  </FormControl>
  <FormHelperText>{error.gender}</FormHelperText>
</Grid>


        </div>
        <div>
         <Grid container item xs={12} alignItems="center" justifyContent="center">
      <input
        type="file"
        accept="image/*" 
        //style={{ display: 'none' }}
        onChange={handleFileChange}
        id="file-upload-input"
       
      />
      <label htmlFor="file-upload-input">
        <Button
          variant="outlined"
          component="span"
          startIcon={<CloudUploadIcon />}
          
        >
          Upload Image
        </Button>
      </label>
      
       {selectedFile && (
        <Typography variant="body2" color="textSecondary" style={{ marginLeft: '10px' }}>
          {selectedFile.name}
        </Typography>
      )}
  
    {error.file && (
  <Typography variant="body2" color="error" style={{ marginLeft: '10px' }}>
    {error.file}
  </Typography>
)} 
  </Grid> 


          <br />

          <Button 
          type="submit"
           variant="contained"
          size="medium"
          color="primary"
          className="register"
          // disabled={!handleValidation() || !validateForm() || !selectedNationality || !validateDob()}
          >
            Register
          </Button>
        </div>
        
        <div>
          <p>
            already have an account?
            <Link
              component="button"
              variant="body1"
              onClick={() => {
                navigate("/");
              }}
            >
              login here
            </Link>
          </p>
        </div>
      </Box>
    </div>
    
  );
};

export default Registration;




