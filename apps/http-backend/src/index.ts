import express from "express";
import bcrypt from "bcrypt"
import cors from "cors"

import jwt from "jsonwebtoken";
import {jwt_secret} from "@repo/backend_common/index"
import { Createroom, signinschema ,signupschema} from "@repo/common/zodschema";
import { client } from "@repo/db/client";
import { Authware } from "./middleware";
const app= express()

app.use(express.json())
app.use(cors())



app.post("/signup",async(req,res)=>{

    const validateddata= signupschema.safeParse(req.body)
    if(validateddata.data==undefined){
        return
    }
    const email=validateddata.data?.email
    const password=validateddata.data?.password
    const hashed= await bcrypt.hash(password,5)
    const name=validateddata.data?.name
   


    await client.user.create({
        data:{
          
            email,
           //@ts-ignore
            name,
            password:hashed
        }
    })
    res.json({
        "message":"you have signed up"
    }
    )

})


app.post("/signin",async(req,res)=>{

    const validateddata= signinschema.safeParse(req.body)
    if(validateddata.data==undefined){
        return
    }
    const email=validateddata.data?.email
    const password=validateddata.data?.password
    


    const user= await client.user.findFirst({
       
        where:{
            email:email
        }
    })

    if(!user){
        res.json({
            "message":"user not found"
        })

    }

    if(user?.password===undefined){
        return
    }
    const hashpass= user?.password

    const pass= await bcrypt.compare(password,hashpass)
    if(!pass){
        res.json({
            "message":"wrong pass"
        })
    }

    const token=jwt.sign({
        
      id:  user.id
    
    },jwt_secret)
    
    res.json({
        token
    })






})


app.post("/create-room",Authware,async(req,res )=>{

  const data= Createroom.safeParse(req.body)

  if(!data.success){
    res.json({
        "message":"incorrect inputs"
    })
  }
//@ts-ignore
  const userid=req.id
 const slug= data.data?.slug
 try{

 const room= await client.room.create({
    data:{
        slug:slug!,
        adminid:userid!
    }
 })

 res.json({
    roomid:room.id
 })
}catch(e){
    res.json({
           
    "message":"this room already exist"
    })
}

})

app.get("/chat/:roomid",async (req,res)=>{

    const roomid=Number(req.params.roomid)

    const messages= await client.chat.findMany({
        where:{
            roomid
        },
        orderBy:{
            id:"desc"
        },

        take:50
    })

    res.json({
        messages
    })
})



app.get("/room/:slug",async (req,res)=>{

    const slug=req.params.slug

    const room= await client.room.findFirst({
        where:{
            slug
        },
       
    })
    if(room===null){
        res.json({
  message:"room not found"
        })
        return
    }

    res.json({
       room
    })
})





app.listen(3001)