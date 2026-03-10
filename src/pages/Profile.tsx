import { useAuth } from "@/context/useAuth";
import { Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { RefreshCcw, Target, AudioLines, Dumbbell, TrendingUp } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
//   CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { PlanDisplay } from "@/components/plan/PlanDisplay";

export default function Profile() {
    const { user, isLoading, plan, planLoading, generatePlan } = useAuth();

    // Wait until both user and plan finish loading
    if (isLoading || planLoading) {
        return <div>Loading...</div>;
    }

    if (!user) return <Navigate to="/auth/sign-in" />;
    if (!plan) return <Navigate to="/onboarding" />;

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
        });
    }

    return (
        <div className="min-h-screen w-full pt-24 pb-12 px-6">
            <div className="max-w-4xl mx-auto flex flex-col gap-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 ">
                    <div className="flex flex-col gap-4">
                        <h1 className="text-3xl font-bold">Your training Plan</h1>
                        <p className="text-muted-foreground text-sm">
                        Version {plan.version} • Created {formatDate(plan.createdAt)}
                        </p>
                    </div>

                    <Button 
                        variant="secondary" 
                        className="flex items-center gap-2 cursor-pointer"
                        onClick={async() => await generatePlan()}
                    >
                        <RefreshCcw className="w-4 h-4" />
                        Regenerate Plan
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 ">
                    <Card variant="outlined" className="col-span-2">
                        <CardContent className="flex items-center gap-4">
                            <div>
                                <Target className="w-4 h-4 text-accent"/>
                            </div>

                            <div>
                                <p className="text-muted-foreground text-sm">Goal</p>
                                <p className="font-medium text-sm">{plan.overview.goal}</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card variant="outlined" className="">
                        <CardContent className="flex items-center gap-4">
                            <div>
                                <AudioLines className="w-4 h-4 text-accent"/>
                            </div>

                            <div>
                                <p className="text-muted-foreground text-sm">Frequency</p>
                                <p className="font-medium text-sm">{plan.overview.frequency}</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card variant="outlined" className="">
                        <CardContent className="flex items-center gap-4">
                            <div>
                                <Dumbbell className="w-4 h-4 text-accent"/>
                            </div>

                            <div>
                                <p className="text-muted-foreground text-sm">Split</p>
                                <p className="font-medium text-sm">{plan.overview.split}</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card variant="outlined" className="">
                        <CardContent className="flex items-center gap-4">
                            <div>
                                <TrendingUp className="w-4 h-4 text-accent"/>
                            </div>

                            <div>
                                <p className="text-muted-foreground text-sm">Version</p>
                                <p className="font-medium text-sm">{plan.version}</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Plan notes */}
                <Card>
                    <CardHeader>
                        <CardTitle>Program Notes</CardTitle>
                        <CardDescription>{plan.overview.notes}</CardDescription>
                    </CardHeader>
                </Card>

                {/* Weekly schedule */}
                <h2 className="font-semibold text-xl mb-4">Weekly Schedule</h2>
                <PlanDisplay weeklySchedule={plan.weeklySchedule} />

                <Card>
                    <CardHeader>
                        <CardTitle>Progression Strategy</CardTitle>
                        <CardDescription>{plan.progression}</CardDescription>
                    </CardHeader>
                </Card>
            </div>
        </div>
    );
}