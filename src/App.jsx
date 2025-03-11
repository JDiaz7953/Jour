import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Wrapper from "./pages/wrapper";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<SignUp />} />
          <Route exact path="login" element={<Login />} />
          <Route exact path="dashboard" element={
            <Wrapper>
              <Dashboard />
            </Wrapper>
            } />
        </Routes >
      </Router>
    </>
  );
}

export default App;
