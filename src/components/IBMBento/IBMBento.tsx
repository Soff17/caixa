import React, { useEffect } from 'react';
import { Box, Typography, Grid, Avatar, Button, TextField, IconButton, Tooltip } from '@mui/material';
import { Email, Launch, DarkMode } from '@mui/icons-material';
const technologies = [
    { name: 'Watsonx.ai', img: '/logos/watsonx.png', link: '#' },
    { name: 'Orchestrate', img: '/logos/orchestrate.png', link: '#' },
    { name: 'Discovery', img: '/logos/discovery.png', link: '#' },
    { name: 'OpenAPI', img: '/logos/openapi.png', link: '#' },
    { name: 'Gmail', img: '/logos/gmail.png', link: '#' },
    { name: 'Calendar', img: '/logos/calendar.png', link: '#' }
];

const IBMBento = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.innerHTML = `
      window.watsonAssistantChatOptions = {
        integrationID: "43f4794e-e91e-4464-a8f1-beaa019a5309",
        region: "wxo-us-south",
        serviceInstanceID: "727fcb04-1caa-4c7b-8051-138f5a41ee3d",
        onLoad: async (instance) => {
          await instance.render();
          await instance.updateUserContext({
            skills: {
              "main skill": {
                user_defined: {
                  start_flow: "vacante" // o "candidato"
                }
              }
            }
          });
        }
      };
      setTimeout(function(){
        const t = document.createElement('script');
        t.src = "https://web-chat.global.assistant.watson.appdomain.cloud/versions/" +
                (window.watsonAssistantChatOptions.clientVersion || 'latest') +
                "/WatsonAssistantChatEntry.js";
        document.head.appendChild(t);
      });
    `;
    document.body.appendChild(script);
  }, []);

  const cardStyle = {
    bgcolor: '#1a1a1a',
    borderRadius: '20px',
    p: 3,
    height: '100%',
    color: '#fff',
    boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  };

  const chipStyle = {
    px: 2,
    py: 1,
    borderRadius: '16px',
    fontSize: '13px',
    backgroundColor: '#2a2a2a',
    color: '#fff',
    border: '1px solid #333',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: '0.3s',
    '&:hover': {
      backgroundColor: '#3a3a3a',
      boxShadow: '0 0 6px rgba(255,255,255,0.1)',
    },
  };  

  return (
    <Box sx={{ backgroundColor: '#0f0f0f', minHeight: '100vh', px: 3, py: 6 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Box sx={{ ...cardStyle }}>
            <Typography variant="h5" fontWeight="bold">Sobre TalentBot</Typography>
            <Typography variant="body2">
              Diseñado para profesionales de Recursos Humanos que buscan identificar al mejor candidato para una vacante o generar publicaciones automatizadas para atraer nuevos talentos.
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} md={2}>
          <Box sx={{ ...cardStyle, gap: 2, p: 0, backgroundColor: 'transparent', boxShadow: 'none' }}>
            <Box sx={{ ...cardStyle, alignItems: 'center', justifyContent: 'center', flex: 1 }}>
              <img src="/logos/nds.png" alt="NDS" style={{ width: '70%', objectFit: 'contain' }} />
            </Box>
            <Box sx={{ ...cardStyle, alignItems: 'center', justifyContent: 'center', flex: 1 }}>
              <img src="/logos/ibm.png" alt="IBM" style={{ width: '70%', objectFit: 'contain' }} />
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <Box sx={{ ...cardStyle}} >
            <Typography variant="h6">Tecnologías</Typography>
            <Grid container spacing={2} justifyContent="flex-start" sx={{paddingTop:2}}>
                {technologies.map((tech, index) => (
                  <Grid item xs={6} sm={4} md={3} lg={4} key={index}>
                    <Tooltip title={tech.name} placement="top">
                      <Box
                        sx={{
                          width: '100%',
                          aspectRatio: '1 / 1',
                          backgroundColor: 'white',
                          borderRadius: '20px',
                          overflow: 'hidden',
                          border: '1px solid #333',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          p: 2,
                          transition: '0.2s ease',
                          '&:hover': {
                            transform: 'scale(1.05)',
                            boxShadow: '0 0 10px rgba(255,255,255,0.1)',
                          },
                        }}
                      >
                        <Box
                          component="img"
                          src={tech.img}
                          alt={tech.name}
                          sx={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                          }}
                        />
                      </Box>
                    </Tooltip>
                  </Grid>              
                ))}
            </Grid>
          </Box>
        </Grid>

        <Grid item xs={6} md={4}>
          <Box sx={{ ...cardStyle }}>
          <video
              autoPlay
              loop
              muted
              playsInline
              style={{
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                zIndex: 0,
              }}
            >
              <source src="/logos/demo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <Box sx={{ ...cardStyle, background: 'linear-gradient(180deg, #1a1a1a, #111)' }}>
            <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2 }}>
              Características principales
            </Typography>
            <Typography variant="body2" sx={{ color: '#ccc', mb: 3 }}>
              Tecnología IBM que combina IA, flujos automáticos y conocimientos de CVs para recomendar candidatos ideales.
            </Typography>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
              <Box sx={chipStyle}>📄 Base de conocimiento con CV en PDF</Box>
              <Box sx={chipStyle}>🤖 AI para sugerencias de candidatos</Box>
              <Box sx={chipStyle}>📬 Skills para envar correos y agendar publicación</Box>
              <Box sx={chipStyle}>✍️ AI para redactar correos y generar publicaciones</Box>
              <Box sx={chipStyle}>🔗 Integración con APIs</Box>
            </Box>

            <IconButton href="#" sx={{ mt: 3, alignSelf: 'flex-end' }}>
              <Launch sx={{ color: '#fff' }} />
            </IconButton>
          </Box>
        </Grid>


        <Grid item xs={12} md={4}>
          <Box sx={{ ...cardStyle }}>
            <img src="https://source.unsplash.com/600x400/?laptop,ai" alt="Tech" style={{ width: '100%', borderRadius: '12px' }} />
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <Box sx={{ ...cardStyle }}>
            <Typography variant="subtitle2">Suscríbete para más</Typography>
            <Typography variant="body2">Recibe tips de diseño e innovación tecnológica directamente a tu correo.</Typography>
            <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
              <TextField
                placeholder="Tu correo"
                variant="outlined"
                size="small"
                sx={{ bgcolor: '#2a2a2a', input: { color: '#fff' }, flex: 1 }}
              />
              <Button variant="contained" sx={{ bgcolor: '#fff', color: '#000' }}>Suscribirme</Button>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={6} md={2}>
          <Box sx={{ ...cardStyle, alignItems: 'center', justifyContent: 'center' }}>
            <DarkMode />
          </Box>
        </Grid>

        <Grid item xs={6} md={6}>
          <Box sx={{ ...cardStyle, justifyContent: 'center' }}>
            <Typography variant="subtitle2">¿Tienes un proyecto en mente?</Typography>
            <Button variant="outlined" endIcon={<Email />} sx={{ mt: 2, color: '#fff', borderColor: '#fff' }}>
              Copiar correo
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default IBMBento;