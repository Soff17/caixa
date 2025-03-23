"use client";

import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";
import IBMBento from "@/components/IBMBento/IBMBento";

export default function Home() {
    return (
        <ThemeProvider theme={theme}>
              <IBMBento />
        </ThemeProvider>
    );
}
