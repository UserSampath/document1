import "./app.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./pages/AdminSignIn/SignIn";
import UserManagement from "./pages/userManagement/UserManagement";
import "bootstrap/dist/css/bootstrap.min.css";
import Settings from "./pages/settings/Settings";
import { AuthProvider } from "./utils/AuthContext";
import Document from "./pages/Document/Document";
import UserDocuments from "./pages/UserDocuments/UserDocuments"
import SendInvitaion from "./pages/Invitation/SendInvitaion";
import DocumentNotFound from "./pages/DocumentNotFound/DocumentNotFound";
import UploadDocument from "./pages/UploadDoc/UploadDocument";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<SignIn />}></Route>
          <Route path="/document/:userId/:documentId" element={<Document />}></Route>
          <Route
            path="/userDocuments/:userId"
            element={<UserDocuments />}></Route>

          <Route path="/UploadDocument" element={<UploadDocument />}></Route>
          <Route path="/" element={<SendInvitaion />}></Route>
          <Route path="/Settings" element={<Settings />}></Route>
          <Route path="/AcceptedUsers" element={<UserManagement />}></Route>

          <Route
            path="/documentNotFound"
            element={<DocumentNotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
