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
    isLoading: boolean;
}

// Create the context
const SessionContext = createContext<SessionContextType | null>(null);

// Define provider props
interface SessionProviderProps {
    children: ReactNode;
}

export const SessionProvider = ({ children }: SessionProviderProps) => {
    const [session, setSession] = useState<SessionData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // ✅ Load session from localStorage before rendering UI
    useEffect(() => {
        const loadSession = () => {
            const token = localStorage.getItem("token");

            if (token) {
                try {
                    const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decode JWT
                    if (decodedToken?.user) {
                        setSession({ token, user: decodedToken.user });
                        console.log("✅ Session Restored:", decodedToken.user);
                    } else {
                        console.error("⚠️ Invalid token format, missing user data.");
                        setSession(null);
                    }
                } catch (error) {
                    console.error("❌ Error decoding JWT:", error);
                    setSession(null);
                }
            }

            setIsLoading(false); // ✅ Mark session as loaded
        };

        loadSession();
    }, []);

    console.log("Session state in Provider:", session);

    if (isLoading) return null; // ✅ Prevent UI from rendering before session loads

    return (
        <SessionContext.Provider value={{ session, setSession, isLoading }}>
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
