import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Add from "./Components/Add_Page/Add";
import Update from "./Components/Update_Page/Update";
import Profile from "./Components/Profile_Page/Profile";
import Notfound404 from "./Components/404 Not Found/NotFound404";
import Footer from "./Components/Footer/Footer";
import Signup from "./Components/SignupPage/Signup";
import Login from "./Components/SignupPage/Login";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import Products from "./Components/Product_Page/Products";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route exact path="/" element={<Products />} />
          <Route exact path="/add" element={<Add />} />
          <Route exact path="/update/:id" element={<Update />} />
          <Route exact path="/profile" element={<Profile />} />
        </Route>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="*" element={<Notfound404 />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
