import { useAuth } from "@/context/useAuth";
import { Navigate } from "react-router-dom";



export default function Profile(){

    const { user, isLoading } = useAuth();
    const plan = true;

    if( !user && !isLoading ) {
        return <Navigate to="/auth/sign-in" />
    }

    if ( !plan ) {
        return <Navigate to="/onboarding" />
    }
    return (
        <div>
            Profile
        </div>
    )
}