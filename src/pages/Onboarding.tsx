import { useAuth } from "@/context/useAuth";
import { RedirectToSignIn, SignedIn } from "@neondatabase/neon-js/auth/react";
// import { 
//     goalOptions, 
//     experienceOptions, 
//     daysOptions, 
//     sessionOptions, 
//     equipmentOptions, 
//     splitOptions 
// } from "@/constants";



export default function Onboarding(){

    const { user } = useAuth();

    if( !user ) {
        return <RedirectToSignIn />
    }

    return (
        <SignedIn>
            <section className="min-h-screen pt-24 pb-12 px-6 ">
                <div className="max-w-xl mx-auto">
                    {/* Progress indicator */}

                    {/* Step: 1 Questionnaire */}

                    {/* Step: 2 AI generating */}
                </div>
            </section>
        </SignedIn>
    )
};