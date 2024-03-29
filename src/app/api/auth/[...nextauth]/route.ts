import { dbconnect } from "@/config/dbConfig";
import User from "@/models/user";
import NextAuth from "next-auth/next";
import GoogleProvider from  'next-auth/providers/google';
import {  NextAuthOptions } from "next-auth";



const handler = NextAuth({
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_SECRET as string,
      })
    ],
    callbacks: {
      async session({ session }) {
        // store the user id from MongoDB to session
        const sessionUser = await User.findOne({ email: session?.user?.email });
       
          // console.log('session check - ',session)
          if (sessionUser) {
            // Assign the user's MongoDB _id to a custom 'id' property
            // session?.user.id = sessionUser._id.toString();
          }
      
        // console.log('session now - ',session)
        return session;
      },
      async signIn({profile}) {
        try {
          await dbconnect();
        
  
          // check if user already exists
          const userExists = await User.findOne({ email: profile?.email });
  
          // if not, create a new document and save user in MongoDB
          if (!userExists) {
            await User.create({
              email: profile?.email,
              username: profile?.name.replace(" ", "").toLowerCase(),
              image: profile?.picture,
              
            });
          }
  
          return true
        } catch (error:any) {
          console.log("Error checking if user exists: ", error.message);
          return false
        }
      },
    }
  })
  
  export { handler as GET, handler as POST }