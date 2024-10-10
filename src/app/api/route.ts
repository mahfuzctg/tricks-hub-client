/* eslint-disable @typescript-eslint/no-explicit-any */


import NextAuth from "next-auth";
import { AuthOptions } from "../config/nextauth.config";

const handler = NextAuth(AuthOptions);

export { handler as GET, handler as POST };
