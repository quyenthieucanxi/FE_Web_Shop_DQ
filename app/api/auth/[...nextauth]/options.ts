import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import axios from "@/libs/axios";
import useAxiosAuth from "@/libs/hooks/useAxiosAuth";
import { GenerateRandomPassword } from "@/utils/PasswordHelper";


export const options: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET
        }),
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                username: {},
                password: {},
            },
            async authorize(credentials) {
                // Add logic here to look up the user from the credentials supplied
                try {
                    const res = await axios.post("/api/Authentication/login", {
                        username: credentials?.username,
                        password: credentials?.password,
                    })

                    const user = await res?.data;
                    if (user) {
                        // Any object returned will be saved in `user` property of the JWT
                        return user;
                    } else {
                        // If you return null then an error will be displayed advising the user to check their details.
                        return null;
                        // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                    }
                }
                catch (err) {
                    
                }
            },
        })
    ],
    callbacks: {
        async jwt({ token, user, account, trigger, session }) {
            if (user) {
                token.sub = account.provider;
                token.accessToken = account.access_token;
            }
            console.log(`jwt token:`, { token, user, account, session })
            if (trigger === "update") {
                return { ...token, ...session.user };
            }
            return { ...token, ...user };
        },
        async session({ session, token, user }) {
            console.log(`session:`, { session, token, user})
            if (token.sub === "google") {
                try {
                    await axios.get(`/api/User/CheckUserByEmail?email=${token.email}`)
                }
                catch (error) {
                    const body = {
                        UserName: token.email,
                        Email: token.email,
                        Password: GenerateRandomPassword(),
                        Fullname: token.name,
                        Image: token.picture,
                    }
                    try {
                        await axios.post("/api/Authentication/register", body);
                    }
                    catch (error) {
                        console.log(error.response)
                    }
                }

            }
            session.user = token as any;
            return session;
        },
    },
    session: {
        strategy: "jwt"
    },
    jwt: {
        secret: process.env.NEXTAUTH_SECRET,
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/signIn",

    },
}

