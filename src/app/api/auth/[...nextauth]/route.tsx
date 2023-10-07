import NextAuth from "next-auth/next";
import { AuthOption } from "@/lib/authOptions";

const handler = NextAuth(AuthOption);
export { handler as GET, handler as POST };