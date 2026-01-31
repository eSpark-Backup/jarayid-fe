import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./theme.js";
import store from "./store/index.js";
import App from "./App.jsx";
import "./language/i18n.js";
import { Auth0Provider } from "@auth0/auth0-react";
import { VITE_AUTH0_DOMAIN, VITE_CLIENT_ID } from "./config/index.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Auth0Provider
      domain={VITE_AUTH0_DOMAIN}
      clientId={VITE_CLIENT_ID}
      authorizationParams={{
        redirect_uri: `${window.location.origin}/signup`,
      }}
    >
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <BrowserRouter>
            <App />
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={true}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              transition:Bounce
            />
          </BrowserRouter>
        </Provider>
      </ThemeProvider>
    </Auth0Provider>
  </StrictMode>
);
