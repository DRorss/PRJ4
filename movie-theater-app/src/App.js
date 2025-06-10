import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginComponent from "./containers/login/login";
import DashBoardComponent from "./containers/dashboard/dashboard";
import ForgotPasswordComponent from "./containers/forgotpassword/forgotpassword";
import InfoUserComponent from "./containers/info-user/info-user";
import HeaderComponent from "./containers/common/header";
import {AuthProvider} from "./containers/authen/authProvider";
const App = () => {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HeaderComponent />}>
            <Route index element={<DashBoardComponent />} />
            <Route path="/login" element={<LoginComponent />} />
            <Route path="/forgotPassword" element={<ForgotPasswordComponent />} />
            <Route path="/infoUser" element={<InfoUserComponent />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
