import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Wrapper from "./pages/wrapper";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/account/UpdatePassword";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<SignUp />} />
          <Route exact path="/login" element={<Login />} />
          <Route
            exact
            path="/dashboard"
            element={
              <Wrapper>
                <Dashboard />
              </Wrapper>
            }
          />
          <Route exact path="/forgot-password" element={<ForgotPassword />} />
          <Route
            exact
            path="account/update-password"
            element={<UpdatePassword />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
