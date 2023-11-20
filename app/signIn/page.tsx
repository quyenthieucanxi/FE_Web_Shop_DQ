import Login from "@/components/Login"
import { getServerSession } from "next-auth"
import { options } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation"

type Props = {
    searchParams?: Record<"callbackUrl", string>;
};
export default async function SignInPage(props: Props) {
    const session = await getServerSession(options)
    if (session?.user) {
        redirect("/")
    }   
    return (
        <Login callbackUrl={props?.searchParams?.callbackUrl}  />
    )
}