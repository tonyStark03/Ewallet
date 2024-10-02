const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const zod = require("zod");
require('dotenv').config();
const authMiddleware = require("../middleware");

const { PrismaClient }=  require('@prisma/client')

const prisma = new PrismaClient()


const signupBody = zod.object({
    username : zod.string(),
    password : zod.string(),
    firstname : zod.string(),
    lastname : zod.string()
})

router.post("/signup", async (req,res)=>{
    const {success} = signupBody.safeParse(req.body);
    console.log(req.body);
    if(!success){
        return res.status(411).json({
	        message: "Email already taken / Incorrect inputs"
        })
    }
    const existingUser = await prisma.userSchema.findUnique({
        where :
        {
            username: req.body.username
        } 
    });
    if(existingUser){
        return res.status(409).json({
            message: "User already exists"
        })
    }
    const user = await prisma.userSchema.create({
        data:{

            username: req.body.username,
            password: req.body.password,
            firstname: req.body.firstname,
            lastname: req.body.lastname
        }
    })
    const id = user.id;
    
    // const randomBalance = Math.random() * 10000; // Generate random balance
    // console.log("Random Balance:", randomBalance); // Log the random balance

    try{await prisma.accountSchema.create({
        data: {
          userId: user.id,
          balance: Math.random() * 10000,
          
        }

      });}
      catch(e){
        console.log("Error while creating account")
      }
    const token = jwt.sign({id}, process.env.JWT_SECRET);

    res.status(200).json({

        message: "User created successfully",
        token: token
    })
} )


const signinBody = zod.object({
    username : zod.string(),
    password: zod.string()
})

router.post("/signin", async (req,res)=>{
    const {success} = signinBody.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }

    const existingUser = await prisma.userSchema.findUnique({
        where:{username: req.body.username, password: req.body.password}
    });
    const UserId = existingUser.id;
    if(existingUser){
        const token = jwt.sign({UserId}, process.env.JWT_SECRET);
        return res.status(200).json({
            token: token
        })
    }
    else{
        return res.status(411).json({
            message: "Error while logging in"
        })
    }
}) 


const updateSchema = zod.object({
    firstname: zod.string().optional(),
    lastname: zod.string().optional(),
    username: zod.string().optional(),
    password: zod.string().optional()
})


router.put("/",authMiddleware, async (req,res)=>{
    const {success} = updateSchema.safeParse(req.body);

    if(!success){
        return res.status(411).json({
            message: "Error while updating information"
        })
    }
    await prisma.userSchema.update({
        where: {id: req.UserId},
        data: req.body
    });
    return res.status(200).json({
        message: "Updated successfully"
    })  
})

router.get("/bulk", async (req,res)=>{
    const filter = req.query.filter || "";
    const users = await prisma.userSchema.findMany({
       where:{
        OR:[
            {
                firstname:{
                    contains: filter,
                    mode: "insensitive"
                }
            },
            {
                lastname:{
                    contains: filter,
                    mode: "insensitive"
                }
            }
        ]
       }
    })
    res.status(200).json({
        users: users.map(user=>({
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            id: user.id
        }))
    })
})

module.exports = router;