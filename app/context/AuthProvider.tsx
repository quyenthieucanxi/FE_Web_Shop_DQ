"use client";
import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";
interface Props {
  children: ReactNode;
  session?: any;
}
const AuthProvider = ({ children,session }: Props) => {
  return <SessionProvider >{children}</SessionProvider>
};

export default AuthProvider;