import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth";
import { AuthContext } from "./useAuth";
import { api } from "@/lib/api";

import type { User, UserProfile } from "@/types";


export default function AuthProvider({ children }: { children: React.ReactNode }) {

    const [neonUser, setNeonUser ] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function loadUser() {
            try {
                const result = await authClient.getSession();
                if(result && result.data?.user){
                    setNeonUser(result.data.user);
                }else{
                    setNeonUser(null);
                }
            } catch (err) {
                setNeonUser(null);
                console.error(err);
                throw new Error("There was an error loading the user! Please try again.");
            } finally {
                setIsLoading(false);
            }
        }

        loadUser();
    }, []);

    //user must be authenticated to save profile
    async function saveProfile(profileData: Omit<UserProfile, "userId" | "updatedAt">){
        if(!neonUser) {
            throw new Error("You must be logged in to save your profile!");
        }

        await api.saveProfile(neonUser.id, profileData);

    }

    async function generatePlan(){
        if(!neonUser) {
            throw new Error("You must be authenticated to generate a  plan!");
        }

        await api.generatePlan(neonUser.id);

    }

    return (
        <AuthContext.Provider value={{ user: neonUser, isLoading, saveProfile, generatePlan }}>
            {children}
        </AuthContext.Provider>
    )

};