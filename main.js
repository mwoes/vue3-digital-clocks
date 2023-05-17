import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import http from 'http';
import chalk from 'chalk';
import chalker from './logger.js';
import { spawn } from 'child_process';
import { createProxyMiddleware } from 'http-proxy-middleware';
import dotenv from 'dotenv';
import { Server as SocketServer } from 'socket.io';
import { io } from 'socket.io-client';

dotenv.config();

const DEV_PORT = process.env.DEV_PORT ? process.env.DEV_PORT : 3503;
const app = express();
const server = http.createServer(app);

morgan.token('colored_status', function (req, res) {
  const status = res.statusCode;
  const colorFn = status >= 500 ? chalk.redBright.bold
    : status >= 400 ? chalk.yellowBright.bold
    : status >= 300 ? chalk.blueBright.bold
    : chalk.greenBright.bold;

  return colorFn(status);
});

morgan.token('url', function (req, res) {
    return chalk.cyanBright.bold(`${req.url}`);
});


const customFormat = `${chalk.cyanBright.bold('[EXPRESS]')} :method :url :colored_status :response-time ms'`

app.use(morgan(customFormat));
app.use(cors());
app.use('/kiosk/media', express.static('./media'));

chalker.info(`APPLICATION MODE: ${process.env.NODE_ENV}`);

if (process.env.NODE_ENV == 'production') {
  // Serve the built bundle if we're in production
  app.use('/kiosk/app/', express.static('./app/dist'));

  // Start the Express server
  app.listen(DEV_PORT, () => {
    chalker.info(`Server listening on port ${DEV_PORT}`);
  });

  const socket = io(`ws://socket:8090/`, {
      path: "/relay/socket.io/",
      query: { name: 'express', service: 'pwa' }
  })

  const socketPriv = io(`ws://socket:8090/priv`, {
    path: "/relay/socket.io/",
    auth: { token: process.env.BALENA_DEVICE_UUID },
    query: { name: 'express', service: 'pwa' }
  })

  socket.on('connect', () => {
    chalker.socket({payload:`Connected from relay server: /`, event: 'root-connection'})
  })

  socketPriv.on('connect', () => {
    chalker.socket({payload:`Connected from relay server: /priv`, event: 'priv-connection'})
  })

  socket.on('disconnect', () => {
    chalker.socket({payload:`Disconnected from relay server: /`, event: 'root-disconnection'})
  })

  socketPriv.on('disconnect', () => {
    chalker.socket({payload:`Disconnected from relay server: /priv`, event: 'priv-disconnection'})
  })

  socket.on('pwa', (msg) => {
    let topic = msg?.topic ? msg.topic : 'none';
    let passcode = process.env.PASSCODE ? process.env.PASSCODE : '14130';
    let inactivity = process.env.INACTIVITY_TIMEOUT ? parseInt(process.env.INACTIVITY_TIMEOUT,10) : 5000;
    let portal = process.env.SERVICE_PORTAL ? process.env.SERVICE_PORTAL : './portal.html';
    switch (topic) {
      case 'init':
        // here we are basically assembling a config object to send to the front end -- but the front-end needs to emit an init to get this config back
        socket.emit('pwa',{topic: 'init-cb', payload: {
          passcode: passcode,
          timeout: inactivity,
          servicePortal: portal
        }})
        break;
        // if there's a need for any backend -- its here, you can build your own socket API between the FE and the system, otherwise node-red is easier
      case 'privileged':
        chalker.socket({payload:`Privileged destination requested: ${msg.payload} -> ${msg.dest}`, event: 'message'})
        break;
      case 'env':
        socket.emit('pwa', {
          topic: 'env',
          payload: {
            node: process.env.NODE_ENV,
            port: process.env.PORT,
            proxyPort: process.env.DEV_PORT,
          },
        });
        break;
      case 'ping':
        let date = new Date().toISOString();
        chalker.socket({payload: `PING RECEIVED ${date}`, event: 'ping'})
        socket.emit('pwa', { topic: 'pong', payload: date });
        break;
      default:
        chalker.error(`${topic} in: ${JSON.stringify(msg)}`);
        break;
    }
  })


} else if (process.env.NODE_ENV == 'development') {
  // Reverse-proxy /kiosk/app to the React dev server using http-proxy-middleware
  const proxy = createProxyMiddleware('/kiosk/app', {
    target: 'http://localhost:5173',
    changeOrigin: true,
    ws: true,
    headers: {
      Host: 'localhost:3503',
    },
  });
  app.use(proxy);

  // Start the React dev server
  const reactDevServer = spawn('npm', ['run', 'dev'], {
    cwd: './app'
  });

  reactDevServer.stdout.on('data', (log) => {
    chalker.vite(log);
  })

  reactDevServer.stderr.on('data', (log) => {
    chalker.vite(log);
  })

  // Start the Express server
  server.listen(DEV_PORT, () => {
    chalker.info(`Server listening on port ${DEV_PORT}`);
  });

  const ioServer = new SocketServer(server, {
    path: '/relay/socket.io/',
    cors: {
      origin: '*',
    },
  });

  ioServer.on('connection', function (socket) {
    chalker.socket({payload: `NEW CLIENT: ${socket.handshake.query.service}`, event: 'connection'});
    if(socket.handshake.query.service) {
      // join named room for the service phoning in
      socket.join(socket.handshake.query.service);
    };

    setInterval(() => {
      socket.emit('pwa',{topic: "changeClock"})
      chalker.info('Changing Clockface')
    }, 30000)

    socket.on('ioapi', function (message) {
      socket.emit('pwa', { topic: 'ioapi-cb', payload: message.payload });
    });

    socket.on('pwa', (msg) => {
      let topic = msg?.topic ? msg.topic : 'none';
      let passcode = process.env.PASSCODE ? process.env.PASSCODE : '14130';
      let inactivity = process.env.INACTIVITY_TIMEOUT ? parseInt(process.env.INACTIVITY_TIMEOUT,10) : 5000;
      let portal = process.env.SERVICE_PORTAL ? process.env.SERVICE_PORTAL : './portal.html';
      switch (topic) {
        case 'init':
          // here we are basically assembling a config object to send to the front end -- but the front-end needs to emit an init to get this config back
          socket.emit('pwa',{topic: 'init-cb', payload: {
            passcode: passcode,
            timeout: inactivity,
            servicePortal: portal
          }})
          break;
          // if there's a need for any backend -- its here, you can build your own socket API between the FE and the system, otherwise node-red is easier
        case 'privileged':
          chalker.socket({payload:`Privileged destination requested: ${msg.payload} -> ${msg.dest}`, event: 'message'})
          break;
        case 'env':
          socket.emit('pwa', {
            topic: 'env',
            payload: {
              node: process.env.NODE_ENV,
              port: process.env.PORT,
              proxyPort: process.env.DEV_PORT,
            },
          });
          break;
        case 'ping':
          let date = new Date().toISOString();
          chalker.socket({payload: `PING RECEIVED ${date}`, event: 'ping'})
          socket.emit('pwa', { topic: 'pong', payload: date });
          break;
        default:
          chalker.error(`${topic} in: ${JSON.stringify(msg)}`);
          break;
      }
    });

    socket.onAny((event,msg) => {
      chalker.socket({payload: msg, event: event})
      if(event !== 'pwa') ioServer.to(event).emit(event, msg);
    })
  });

  process.on('SIGINT', () => {
    chalker.warning('Received SIGINT, killing child process...');
    reactDevServer.kill('SIGINT');
    process.exit(0);
  });
}