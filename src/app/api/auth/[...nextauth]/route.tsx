/* eslint-disable @typescript-eslint/no-explicit-any */

import { AuthOptions } from "@/app/config/nextauth.config";
import NextAuth from "next-auth";

const handler = NextAuth(AuthOptions);

export { handler as GET, handler as POST };