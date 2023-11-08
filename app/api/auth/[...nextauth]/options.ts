import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "@/libs/axios";

export const options: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                username: {  },
                password: {  },
            },
            async authorize(credentials) {
                // Add logic here to look up the user from the credentials supplied
                const res = await axios.post("http://192.168.1.176:5000/api/Authentication/login", {
                      email : credentials?.username,
                      password: credentials?.password,
                    })
                const user = await res.data;
                if (user) {
                    // Any object returned will be saved in `user` property of the JWT
                    return user;
                } else {
                    // If you return null then an error will be displayed advising the user to check their details.
                    return null;
                    // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                }
            },
        }) 
    ],
    callbacks: {
        async jwt({ token, user, account }) {
          return { ...token, ...user };
        },
        async session({ session, token, user }) {
          session.user = token as any;
          return session;
        },
        
      },
    session: {
        strategy: "jwt" 
    },
    pages: {
        signIn: "/signIn",
    },
}