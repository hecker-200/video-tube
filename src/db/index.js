import mongoose from "mongoose"
import { DB_NAME } from "../constants.js"

//error language basically lets us know kaha debuggin karni hai quite nice


const connectDB = async () => {
    try {
      
      const connectioninstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);

      console.log(`\n MongoDB connected !! DB HOST ${connectioninstance.connection.host}`);
      
      
    } catch (error) {
      console.error("ERR",error);
      process.exit(1);
    }
}

export default connectDB;