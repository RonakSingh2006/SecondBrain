import dotenv from "dotenv"
dotenv.config();

import express from "express"
import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import * as z from "zod"
import bcrypt from "bcrypt"
import { ContentModel, UserModel,LinkModel } from "./db.js";

import { authMiddleware } from "./middleWare.js";
import { generateRandomHash } from "./utils.js";

const app = express();

app.use(express.json());

app.post("/api/v1/signup",async (req,res)=>{
  const UserSchema = z.object({
    username : z.string().min(3,"min length is 3").max(10 , "max length is 10"),
    password : z.string().min(8 , "min length is 8").max(20, "max length is 20").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/, "password must contain a small , large and special character and a number")
  })
  type User = z.infer<typeof UserSchema>

  const result = UserSchema.safeParse(req.body);

  if(!result.success){
    res.status(411).send({
      heading : "Error in Input",
      message : result.error
    });
  }
  else{

    
    const currUser :User = result.data;
    
    const hashedPassword :string = await bcrypt.hash(currUser.password,10);

    currUser.password = hashedPassword;

    try{
      await UserModel.create(currUser)

      res.send("Sucessfully Signed In");
    }
    catch(err : any){
      if(err.code === 11000){
        res.status(403).send("user Already exsist");
      }
      else{
        res.status(500).send("server error : "+err.message);
      }
    }
  }

})

app.post("/api/v1/signin",async (req,res)=>{
  const UserSchema = z.object({
    username : z.string().min(3).max(10),
    password : z.string().min(1)
  })
  const result = UserSchema.safeParse(req.body);

  if(!result.success){
    res.status(400).send({
      heading : "Invalid Input",
      message : result.error
    });
  }
  else{
    
    const {username,password} = result.data;

    try{
      const data = await UserModel.findOne({username : username});

      if(data){
        
        const verify = await bcrypt.compare(password,data.password);

        if(verify){
          const token = jwt.sign({id : data._id},process.env["JWT_SECRET"]!);
          res.send({
            message : "Signed In",
            token
          });
        }
        else{
          res.status(401).send("Incorrect Password");
        }
      }
      else{
        res.status(404).send("User Does not exsist");
      }
    }
    catch(err){
      res.status(500).send("Server Error : "+err);
    }
  }
})

const objectIdSchema = z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId");

app.post("/api/v1/content",authMiddleware, async (req,res)=>{


  const contentSchema = z.object({
    link : z.string(),
    type : z.enum(['image','video','audio','article']),
    title : z.string(),
    tags : z.array(objectIdSchema)
  })

  const result = contentSchema.safeParse(req.body);

  if(!result.success){
    res.status(400).send({
      message : "Invalid Inputs",
      error : result.error
    })
  }
  else{
    const {title,link,type,tags} = result.data;

    try{
      const contenet = await ContentModel.create({title,link,type,tags,userId : req.userId});

      res.send({
        message : "Successfully Uploaded",
        contentId : contenet._id
      })

    }
    catch(err){
      res.status(500).send("Error while Uploading content "+err);
    }

  }
})

app.get("/api/v1/content",authMiddleware,async (req,res)=>{
  const userId = req.userId;

  try{
    const data = await ContentModel.find({userId}).populate('userId','username');

    res.send(data);
  }
  catch(err){
    res.status(500).send("Server Error : "+err);
  }
})

app.delete("/api/v1/content",authMiddleware,async (req,res)=>{
  const userId = req.userId;
  const IdSchema = z.object({
    contentId : objectIdSchema
  })

  const result = IdSchema.safeParse(req.body);

  if(!result.success){
    return res.status(400).send("Invalid ContentId");
  }

  const {contentId} = result.data;

  try{
    let content = await ContentModel.findOne({_id : contentId});

    if(!content){
      return res.status(400).send("No Contenet available to delete");
    }


    await ContentModel.deleteOne({userId, _id : contentId});

    return res.send("Sucessfully deleted");
  }
  catch(err){
    return res.status(500).send("Server Error : "+err);
  }
})

app.post("/api/v1/brain/share",authMiddleware,async (req,res)=>{
  const shareSchema = z.object({
    share : z.boolean()
  });

  const result = shareSchema.safeParse(req.body);

  if(result.success){
    try{
      const share = result.data.share;

      if(share){
        // if link already exsists return prev one
        let data = await LinkModel.findOne({userId : req.userId});

        let hash;

        if(data){
          hash = data.hash;
        }
        else{
          hash = generateRandomHash(15);
          await LinkModel.create({
            hash : hash,
            userId : req.userId
          })
        }
        

        res.send({
          message : "Link Created Sucessfully",
          link : `http://127.0.0.1/api/v1/brain/:${hash}`
        });
      }
      else{
        await LinkModel.deleteOne({userId : req.userId});

        res.send("Deleted Sharable Link");
      }
    }
    catch(err){ 
      res.status(500).send("Server Error : "+err);
    }
  }
  else{
    res.status(400).send("Invalid Data "+result.error);
  }
})

// app.get("/api/v1/brain/:shareLink",(req,res)=>{

// })

const url = process.env["MONGO_URL"] ?? "mongodb://localhost:27017/brainly";

export async function connectDB() {
  try{
    await mongoose.connect(url,{
      dbName: "brainly"
    });
    console.log("Connection Sucessfull");
  }
  catch(err){
    console.log("Connection Failed ",err);
  }
}

connectDB();

app.listen(3000);