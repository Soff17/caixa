"use client";

import React, { useRef } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import { motion, useInView } from "framer-motion";
import MissionCard from "./MissionCard"; // Adjust path as needed

// Example icons (use your own or from @mui/icons-material)
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";

const fadeVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8 },
    },
};

const MissionVisionValuesSection: React.FC = () => {
    // Ref for detecting scroll
    const sectionRef = useRef<HTMLDivElement | null>(null);
    const inView = useInView(sectionRef, { once: true, amount: 0.2 });

    return (
        <Box
            component={motion.div}
            ref={sectionRef}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={fadeVariants}
            sx={{ py: { xs: 6, md: 10 }, backgroundColor: "#f9fafb" }}
        >
            <Container>
                <Box sx={{ textAlign: "center", mb: { xs: 4, md: 6 } }}>
                    <Typography
                        variant="subtitle1"
                        sx={{
                            display: "block",
                            mb: 1,
                            color: "primary.main",
                        }}
                    >
                        Conoce los fundamentos que guían nuestro trabajo
                    </Typography>
                    <Typography variant="h3" sx={{ mb: 2 }}>
                        Misión, Visión y Valores
                    </Typography>
                </Box>

                <Grid container spacing={4} alignItems="stretch">
                    <Grid item xs={12} sm={6} md={4}>
                        <MissionCard
                            title="Misión"
                            description="Brindar atención psicológica integral a niños, adolescentes y adultos, promoviendo su bienestar emocional y crecimiento personal."
                            icon={<EmojiObjectsIcon fontSize="inherit" />}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <MissionCard
                            title="Visión"
                            description="Ser reconocidos como un referente en salud mental, ofreciendo soluciones de calidad e impulsando la innovación en la práctica clínica."
                            icon={<VisibilityIcon fontSize="inherit" />}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <MissionCard
                            title="Valores"
                            description="Compromiso, ética, empatía, responsabilidad y profesionalismo son la base de nuestro trabajo diario."
                            icon={<FavoriteIcon fontSize="inherit" />}
                        />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default MissionVisionValuesSection;
