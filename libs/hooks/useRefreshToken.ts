"use client";
import axios from "../axios";
import { signIn, useSession } from "next-auth/react";

export const useRefreshToken = () => {
  const { data: session, update } = useSession();

  const refreshToken = async () => {
    const res = await axios.post("/api/Authentication/newToken", {
      accessToken: session?.user.accessToken,
      refreshToken: session?.user.refreshToken,
    });
    if (session) 
    {
      await update({
        ...session,
        user: {
          ...session?.user,
          accessToken: res.data.accessToken,
        }
      })
    }
    //session.user.accessToken = res.data.accessToken;
    else signIn();
  };
return refreshToken;
};