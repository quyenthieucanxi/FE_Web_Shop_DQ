import { options } from "@/app/api/auth/[...nextauth]/options";
import { usePathname } from "next/navigation";


export const CheckUrl = (): boolean => {
    const pathname = usePathname();
    const checkURL = (pathname !== options.pages?.signIn && pathname !== "/signUp" && pathname != "/forgetPassword" ) ? true : false;
    return checkURL;
}

export const ValidateInput = (text: string =" ", fieldName: string): string | null => {
    const inputTrim  = text.trim()
    if (inputTrim.length === 0) {
      return `${fieldName} không được để trống.`;
    }
    return null; 
  };

  export const ValidateInputPrice = (text: string =" ", fieldName: string): string | null => {
    const inputTrim  = text.trim()
    if ( Number.parseInt(inputTrim) < 0 || Number.parseInt(inputTrim) < 1000 ) {
      return `${fieldName} không hợp lệ.`;
    }
    return null; 
  };
  export const ValidateInputQuantity = (text: string =" ", fieldName: string): string | null => {
    const inputTrim  = text.trim()
    if ( Number.parseInt(inputTrim) < 0 ) {
      return `${fieldName} không hợp lệ.`;
    }
    return null; 
  };