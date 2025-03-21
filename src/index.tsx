import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import {ThemeOptions} from '@mui/material/styles';
import {createTheme, ThemeProvider} from "@mui/material";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {BrowserRouter} from "react-router-dom";
import {ApplicationColors} from "./ApplicationColors";

export const themeOptions: ThemeOptions = {
    palette: {
        mode: 'dark',
        primary: {
            main: ApplicationColors.primary,
        },
        secondary: {
            main: ApplicationColors.secondary,
        },
    },
};
export const theme = createTheme(themeOptions);

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const queryClient = new QueryClient();
root.render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </ThemeProvider>
        </QueryClientProvider>
    </React.StrictMode>
);
