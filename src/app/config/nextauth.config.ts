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



  pages: {
    signIn: "/login",
  },
  secret: envConfig.nextAuthSecret as string,
};
