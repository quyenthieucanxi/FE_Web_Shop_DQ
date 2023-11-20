import { options } from "@/app/api/auth/[...nextauth]/options";
import { usePathname } from "next/navigation";


export const CheckUrl = (): boolean => {
    const pathname = usePathname();
    const checkURL = (pathname !== options.pages?.signIn && pathname !== "/signUp" && pathname != "/forgetPassword") ? true : false;
    return checkURL;
}

export const ValidateInput = (text: string =" ", fieldName: string): string | null => {
    const inputTrim  = text.trim()
    if (inputTrim.length === 0) {
      return `${fieldName} không được để trống.`;
    }
    return null; 
  };