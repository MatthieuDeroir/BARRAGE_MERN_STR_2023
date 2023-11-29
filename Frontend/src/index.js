import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CustomThemeProvider } from './context/ThemeModeContext';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
 
    <CustomThemeProvider>
        <App />
    </CustomThemeProvider>
);
