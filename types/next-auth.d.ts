import nextAuth from "next-auth";
import { JWT } from "next-auth/jwt";


declare module "next-auth" {
    interface Session {
        user: {
            name: string;
            email: string;
            phone: string;
            address: string;
            image: string;
            introduce: string,
            url?: string;
            accessToken: string;
            refreshToken: string;
            role?: string;
            sub: string;
        };
    }
}
declare module "next-auth/jwt" {
    interface JWT {
        name: string;
        email: string;
        phone: string;
        address: string;
        image: string;
        introduce: string,
        url?: string;
        accessToken: string;
        refreshToken: string;
        role?: string;
        sub: string;
    }
}