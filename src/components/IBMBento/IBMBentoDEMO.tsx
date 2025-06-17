import React, { useEffect, useState } from 'react'; // añade useState
import { Box, Typography, Grid, IconButton, Tooltip } from '@mui/material';
import { Launch } from '@mui/icons-material';
import Image from 'next/image';

const technologies = [
    { name: 'rag', img: '/logos/rag.png', link: '#' },
    { name: 'llm', img: '/logos/llm.png', link: '#' },
    { name: 'genai', img: '/logos/genAI.png', link: '#' }
];

interface WatsonAssistantReceiveEvent {
  data?: {
    output?: {
      generic?: Array<{
        response_type: string;
        text?: string;
        title?: string;
        options?: Array<{ label: string }>;
      }>;
    };
  };
}

interface ViewChangeEvent {
  newViewState: {
    mainWindow: boolean;
  };
}

interface WatsonChatInstance {
  changeView: (view: string) => void;
  restartConversation: (...args: unknown[]) => Promise<void>;
  send: (message: { input: { message_type: string; text: string } }, options: { silent: boolean }) => Promise<void>;
  on: (
    event: {
      type: 'view:change';
      handler: (e: ViewChangeEvent) => void;
    } | {
      type: 'receive';
      handler: (e: WatsonAssistantReceiveEvent) => void;
    }
  ) => void;
  updateLocale: (locale: string) => Promise<void>;
  render: () => Promise<void>;
}

interface WatsonChatOptions {
  integrationID: string;
  region: string;
  serviceInstanceID: string;
  headerConfig?: {
    minimizeButtonIconType?: string;
    showRestartButton?: boolean;
  };
  showLauncher?: boolean;
  layout?: {
    showFrame?: boolean;
  };
  onLoad?: (instance: WatsonChatInstance) => void;
}

declare global {
  interface Window {
    webChatInstance?: WatsonChatInstance;
    watsonAssistantChatOptions?: WatsonChatOptions;
  }
}

const IBMBento = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    window.watsonAssistantChatOptions = {
      integrationID: '43f4794e-e91e-4464-a8f1-beaa019a5309',
      region: 'wxo-us-south',
      serviceInstanceID: '727fcb04-1caa-4c7b-8051-138f5a41ee3d',
      headerConfig: {
        minimizeButtonIconType: 'close',
        showRestartButton: false
      },
      showLauncher: false,
      layout: {
        showFrame: false,
      },
      onLoad: async (instance: WatsonChatInstance) => {
        window.webChatInstance = instance;
  
        const invokeInitial = {
          input: {
            message_type: 'text',
            text: 'IBM'
          }
        };
        const sendOptions = { silent: true };
  
        const originalRestart = instance.restartConversation.bind(instance);
  
        instance.restartConversation = async function (...args: unknown[]) {
          await originalRestart(...args);
          await instance.send(invokeInitial, sendOptions).catch(console.error);
        };
  
        instance.on({
          type: 'view:change',
          handler: (event: ViewChangeEvent) => {
            const launcherBtn = document.querySelector('.custom-launcher') as HTMLElement;
            if (launcherBtn) {
              launcherBtn.style.display = event.newViewState.mainWindow ? 'none' : '';
              window.dispatchEvent(new CustomEvent("watson-chat-open", { detail: event.newViewState.mainWindow }));
            }
          },
        });
  
        // Aquí escuchamos la respuesta y la mandamos por evento personalizado
        instance.on({
            type: 'receive',
            handler: (event: WatsonAssistantReceiveEvent) => {
              const messages = event.data?.output?.generic || [];
          
              let responseText = '';
          
              messages.forEach((msg) => {
                if (msg.response_type === 'text') {
                  responseText += msg.text + '\n';
                } else if (msg.response_type === 'option') {
                  responseText += msg.title + '\n';
                  msg.options?.forEach((opt) => {
                    responseText += `• ${opt.label}\n`;
                  });
                }
              });              
          
              window.dispatchEvent(new CustomEvent("watson-assistant-response", { detail: responseText }));
            }
          });          
  
        await instance.updateLocale('es');
        await instance.render();
        await instance.restartConversation();
      }
    };
  
    const script = document.createElement('script');
    script.src = 'https://web-chat.global.assistant.watson.appdomain.cloud/versions/latest/WatsonAssistantChatEntry.js';
    document.head.appendChild(script);
  }, []);  
  
  useEffect(() => {
    const listener = (e: CustomEvent) => {
      setIsChatOpen(e.detail);
    };
  
    window.addEventListener('watson-chat-open', listener as EventListener);
    return () => window.removeEventListener('watson-chat-open', listener as EventListener);
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
    <Box sx={{ backgroundColor: isChatOpen ? '#1f70c1' : '#0f0f0f', minHeight: '100vh', px: 3, py: 6 }}>
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
        <Box sx={{ fontSize: 28 }}><Image src="/logos/bot.png" alt="IBM" width={100} height={100} /></Box>
      </Box>

      {!isChatOpen && (
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
              <Image src="/logos/nds.png" alt="NDS" width={140} height={100} />
            </Box>
            <Box sx={{ ...cardStyle, alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor:'white' }}>
              <Image src="/logos/kp.png" alt="IBM" width={120} height={120} />
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <Box sx={{ ...cardStyle}} >
            <Typography variant="h4" fontWeight="bold" sx={{ mb: 2 }}>Tecnologías</Typography>
            <Grid container spacing={2} justifyContent="flex-start" sx={{paddingTop:5, paddingBottom:5}}>
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
              Tecnología que combina IA, flujos automáticos y conocimientos de CVs para recomendar candidatos ideales.
            </Typography>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
              <Box sx={{ ...chipStyle}}>📄 Base de conocimiento con CV en PDF</Box>
              <Box sx={{ ...chipStyle}}>🤖 AI para sugerencias de candidatos</Box>
              <Box sx={{ ...chipStyle}}>📬 Skills para enviar correos y agendar publicación</Box>
              <Box sx={{ ...chipStyle}}>✍️ AI para redactar correos y generar publicaciones</Box>
              <Box sx={{ ...chipStyle}}>🔗 Integración con APIs</Box>
            </Box>
    
            <IconButton href="#" sx={{ mt: 3, alignSelf: 'flex-end' }}>
              <Launch sx={{ color: '#fff' }} />
            </IconButton>
          </Box>
        </Grid>

        <Grid item xs={12} md={8}>
  <Box
    sx={{
      ...cardStyle,
      position: 'relative',
      overflow: 'hidden', 
      p: 0, // sin padding para que el video se ajuste al 100%
    }}
  >
    <video
      autoPlay
      loop
      muted
      playsInline
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'fill', // aquí se hace el "cover"
        zIndex: 0,
        transform: 'scale(1.1)', // zoom sutil
        transition: 'transform 0.5s ease-in-out',
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
          <Box
            sx={{
              ...cardStyle,
              backgroundColor: '#1f70c1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Image src="/logos/bot.png" alt="IBM" width={200} height={170} />
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
      )}
    </Box>
  );
};

export default IBMBento;