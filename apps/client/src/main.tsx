import React from "react";
import ReactDOM from "react-dom/client";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { Router, RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./pages/root.tsx";
import Contact from "./pages/contact.tsx";
import "./index.css";
import Login from "./pages/auth/login.tsx";
import { PaletteOptions, ThemeProvider } from "@mui/material";
import { createTheme } from "./theme/index.ts";
import Regsiter from "./pages/auth/regsiter.tsx";
import Check from "./pages/check.tsx";

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache: new InMemoryCache(),
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "contacts/:contactId",
        element: <Contact />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Regsiter />,
  },
  {
    path: "/a",
    element: <Check />,
  },
]);

declare module "@mui/material/styles" {
  interface Palette {
    neutral50: string;
    neutral100: string;
    neutral200: string;
    neutral300: string;
    neutral400: string;
    neutral500: string;
    neutral600: string;
    neutral700: string;
    neutral800: string;
    neutral900: string;
  }
  interface PaletteOptions {
    neutral50: string;
    neutral100: string;
    neutral200: string;
    neutral300: string;
    neutral400: string;
    neutral900: string;
    neutral500: string;
    neutral600: string;
    neutral700: string;
    neutral800: string;
  }
}

declare module "@mui/material/Box" {
  interface BoxPropsColorOverrides {
    neutral50: true;
    neutral100: true;
    neutral200: true;
    neutral300: true;
    neutral400: true;
    neutral500: true;
    neutral600: true;
    neutral700: true;
    neutral800: true;

    neutral900: true;
  }
}
const theme = createTheme({
  colorPreset: "blue",
  contrast: "normal",
  direction: "ltr",
  paletteMode: "light",
  responsiveFontSizes: true,
});
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <RouterProvider router={router} />
      </ApolloProvider>
    </ThemeProvider>
  </React.StrictMode>
);
