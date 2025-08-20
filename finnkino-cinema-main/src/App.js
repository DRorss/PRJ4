import { Suspense } from "react";

import { BrowserRouter as Router } from "react-router-dom";
import Routes from "@/routes";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

import PageLoader from "./components/PageLoader";

import { NotificationProvider } from "./components/Notification";
const App = () => (
  <NotificationProvider>
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Suspense fallback={<PageLoader />}>
        <Router>
          <Routes />
        </Router>
      </Suspense>
    </LocalizationProvider>
  </NotificationProvider>
);

export default App;
