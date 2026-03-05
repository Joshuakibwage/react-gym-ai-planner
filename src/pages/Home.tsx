import { useAuth } from "@/context/useAuth";
import { Navigate } from "react-router-dom";


export default function Home() {

    const { user, isLoading } = useAuth();

    if(user && !isLoading) {
        return <Navigate to="/profile" />
    }

    return (
        <div className="w-full h-screen bg-black">
            <h1 className="text-primary">Home</h1>
        </div>
    )
}