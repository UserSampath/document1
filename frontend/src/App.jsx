import "./app.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./pages/AdminSignIn/SignIn";
import UserManagement from "./pages/userManagement/UserManagement";
import "bootstrap/dist/css/bootstrap.min.css";
;
import Products from "./pages/Products/Products";
import Orders from "./pages/orders/Orders";
import DiscountChallanges from "./pages/DiscountChallanges/DiscountChallanges";
import Settings from "./pages/settings/Settings";
import { AuthProvider } from "./utils/AuthContext";
import UserSignIn from "./pages/userSignIn/UserSignIn";
import UserSignUp from "./pages/userSignUp/UserSignUp";
import Document from "./pages/Document/Document";
import SendInvitaion from "./pages/Invitation/SendInvitaion";
import DocumentNotFound from "./pages/DocumentNotFound/DocumentNotFound";
import UploadDocument from "./pages/UploadDoc/UploadDocument";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/adminlogin" element={<SignIn />}></Route>
          <Route path="/document/:userId" element={<Document />}></Route>
          <Route path="/userlogin" element={<UserSignIn />}></Route>
          <Route path="/usersignup" element={<UserSignUp />}></Route>
          <Route path="/UploadDocument" element={<UploadDocument />}></Route>
          <Route path="/sendInvitaion" element={<SendInvitaion />}></Route>
          <Route
            path="/documentNotFound"
            element={<DocumentNotFound />}></Route>

          {/* <Route path="products" element={<Products />}></Route> */}
          <Route path="/" element={<UserManagement />}></Route>
          {/* <Route path="/orders" element={<Orders />}></Route> */}
          <Route
            path="/DiscountChallanges"
            element={<DiscountChallanges />}></Route>
          <Route path="/Settings" element={<Settings />}></Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
