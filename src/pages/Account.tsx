import { useParams } from 'react-router-dom';
import { AccountView } from "@neondatabase/neon-js/auth/react";


export default function Account() {

    const { pathname } = useParams();
    
    return (
        <div className="min-h-screen w-full pt-24 pb-12 px-6 ">
            <div className="max-w-4xl mx-auto ">
                <AccountView 
                    pathname={pathname} 
                />
            </div>
        </div>
    )
};