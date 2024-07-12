"use client";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { useSession } from "next-auth/react";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";


interface HubContextType {
    connection: HubConnection | null;
}
interface Props {
    children : ReactNode;
}
const HubContext = createContext<HubContextType | undefined>(undefined);

export default function HubProvider({children} : Props) {
    const [connection, setConnection] = useState<HubConnection | null>(null);
    const { data: session } = useSession();

    useEffect(() => {
        if (session?.user?.accessToken) {
            const newConnection = new HubConnectionBuilder()
                .withUrl(process.env.NEXT_PUBLIC_URL_API + "/chat", {
                    accessTokenFactory: () => session?.user?.accessToken
                })
                .withAutomaticReconnect()
                .build();
            setConnection(newConnection);
        }
    }, [session?.user?.accessToken]);
    return (
        <HubContext.Provider value={{ connection }}>
            {children}
        </HubContext.Provider>
    );
}
export const useHub = (): HubContextType => {
    const context = useContext(HubContext);
    if (context === undefined) {
        throw new Error('useHub must be used within a HubProvider');
    }
    return context;
};