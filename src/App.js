import "./App.css";
import { Route, Routes } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import NewPage from "./components/NewPage";
import Registration from "./RegistrationPage/Registration";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<LoginForm />} />
        <Route path="/dashboard" element={<NewPage/>} />
        <Route path="/register"   element={<Registration/>}/> 
      </Routes>
    </div>
  );
}

export default App;
