"use client";

import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";
import IBMBentoDEMO from "@/components/IBMBento/IBMBentoDEMO";

export default function Home() {
    return (
        <ThemeProvider theme={theme}>
              <IBMBentoDEMO />
        </ThemeProvider>
    );
}
