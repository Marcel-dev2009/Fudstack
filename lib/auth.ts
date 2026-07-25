import {betterAuth} from "better-auth";
import "dotenv/config"
import {PrismaPg} from "@prisma/adapter-pg"
import {prismaAdapter} from "better-auth/adapters/prisma";
import { PrismaClient } from "./generated/prisma";
import {nextCookies} from "better-auth/next-js";

const adapter = new PrismaPg({connectionString:process.env.DATABASE_URL})
export  const prisma = new PrismaClient({adapter})
export const auth = betterAuth({
  database: prismaAdapter(prisma , {provider:"postgresql"}),
  emailAndPassword:{
     enabled :true     
  },
  experimental:{
   joins:true
  },
  plugins:[nextCookies()],        
})

