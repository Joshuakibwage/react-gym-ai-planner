import { useState, useEffect, useCallback, useRef  } from "react";
import { authClient } from "@/lib/auth";
import { AuthContext } from "./useAuth";
import { api } from "@/lib/api";

import type { User, UserProfile, TrainingPlan } from "@/types";


export default function AuthProvider({ children }: { children: React.ReactNode }) {

    const [neonUser, setNeonUser ] = useState<User | null>(null);
    const [plan, setPlan] = useState<TrainingPlan | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const isRefreshingRef = useRef(false);
      const [planLoading, setPlanLoading] = useState(true); 
    

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




    //refresh data memoize
    const refreshData = useCallback(async () => {
        if( !neonUser || isRefreshingRef.current ) return;

        isRefreshingRef.current = true;
            setPlanLoading(true); 

        try {
            // fetch profile
            // const profileData

            //fetch plan
            const planData = await api.getCurrentPlan(neonUser.id).catch(() => null);
                    
            if(planData){
                setPlan({
                    id: planData.id,
                    userId: planData.userId,
                    overview: planData.planJson.overview,
                    weeklySchedule: planData.planJson.weeklySchedule,
                    progression: planData.planJson.progression,
                    version: planData.version,
                    createdAt: planData.createdAt,
                })
            }

        } catch (error) {
            console.error("Error refreshing data:", error);
            // throw new Error("There was an error refreshing the data! Please try again.");
        } finally {
            isRefreshingRef.current = false;
                  setPlanLoading(false); 
        }

    }, [neonUser?.id]);


    // useEffect(() => {
    //     if (!isLoading) {
    //         if (neonUser?.id) {
    //             refreshData();
    //         } else {
    //             setPlan(null);
    //         }
    //     }
    // }, [neonUser?.id, isLoading, refreshData]);
     useEffect(() => {
    if (!isLoading && neonUser?.id) {
      refreshData();
    } else if (!isLoading) {
      setPlan(null);
      setPlanLoading(false); 
    }
  }, [neonUser?.id, isLoading, refreshData]);


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
        await refreshData();
    }

    return (
        <AuthContext.Provider 
            value={{
                user: neonUser, 
                isLoading, 
                saveProfile, 
                generatePlan, 
                refreshData, 
                plan,
                planLoading, 
            }}
        >
            {children}
        </AuthContext.Provider>
    )

};