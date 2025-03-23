"use client";

import React from "react";
import {
    Box,
    Container,
    Grid,
    Typography,
    Link as MuiLink,
    IconButton,
} from "@mui/material";
import { motion } from "framer-motion";
// Example icons (use your own or from @mui/icons-material)
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";

const Footer: React.FC = () => {
    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: "secondary.main",
                color: "#fff",
                pt: 6,
                pb: 4,
                mt: 6,
            }}
        >
            <Container>
                <Grid container spacing={4}>
                    {/* Logo + Hours */}
                    <Grid item xs={12} md={4}>
                        <Box sx={{ mb: 2 }}>
                            {/* Replace with your logo image if needed */}
                            <Typography
                                variant="h5"
                                component={motion.div}
                                initial={{ opacity: 0, y: -10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                sx={{ fontWeight: 700 }}
                            >
                                Psique & Ser
                            </Typography>
                        </Box>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                            Lunes a Viernes: 9:00 - 21:00
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                            Sábado: 9:00 - 14:00
                        </Typography>
                        <Typography variant="body2">
                            Estamos para escucharte
                        </Typography>
                    </Grid>

                    {/* Navigation */}
                    <Grid item xs={6} md={3}>
                        <Typography variant="overline" sx={{ display: "block", mb: 2 }}>
                            Navega
                        </Typography>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                            <MuiLink href="/" color="inherit" underline="none">
                                Inicio
                            </MuiLink>
                            <MuiLink href="/nosotros" color="inherit" underline="none">
                                Nosotros
                            </MuiLink>
                            <MuiLink href="/red-clinica" color="inherit" underline="none">
                                Red Clínica
                            </MuiLink>
                            <MuiLink href="/espacio-psicoeducativo" color="inherit" underline="none">
                                Espacio Psicoeducativo
                            </MuiLink>
                            <MuiLink href="/campanias" color="inherit" underline="none">
                                Campañas de Solidaridad
                            </MuiLink>
                            <MuiLink href="/blog" color="inherit" underline="none">
                                Blog
                            </MuiLink>
                            <MuiLink href="/contacto" color="inherit" underline="none">
                                Contacto
                            </MuiLink>
                        </Box>
                    </Grid>

                    {/* Contact Info */}
                    <Grid item xs={6} md={3}>
                        <Typography variant="overline" sx={{ display: "block", mb: 2 }}>
                            Contacto
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                            Dirección
                        </Typography>
                        <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)" }}>
                            Maratón 185,
                            <br />
                            Benito Juárez, CDMX
                        </Typography>

                        <Typography variant="body2" sx={{ mt: 2, mb: 1 }}>
                            Correo electrónico
                        </Typography>
                        <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)" }}>
                            psique_ser@outlook.com
                        </Typography>

                        <Typography variant="body2" sx={{ mt: 2, mb: 1 }}>
                            Número telefónico
                        </Typography>
                        <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)" }}>
                            +52 1 55 8445 8269
                        </Typography>
                    </Grid>

                    {/* Social Media */}
                    <Grid item xs={12} md={2}>
                        <Typography variant="overline" sx={{ display: "block", mb: 2 }}>
                            Síguenos en
                        </Typography>
                        <Box sx={{ display: "flex", gap: 1 }}>
                            <IconButton
                                component="a"
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{ color: "#fff" }}
                            >
                                <FacebookIcon />
                            </IconButton>
                            <IconButton
                                component="a"
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{ color: "#fff" }}
                            >
                                <InstagramIcon />
                            </IconButton>
                            <IconButton
                                component="a"
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{ color: "#fff" }}
                            >
                                <TwitterIcon />
                            </IconButton>
                        </Box>
                    </Grid>
                </Grid>

                {/* Copyright */}
                <Box sx={{ mt: 4, borderTop: "1px solid rgba(255,255,255,0.2)", pt: 2 }}>
                    <Typography variant="body2" sx={{ textAlign: "center" }}>
                        © Copyright 2023 by{" "}
                        <MuiLink
                            href="https://www.amoxtli.tech"
                            target="_blank"
                            rel="noopener noreferrer"
                            color="inherit"
                            underline="hover"
                        >
                            Amoxtli Web Developers
                        </MuiLink>
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;
