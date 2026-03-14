import {
//   Zap,
  Target,
  Calendar,
//   ArrowRight,
  Sparkles,
  Clock,
} from "lucide-react";


export const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Plans",
    description:
      "Get a training program tailored to your goals, experience, and schedule.",
  },
  {
    icon: Target,
    title: "Goal-Oriented",
    description:
      "Whether you want to build muscle, lose fat, or get stronger — we optimize for your goal.",
  },
  {
    icon: Calendar,
    title: "Flexible Scheduling",
    description:
      "Plans that fit your lifestyle. Train 2 days or 6 — we adapt to you.",
  },
  {
    icon: Clock,
    title: "Time-Efficient",
    description:
      "Every workout is designed to maximize results in your available time.",
  },
];


export const goalOptions = [
    {value: "bulk", label: "Build Muscle ( Bulk )"},
    {value: "cut", label: "Loose Fat ( Cut )"},
    {value: "maintain", label: "Maintain Weight ( Maintain )"},
    {value: "strength", label: "Improve Strength ( Strength )"},
    {value: "endurance", label: "Improve Endurance ( Endurance )"},
    {value: "cardio", label: "Improve Cardio Health ( Cardio )"}
];


export const experienceOptions = [
    {value: "beginner", label: "Beginner (0-1 years)"},
    {value: "intermediate", label: "Intermediate (1-3 years)"},
    {value: "advanced", label: "Advanced (3+ years)"},
];


export const daysOptions = [
    {value: "2", label: "2 days per week"},
    {value: "3", label: "3 days per week"},
    {value: "4", label: "4 days per week"},
    {value: "5", label: "5 days per week"},
    {value: "6", label: "6 days per week"},
];


export const sessionOptions = [
    {value: "30", label: "30 minutes per session"},
    {value: "45", label: "45 minutes per session"},
    {value: "60", label: "60 minutes per session"},
    {value: "90", label: "90 minutes per session"},
];


export const equipmentOptions = [
    {value: "full_gym", label: "Full Gym Access"},
    {value: "home_gym", label: "Home Gym"},
    {value: "dumbbells", label: "Dumbbells Only"}
];


export const splitOptions = [
    {value: "full_body", label: "Full Body"},
    {value: "upper_body", label: "Upper Body"},
    {value: "lower_body", label: "Lower Body"},
    {value: "cardio", label: "Cardio"},
    {value: "ppl", label: "Push/Pull/Legs"},
    {value: "custom", label: "Let AI Decide"}
]