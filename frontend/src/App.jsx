import "./app.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./pages/AdminSignIn/SignIn";
import UserManagement from "./pages/userManagement/UserManagement";
import "bootstrap/dist/css/bootstrap.min.css";
import Products from "./pages/Products/Products";
import Orders from "./pages/orders/Orders";
import DiscountChallanges from "./pages/DiscountChallanges/DiscountChallanges";
import Settings from "./pages/settings/Settings";
import { AuthProvider } from "./utils/AuthContext";
import UserSignIn from "./pages/userSignIn/UserSignIn";
import UserSignUp from "./pages/userSignUp/UserSignUp";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/adminlogin" element={<SignIn />}></Route>
          <Route path="/userlogin" element={<UserSignIn />}></Route>
          <Route path="/usersignup" element={<UserSignUp />}></Route>


          {/* <Route path="products" element={<Products />}></Route> */}
          <Route path="/" element={<UserManagement />}></Route>
          {/* <Route path="/orders" element={<Orders />}></Route> */}
          <Route path="/DiscountChallanges" element={<DiscountChallanges />}></Route>
          <Route path="/Settings" element={<Settings />}></Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
