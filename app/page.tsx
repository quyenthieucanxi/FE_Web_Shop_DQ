
import { getServerSession } from "next-auth"
import { options } from "./api/auth/[...nextauth]/options";
import { signIn } from "next-auth/react";


export default async function Home() {
  const session = await getServerSession(options)
  console.log(session?.user?.accessToken)
  const expireDate = new Date(session?.expires)
  const currentDate = new Date();
  if (currentDate.getUTCFullYear() > expireDate.getUTCFullYear() ||
    (currentDate.getUTCFullYear() === expireDate.getUTCFullYear() && currentDate.getUTCMonth() > expireDate.getUTCMonth()) ||
    (currentDate.getUTCFullYear() === expireDate.getUTCFullYear() && currentDate.getUTCMonth() === expireDate.getUTCMonth() && currentDate.getUTCDate() > expireDate.getUTCDate()) ||
    (currentDate.getUTCFullYear() === expireDate.getUTCFullYear() && currentDate.getUTCMonth() === expireDate.getUTCMonth() && currentDate.getUTCDate() === expireDate.getUTCDate() && currentDate.getUTCHours() > expireDate.getUTCHours()) ||
    (currentDate.getUTCFullYear() === expireDate.getUTCFullYear() && currentDate.getUTCMonth() === expireDate.getUTCMonth() && currentDate.getUTCDate() === expireDate.getUTCDate() && currentDate.getUTCHours() === expireDate.getUTCHours() && currentDate.getUTCMinutes() > expireDate.getUTCMinutes()) ||
    (currentDate.getUTCFullYear() === expireDate.getUTCFullYear() && currentDate.getUTCMonth() === expireDate.getUTCMonth() && currentDate.getUTCDate() === expireDate.getUTCDate() && currentDate.getUTCHours() === expireDate.getUTCHours() && currentDate.getUTCMinutes() === expireDate.getUTCMinutes() && currentDate.getUTCSeconds() > expireDate.getUTCSeconds())) {
    signIn();
  } 
  return (
    <main >
  
    </main>
  ) 
}
