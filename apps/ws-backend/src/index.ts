import { WebSocketServer } from 'ws';
import { jwt_secret } from '@repo/backend_common/index';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws) {
  

  ws.on('message', function message(data) {
    
    ws.send("pong")
  });

  ws.send('something');
});




