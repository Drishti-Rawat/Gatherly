import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

const cached =(global as any).mongoose|| {conn:null, promise:null};

export const connectToDatabase = async ()=>{
    if(cached.conn) return cached.conn;

    if(!MONGO_URI){
        throw new Error("Please define the MONGO_URI environment variable inside .env.local")
    }
   cached.promise=cached.promise || mongoose.connect(MONGO_URI,{
    dbName:"Gatherly",
    bufferCommands:false
   })

   cached.conn=await cached.promise
   console.log("database connected successfully")
   return cached.conn;

   
   
}