import { Schema } from "mongoose";
import { model } from "mongoose";
import { Types } from "mongoose";

const UserSchema = new Schema({
  username : {type : String , required : true, unique : true},
  password : {type : String , required : true}
})

export const UserModel = model('User',UserSchema);

const ContentTypes = ['image','video','audio','article'];

const ContentSchema = new Schema({
  link : {type : String , required : true},
  type : {type : String , enum : ContentTypes , required : true},
  title : {type : String , required : true},
  tags : [{type : Types.ObjectId , ref: 'Tag'}],
  userId : {type : Types.ObjectId , ref : 'User' , required : true}
})

export const ContentModel = model('Content',ContentSchema);


const LinkSchema = new Schema({
  hash : String,
  userId : {type : Types.ObjectId , ref : "User" , required : true , unique : true}
})

export const LinkModel = model('Link',LinkSchema);
