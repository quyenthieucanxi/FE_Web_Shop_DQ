import Register from "@/components/Register"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"


export default async function SignUpPage () {
    const session = await getServerSession()
    if (session?.user) {
        redirect("/")
    } 
    return (
        <Register />
    )
}