import { WebSocket, WebSocketServer } from 'ws';
import { jwt_secret } from '@repo/backend_common/index';
import jwt from 'jsonwebtoken'
import { client } from '@repo/db/client';

const wss = new WebSocketServer({ port: 8080 });

interface user{
  ws:WebSocket
  userid:string
  rooms:string[]
}

const users:user[]=[];


function checkuser(token:string) : string| null{

  const decode=  jwt.verify(token,jwt_secret)

  if(typeof decode==="string"){
    
    return null;
  }
  if(!decode || !decode.id){

    
    return null;
  }

  return decode.id


}
wss.on('connection', function connection(ws,request) {
  
  const url=request.url

  if(!url){
    return
  }

  const queryparams= new URLSearchParams(url.split('?')[1])

  const token=queryparams.get("token") ||""

  const userid=checkuser(token)

  if(userid==null){
    ws.close();
    return;
  }

  users.push({
    userid,
    ws,
    rooms:[]
  })


  




  ws.on('message',async function message(data) {
    
    const parsedata= JSON.parse(data as unknown as string)
    
   
  if(parsedata.type==="join_room"){

    const user=users.find(x => x.ws === ws )
    
    user?.rooms.push(parsedata.roomid)
  }



  if(parsedata.type==="leave_room"){

    const user=users.find(x => x.ws === ws )
    
   if(!user){
    return;
   }

   user.rooms= user.rooms.filter(x =>x !== parsedata.roomid)

  }


  if(parsedata.type==="chat"){
   
   const roomid= parsedata.roomid
   const message=parsedata.message

   await client.chat.create({
    data:{
      //@ts-ignore
      message,
      roomid,
      userid


    }
   })
  


  


   users.forEach(user =>{

    if(user.rooms.includes(roomid)){

      user.ws.send(JSON.stringify({

        type:"chat",
        message:message,
        roomid
      }))
    }
   })

  }
  


  });

  ws.send('something');
});




