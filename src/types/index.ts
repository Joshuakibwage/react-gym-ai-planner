export interface User {
    id: string;
    email: string;
    createdAt: string;
}

export interface UserProfile {
    userId: string;
    goal: "bulk" | "cut" | "maintain" | "strength" | "endurance" | "cardio";
    experience: "beginner" | "intermediate" | "advanced";
    daysPerWeek: number;
    sessionLength: number;
    equipment: "full_gym" | "home_gym" | "dumbbells";
    preferredSplit: "full_body" | "upper_body" | "lower_body" | "cardio" | "ppl" | "custom";
    injuries: string;
    updatedAt: string;
}