import { useState } from "react";
import { useAuth } from "@/context/useAuth";
import { RedirectToSignIn, SignedIn } from "@neondatabase/neon-js/auth/react";
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
  CardAction,
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
import { ArrowRightIcon } from "lucide-react";


export default function Onboarding(){

    const { user } = useAuth();

    const [formData, setFormData] = useState({
        goal: "",
        experience: "",
        daysPerWeek: "",
        sessionLength: "",
        equipment: "",
        preferredSplit: "",
        injuries: "",
    });

    function updateForm(field: string, value: string) {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    async function handleQuestionnaire(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
    };

    if( !user ) {
        return <RedirectToSignIn />
    }

    return (
        <SignedIn>
            <section className="min-h-screen pb-12 px-6 ">
                <div className="max-w-xl mx-auto ">
                    {/* Progress indicator */}

                    {/* Step: 1 Questionnaire */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Tell us about yourself.</CardTitle>
                            <CardDescription>Help us create the perfect plan for you.</CardDescription>
                            <CardAction>Card Action</CardAction>
                        </CardHeader>

                        <form onSubmit={handleQuestionnaire} className="flex flex-col gap-4">
                            {/* goal options */}
                            <Select value={formData.goal}  onValueChange={(value) => updateForm("goal", value)}>
                              <Label className="w-[90%] mx-auto text-semibold text-md">What's your primary goal?</Label>
                                <SelectTrigger className="w-[90%] mx-auto">
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
                                <Button type="submit" variant="secondary" className="w-full group">
                                    Generate My Workout Plan 
                                    <ArrowRightIcon className="size-4 group-hover:translate-x-1 transition-transform duration-200" />
                                </Button>
                            </div>
                        </form>
                        
                    </Card>

                    {/* Step: 2 AI generating */}
                </div>
            </section>
        </SignedIn>
    )
};