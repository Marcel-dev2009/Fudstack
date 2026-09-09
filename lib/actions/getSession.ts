 "use server";
import { headers } from "next/headers";
import { auth } from "../auth";
export async function getUserSession() {
  const session = await auth.api.getSession({
    headers: await headers()
  });
  return session;
}
