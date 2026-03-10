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

export interface UserProfile {
  goal: string;
  experience: string;
  days_per_week: number;
  session_length: number;
  equipment: string;
  injuries?: string | null;
  preferred_split: string;
}

export interface PlanOverview {
  goal: string;
  frequency: string;
  split: string;
  notes: string;
}

export interface Exercise {
  name: string;
  sets: number;
  reps: string;
  rest: string;
  rpe: number;
  notes?: string;
  alternatives?: string[];
}

export interface DaySchedule {
  day: string;
  focus: string;
  exercises: Exercise[];
}

export interface TrainingPlan {
  id: string;
  userId: string;
  overview: PlanOverview;
  weeklySchedule: DaySchedule[];
  progression: string;
  version: number;
  createdAt: string;
}