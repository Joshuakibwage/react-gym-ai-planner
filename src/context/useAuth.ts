import { createContext, useContext } from "react";
import type { User } from "@/types";

export interface AuthContextType {
    user: User | null;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
