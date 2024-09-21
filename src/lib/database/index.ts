import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

interface MongooseCache {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  }
  

let cached:MongooseCache =(global as any).mongoose|| {conn:null, promise:null};

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
   return cached.conn;
   
}