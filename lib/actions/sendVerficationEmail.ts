"use server"
import { prisma } from "../auth";
import { resend } from "../resend";
import { generateOTP } from "../otp";
import { brand } from "@/brand";
export async function sendVerificationEmail(email:string){
   const otp = generateOTP();       
 await prisma.emailOtp.create({
    data:{
      email,
      code: otp ,
      expiresAt:new Date(
          Date.now() + 5 * 60 * 1000
      )
    }      
 });
  await resend.emails.send({
    from: `${brand.name} <onboarding@yourdomain.com>`,
    to: email,
    subject: "Verify your email",

    html: `
      <div style="font-family:sans-serif">
        <h2>Verify your account</h2>

        <p>Your verification code is</p>

        <h1>${otp}</h1>

        <p>
        This code expires in 5 minutes.
        </p>

      </div>
    `,
  });

  return true;
}
