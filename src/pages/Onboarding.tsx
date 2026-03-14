import { useState } from "react";
import { useAuth } from "@/context/useAuth";
import { RedirectToSignIn, SignedIn } from "@neondatabase/neon-js/auth/react";
import { api } from "@/lib/api";
import { 
    goalOptions, 
    experienceOptions, 
    daysOptions, 
    sessionOptions, 
    equipmentOptions, 
    splitOptions 
} from "@/constants";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { ArrowRightIcon, Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";



export default function Onboarding(){

    const { user, isLoading } = useAuth();
    const [formData, setFormData] = useState({
        goal: "",
        experience: "",
        daysPerWeek: "",
        sessionLength: "",
        equipment: "",
        preferredSplit: "",
        injuries: "",
    });

    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();


    function updateForm(field: string, value: string) {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    async function handleQuestionnaire(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!user?.id) return;

        setIsSubmitting(true);
        setIsGenerating(true); 

        const profile: Omit<UserProfile, "userId" | "updatedAt"> = {
            goal: formData.goal as userProfile["goal"],
            experience: formData.experience as userProfile["experience"],
            daysPerWeek: parseInt(formData.daysPerWeek),
            sessionLength: parseInt(formData.sessionLength),
            equipment: formData.equipment as userProfile["equipment"],
            preferredSplit: formData.preferredSplit as userProfile["preferredSplit"],
            injuries: formData.injuries || undefined,
        }
        // saveProfile(profile);
        try {
            await api.saveProfile(user.id, profile);
            console.log("Profile saved successfully!");
            
            await api.generatePlan(user.id);
            navigate("/profile");
        } catch (error) {
            console.error("Error saving profile:", error);
            setError(error instanceof Error ? error.message : "An error occurred while saving the profile.")
            setIsGenerating(false);
        } finally {
            setIsSubmitting(false);
        }

    };

    if (isLoading) {
        return null;
    }

    if( !user ) {
        return <RedirectToSignIn />
    }

    return (
        <SignedIn >
            <section className="min-h-screen pt-16 pb-12 px-6 ">
                <div className="max-w-xl mx-auto ">
            
                    {/* Progress Indicator */}
                    <div className="flex items-center justify-center gap-0 py-6">
                        {/* Step 1 */}
                        <div className="flex flex-col items-center gap-1.5">
                            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium border-2 transition-all
                                ${isGenerating 
                                    ? "bg-foreground border-foreground text-background" 
                                    : "bg-background border-foreground text-foreground"
                                }`}
                            >
                                {isGenerating ? "✓" : "1"}
                            </div>
                            <span className={`text-xs whitespace-nowrap ${isGenerating ? "text-muted-foreground" : "text-foreground font-medium"}`}>
                                Your profile
                            </span>
                        </div>

                        {/* Connector */}
                        <div className={`w-20 h-0.5 mb-5 transition-all ${isGenerating ? "bg-foreground" : "bg-border"}`} />

                        {/* Step 2 */}
                        <div className="flex flex-col items-center gap-1.5">
                            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium border-2 transition-all
                                ${isGenerating 
                                    ? "border-foreground text-foreground bg-background" 
                                    : "border-border text-muted-foreground bg-transparent"
                                }`}
                            >
                                2
                            </div>
                            <span className={`text-xs whitespace-nowrap ${isGenerating ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                                Generating plan
                            </span>
                        </div>
                    </div>


                    {/* Step: 1 Questionnaire */}
                   {!isGenerating ? (<Card>
                        <CardHeader>
                            <CardTitle>Tell us about yourself.</CardTitle>
                            <CardDescription>Help us create the perfect plan for you.</CardDescription>
                        </CardHeader>

                        <form onSubmit={handleQuestionnaire} className="flex flex-col gap-4">
                            {/* goal options */}
                            <div className="w-[90%] mx-auto space-y-3">
                                <Label className="font-semibold text-md">What's your primary goal?</Label>
                                <Select value={formData.goal} onValueChange={(value) => updateForm("goal", value)}>

                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select Goal" />
                                    </SelectTrigger>
                                    
                                    <SelectContent>
                                        <SelectGroup>
                                            {
                                                goalOptions.map((option, index) => (
                                                    <SelectItem 
                                                        key={index} 
                                                        value={option.value}
                                                    >
                                                        {option.label}
                                                    </SelectItem>
                                                
                                                ))
                                            }
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>

                                        {/* experience options */}
                            <div className="w-[90%] mx-auto space-y-3">
                                <Label className="text-semibold text-md ">What's your experience level?</Label>

                                <Select
                                    value={formData.experience}
                                    onValueChange={(value) => updateForm("experience", value)}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select experience level" />
                                    </SelectTrigger>

                                    <SelectContent>
                                    {experienceOptions.map((option) => (
                                        <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                        </SelectItem>
                                    ))}
                                    </SelectContent>
                                </Select>
                            </div>


                            <div className="w-[90%] mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">

                                {/* Days */}
                                <div className="space-y-3">
                                    <Label className="text-semibold text-md">Days per week</Label>

                                    <Select
                                        value={formData.daysPerWeek}
                                        onValueChange={(value) => updateForm("daysPerWeek", value)}
                                    >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select training days" />
                                    </SelectTrigger>

                                    <SelectContent>
                                        {daysOptions.map((option) => (
                                        <SelectItem key={option.value} value={option.value}>
                                            {option.label}
                                        </SelectItem>
                                        ))}
                                    </SelectContent>
                                    </Select>
                                </div>

                                {/* Session */}
                                <div className="space-y-3">
                                    <Label className="text-semibold text-md">Session length</Label>

                                    <Select
                                        value={formData.sessionLength}
                                        onValueChange={(value) => updateForm("sessionLength", value)}
                                    >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select workout duration" />
                                    </SelectTrigger>

                                    <SelectContent>
                                        {sessionOptions.map((option) => (
                                        <SelectItem key={option.value} value={option.value}>
                                            {option.label}
                                        </SelectItem>
                                        ))}
                                    </SelectContent>
                                    </Select>
                                </div>

                            </div>

                            <div className="w-[90%] mx-auto space-y-3">
                                <Label className="font-semibold text-md">
                                    Preferred training split
                                </Label>

                                <Select
                                    value={formData.preferredSplit}
                                    onValueChange={(value) => updateForm("preferredSplit", value)}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select split" />
                                    </SelectTrigger>

                                    <SelectContent>
                                        {splitOptions.map((option) => (
                                            <SelectItem key={option.value} value={option.value}>
                                            {option.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="w-[90%] mx-auto space-y-3">
                                <Label className="font-semibold text-md">
                                    Equipment access
                                </Label>

                                <Select
                                    value={formData.equipment}
                                    onValueChange={(value) => updateForm("equipment", value)}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select equipment" />
                                    </SelectTrigger>

                                    <SelectContent>
                                        {equipmentOptions.map((option) => (
                                            <SelectItem key={option.value} value={option.value}>
                                            {option.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="w-[90%] mx-auto space-y-3">
                                <Label className="font-semibold text-md">
                                    Any limitations or injuries? ( Optional )
                                </Label>

                                <Textarea 
                                    value={formData.injuries}
                                    onChange={(e) => updateForm("injuries", e.target.value)}
                                    placeholder="Share any injuries, mobility restrictions, or limitations relevant to your workouts."
                                    rows={3}
                                />
                            </div>

                            <div className="w-[90%] mx-auto flex ">
                                <Button 
                                    type="submit" 
                                    variant="secondary" 
                                    className="w-full group"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader className="size-4 animate-spin" />
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            Generate My Workout Plan
                                            <ArrowRightIcon className="size-4 group-hover:translate-x-1 transition-transform duration-200" />
                                        </>
                                    )}
                                </Button>
                            </div>
                            {error && (
                                <p className="text-sm text-red-500 text-center w-[90%] mx-auto">
                                    {error}
                                </p>
                            )}
                        </form>
                        
                    </Card>) : (
                        <>
                            {/* Step: 2 AI generating */}
                        
                            <Card>
                                <CardHeader>
                                    <CardTitle>Generating your plan</CardTitle>
                                    <CardDescription>Our AI is building your personalized program...</CardDescription>
                                </CardHeader>
                                <div className="w-full flex justify-center">
                                    <Loader className="animate-spin w-6 h-6 md:w-12 md:h-12"/>
                                </div>
                            </Card>
                        </>
                    )}

                   

                    
                </div>
            </section>
        </SignedIn>
    )
};