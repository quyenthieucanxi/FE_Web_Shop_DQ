import Login from "@/components/Login"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
export default async function SignInPage() {   
    const session = await getServerSession()
    if (session){
        redirect("/")
    }
    return (
        <Login />        
    )
}