import { Link, Navigate } from "react-router-dom";
import {
  Zap,
  ArrowRight,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../components/ui/card";
import { useAuth } from "../context/useAuth";
import { features } from "@/constants";



export default function Home() {

    const { user, isLoading } = useAuth();

    // Redirect authenticated users to profile
    if (!isLoading && user) {
        return <Navigate to="/profile" replace />;
    }
    return (
        <div className="min-h-screen">
        {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-6 overflow-hidden">
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-transparent" />
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-accent/10 rounded-full blur-3xl" />

                <div className="relative max-w-6xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border mb-8">
                        <Zap className="w-4 h-4 text-accent" />
                        <span className="text-sm text-muted-foreground">
                        AI-powered training plans
                        </span>
                    </div>

                    <h1 style={{fontSize: "4rem"}} className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
                        Your Perfect
                        <br />
                        <span className="text-accent">Gym Plan</span> in
                        Seconds
                    </h1>

                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
                        Stop guessing. Get a personalized training program built by AI,
                        tailored to your goals, experience, and schedule.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button asChild to="/onboarding">
                            <Link size="lg" className="gap-2">
                                Get Started Free
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                        </Button>

                        <Button asChild to="/onboarding">
                            <Link variant="secondary" size="lg">
                                Sign In
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 px-6">
                <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Why GymAI?</h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        We combine fitness expertise with AI to create programs that
                        actually work for you.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {
                        features.map((feature) => (
                            <Card
                                key={feature.title}
                                variant="bordered"
                                className="group hover:border-accent/50 transition-colors"
                            >
                                <div 
                                    className="w-[80%] mx-auto rounded-xl flex  justify-start 
                                    mb-4 group-hover:scale-105 transition-transform duration-300"
                                >
                                    <feature.icon 
                                        className="w-6 h-6 text-accent " 
                                    />
                                </div>
                    
                                <CardHeader>
                                    <CardTitle>{feature.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription>{feature.description}</CardDescription>
                                </CardContent>
                            
                            </Card>
                        ))
                    }
                </div>
                </div>
            </section>
        </div>
    );
}