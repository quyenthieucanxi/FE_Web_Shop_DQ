import ForgetPassword from "@/components/ForgetPassword"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

export default async function ForgetPosswordPage () {
    const session = await getServerSession()
    if (session?.user) {
        redirect("/")
    } 
    return (
       <ForgetPassword/>
    ) 
}