import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth";
import { AuthContext } from "./useAuth";

import type { User } from "@/types";

// interface  {
//     isLoading: boolean;
// }


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

    return (
        <AuthContext.Provider value={{ user: neonUser, isLoading }}>
            {children}
        </AuthContext.Provider>
    )

};