import React from "react";
// mock api
import "./_apis_";

// scroll bar
import "simplebar/src/simplebar.css";

// lightbox
import "react-image-lightbox/style.css";

// editor
import "react-quill/dist/quill.snow.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

// slick-carousel
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

// material
import AdapterDateFns from "@material-ui/lab/AdapterDateFns";
import LocalizationProvider from "@material-ui/lab/LocalizationProvider";
// contexts
import { QueryClientProvider, QueryClient } from "react-query";
import { SettingsProvider } from "./contexts/SettingsContext";
// components
import LoadingScreen from "./components/LoadingScreen";

import { AuthProvider } from "./contexts/JWTContext";

//
import App from "./App";

// ----------------------------------------------------------------------
const queryClient = new QueryClient();
ReactDOM.render(
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <SettingsProvider>

            <BrowserRouter>
              <AuthProvider>
                <App />
              </AuthProvider>
            </BrowserRouter>

        </SettingsProvider>
      </LocalizationProvider>
    </QueryClientProvider>
  </HelmetProvider>,
  document.getElementById("root")
);
