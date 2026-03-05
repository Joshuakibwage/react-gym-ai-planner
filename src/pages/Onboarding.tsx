import { useAuth } from "@/context/useAuth";
import { RedirectToSignIn, SignedIn } from "@neondatabase/neon-js/auth/react";



export default function Onboarding(){

    const { user } = useAuth();

    if( !user ) {
        return <RedirectToSignIn />
    }

    return (
        <SignedIn>
            <section>
                Onboarding
            
            </section>
        </SignedIn>
    )
};