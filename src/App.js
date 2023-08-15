import React, { useState, useEffect } from "react";

import ThemeConfig from "./theme";
// hooks
import useAuth from "./hooks/useAuth";

// components
import ScrollToTop from "./components/ScrollToTop";
import LoadingScreen from "./components/LoadingScreen";
import NotistackProvider from "./components/NotistackProvider";
import ThemePrimaryColor from "./components/ThemePrimaryColor";
import Login from "./pages/authentication/Login";
import MainLayout from "./layouts/main";

// ----------------------------------------------------------------------

export default function App() {
  const { isInitialized, isAuthenticated } = useAuth();
  console.log(isInitialized);
  const [showLoader, setshowLoader] = useState(true);
  useEffect(() => {
   setTimeout(() => {
    setshowLoader(false)
   }, 3000);
  }, [])
  
  return (
    <ThemeConfig>
      <ThemePrimaryColor>
        <NotistackProvider>
          <ScrollToTop />
          {/* <LoadingScreen /> */}
          {!showLoader ? (
            isAuthenticated ? (
              <MainLayout></MainLayout>
            ) : (
              <Login />
            )
          ) : (
            <LoadingScreen />
          )}
        </NotistackProvider>
      </ThemePrimaryColor>
    </ThemeConfig>
  );
}
