import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {CssBaseline} from "@mui/material";
import {SnackbarProvider} from "notistack";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <SnackbarProvider />
      <CssBaseline />
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
