import{z} from "zod"


export const signupschema= z.object({
    "email":z.string().email(),
    "name":z.string().min(3),
    "password":z.string().min(3)
})

export const signinschema= z.object({
    "email":z.string().email(),
    
    "password":z.string().min(3)
})



export const Createroom= z.object({
    "slug":z.string(),
    
    
})

