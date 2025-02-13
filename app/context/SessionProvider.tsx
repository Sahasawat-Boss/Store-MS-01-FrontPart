"use client";

import { createContext, useContext, useEffect, useState, ReactNode, Dispatch, SetStateAction } from "react";

// Define user session type
interface User {
    id: string;
    username: string;
    name: string;
}

// Define session type
interface SessionData {
    token: string;
    user: User;
}

// Define context type
interface SessionContextType {
    session: SessionData | null;
    setSession: Dispatch<SetStateAction<SessionData | null>>;
}

// Create the context
const SessionContext = createContext<SessionContextType | null>(null);

// Define provider props
interface SessionProviderProps {
    children: ReactNode;
}

export const SessionProvider = ({ children }: SessionProviderProps) => {
    const [session, setSession] = useState<SessionData | null>(null);

    // ✅ Load session from localStorage when the component mounts
    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            try {
                const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decode JWT

                if (decodedToken && decodedToken.user) {
                    setSession({ token, user: decodedToken.user });
                    console.log("✅ Session Updated:", decodedToken.user);
                } else {
                    console.error("⚠️ JWT is missing user data");
                    setSession(null);
                }
            } catch (error) {
                console.error("❌ Invalid JWT token:", error);
                setSession(null);
            }
        }
    }, []);

    console.log("Session state in Provider:", session); // ✅ Debugging session state

    return (
        <SessionContext.Provider value={{ session, setSession }}>
            {children}
        </SessionContext.Provider>
    );
};

// Custom hook for using session context
export const useSession = () => {
    const context = useContext(SessionContext);
    if (!context) {
        throw new Error("❌ useSession must be used within a SessionProvider");
    }
    return context;
};
