

// const ValidationComponent = {
//     validate: (email, password) => {
//       // Basic ValidationComponent, you can customize this as needed
//       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//       const isEmailValid = emailRegex.test(email);
//       const isPasswordValid = password.length >= 6;
  
//       return isEmailValid && isPasswordValid;
//     },
//   };
  
//   export default ValidationComponent;
  

const ValidationComponent = (data)=>{
  let error={}

  if(!data.name.trim()){
      error.name = "Name is required"
  }
  else if (data.name.length<5){
      error.name = "Name must be more than 5 character."
  }


      if(!data.password.trim()){
          error.password= "Password is required"
      }
   else if (data.password.length < 8 || !/[!@#$%^&*(),.?":{}|<>]/.test(data.password)) {
      error.password = "Password must be at least 8 characters long and contain at least one special character.";
    }




  return error;
}



export default ValidationComponent;