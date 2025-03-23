import React, { useEffect } from 'react';
import { Box, Typography, Grid, IconButton, Tooltip } from '@mui/material';
import { Launch } from '@mui/icons-material';

const technologies = [
    { name: 'Watsonx.ai', img: '/logos/watsonx.png', link: '#' },
    { name: 'Orchestrate', img: '/logos/orchestrate.png', link: '#' },
    { name: 'Discovery', img: '/logos/discovery.png', link: '#' },
    { name: 'OpenAPI', img: '/logos/openapi.png', link: '#' },
    { name: 'Gmail', img: '/logos/gmail.png', link: '#' },
    { name: 'Calendar', img: '/logos/calendar.png', link: '#' }
];

interface WatsonChatInstance {
  changeView: (view: string) => void;
  restartConversation: (...args: unknown[]) => Promise<void>;
  send: (message: { input: { message_type: string; text: string } }, options: { silent: boolean }) => Promise<void>;
  on: (event: { type: string; handler: (e: { newViewState: { mainWindow: boolean } }) => void }) => void;
  updateLocale: (locale: string) => Promise<void>;
  render: () => Promise<void>;
}

declare global {
  interface Window {
    webChatInstance?: WatsonChatInstance;
  }
}

const IBMBento = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.innerHTML = `
      window.watsonAssistantChatOptions = {
        integrationID: '43f4794e-e91e-4464-a8f1-beaa019a5309',
        region: 'wxo-us-south',
        serviceInstanceID: '727fcb04-1caa-4c7b-8051-138f5a41ee3d',
        headerConfig: {
          minimizeButtonIconType: 'close',
          showRestartButton: false
        },
        showLauncher: false,
        onLoad: async (instance) => {
          window.webChatInstance = instance;
        
          const invokeInitial = {
            input: {
              message_type: 'text',
              text: 'IBM'
            }
          };
          const sendOptions = { silent: true };
        
          const originalRestart = instance.restartConversation.bind(instance);
        
          instance.restartConversation = async function (...args) {
            await originalRestart(...args);
            await instance.send(invokeInitial, sendOptions).catch(console.error);
          };
        
          instance.on({
            type: 'view:change',
            handler: (event) => {
              const launcherBtn = document.querySelector('.custom-launcher');
              if (event.newViewState.mainWindow) {
                launcherBtn.style.display = 'none';
              } else {
                launcherBtn.style.display = '';
              }
            },
          });
        
          await instance.updateLocale('es');
          await instance.render();
          await instance.restartConversation();
        }          
      };
      setTimeout(function(){
        const t = document.createElement('script');
        t.src = 'https://web-chat.global.assistant.watson.appdomain.cloud/versions/' + 
                (window.watsonAssistantChatOptions.clientVersion || 'latest') + 
                '/WatsonAssistantChatEntry.js';
        document.head.appendChild(t);
      }, 0);
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
      {/* Botón flotante personalizado para abrir Watson Assistant */}
      <Box
        className="custom-launcher"
        onClick={() => {
          window?.webChatInstance?.changeView('mainWindow');
        }}
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          zIndex: 9999,
          width: 100,
          height: 100,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #1f70c1, #354de8)',
          color: '#fff',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-3px) scale(1.25)',
            boxShadow: '0 12px 28px rgba(0, 0, 0, 0.5)',
          },
        }}
      >
        <Box sx={{ fontSize: 28 }}><img src="/logos/bot.png" alt="IBM" style={{ width: '100%', objectFit: 'contain' }} /></Box>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6} sx={{}}>
          <Box sx={{ ...cardStyle}} >
            <Typography variant="h2" fontWeight="bold">Sobre TalentBot</Typography>
            <Typography variant="body2">
              Diseñado para profesionales de Recursos Humanos que buscan identificar al mejor candidato para una vacante o generar publicaciones automatizadas para atraer nuevos talentos.
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} md={2}>
          <Box sx={{ ...cardStyle, gap: 2, p: 0, backgroundColor: 'transparent', boxShadow: 'none' }}>
            <Box sx={{ ...cardStyle, alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor:'#e01288'}}>
              <img src="/logos/nds.png" alt="NDS" style={{ width: '70%', objectFit: 'contain' }} />
            </Box>
            <Box sx={{ ...cardStyle, alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor:'#113b5e' }}>
              <img src="/logos/ibm.png" alt="IBM" style={{ width: '70%', objectFit: 'contain' }} />
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <Box sx={{ ...cardStyle}} >
            <Typography variant="h4" fontWeight="bold" sx={{ mb: 2 }}>Tecnologías</Typography>
            <Grid container spacing={2} justifyContent="flex-start" sx={{paddingTop:2}}>
                {technologies.map((tech, index) => (
                  <Grid item xs={6} sm={4} md={3} lg={4} key={index}>
                    <Tooltip title={tech.name} placement="top">
                      <Box
                        sx={{
                          width: '100%',
                          aspectRatio: '1 / 1',
                          background: '#2a2a2a',
                          borderRadius: '20px',
                          overflow: 'hidden',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          p: 2,
                          transition: '0.3s ease',
                          boxShadow: '0 0 10px rgba(0,0,0,0.3)',
                          '&:hover': {
                            transform: 'scale(1.05)',
                            boxShadow: '0 0 15px rgba(255,255,255,0.15)',
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

        <Grid item xs={12} md={4}>
          <Box sx={{ ...cardStyle}}>
            <Typography variant="h4" fontWeight="bold" sx={{ mb: 2 }}>
              Características principales
            </Typography>
            <Typography variant="body2" sx={{ color: '#ccc', mb: 3 }}>
              Tecnología IBM que combina IA, flujos automáticos y conocimientos de CVs para recomendar candidatos ideales.
            </Typography>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
              <Box sx={{ ...chipStyle}}>📄 Base de conocimiento con CV en PDF</Box>
              <Box sx={{ ...chipStyle}}>🤖 AI para sugerencias de candidatos</Box>
              <Box sx={{ ...chipStyle}}>📬 Skills para envar correos y agendar publicación</Box>
              <Box sx={{ ...chipStyle}}>✍️ AI para redactar correos y generar publicaciones</Box>
              <Box sx={{ ...chipStyle}}>🔗 Integración con APIs</Box>
            </Box>
    
            <IconButton href="#" sx={{ mt: 3, alignSelf: 'flex-end' }}>
              <Launch sx={{ color: '#fff' }} />
            </IconButton>
          </Box>
        </Grid>

        <Grid item xs={6} md={8}>
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
                zIndex: 0,
              }}
            >
              <source src="/logos/demo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <Box sx={{ ...cardStyle}}>
            <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 1 }}>
              Automatiza tu reclutamiento
            </Typography>
          </Box>
        </Grid>


        <Grid item xs={12} md={2}>
          <Box sx={{ ...cardStyle, backgroundColor:'#b3a100'}}>
            <img src="/logos/bot.png" alt="IBM" style={{ width: '100%', objectFit: 'contain' }} />
          </Box>
        </Grid>

        <Grid item xs={12} md={6} sx={{}}>
          <Box sx={{ ...cardStyle}} >
            <Typography variant="h4" fontWeight="bold">Top 3 Candidatos</Typography>
            <Typography variant="body2">
              Resultado de una selección basada en IA y búsqueda, a partir del análisis de 34 CVs y 8 postulantes destacados.
            </Typography>
          </Box>
        </Grid>
        
      </Grid>
    </Box>
  );
};

export default IBMBento;