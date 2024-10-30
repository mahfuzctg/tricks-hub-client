/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import envConfig from "./envConfig";


export const AuthOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: envConfig.googleClientId as string,
      clientSecret: envConfig.googleClientSecret as string,
    }),
  ],

  callbacks: {
    async signIn({ profile, account }: any) {
      
      try {

        if (!profile || !account) {
          return false;
        }

        if (account?.provider === "google") {
   
     
console.log({
  name: profile.name,
  email: profile.email,
  image: profile.picture,
  role : 'user'
})

return true;
        
        } else {
          return false;
        }
      } catch (error) {
        console.log(error);
        return false;
      }
  
    },
  },

  pages: {
    signIn: "/login",
  },
  secret: envConfig.nextAuthSecret as string,
};
