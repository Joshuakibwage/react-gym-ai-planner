import type { DaySchedule } from "../../types";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Dumbbell, Info } from "lucide-react";


import {
  Table,
  TableBody,
//   TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


interface PlanDisplayProps {
    weeklySchedule: DaySchedule[];
};


function ExerciseRow({ exercise, index }: { exercise: Exercise, index: number }) {
    return (
        <TableRow className="border-b border-muted-foreground">
            <TableCell className="font-medium flex flex-col gap-2">
                <div>
                    <span className="text-muted-foreground">{index + 1}.</span> <span className="font-medium"> {exercise.name}</span>
                </div>
                {
                    exercise.notes && (
                        <p className="text-muted-foreground text-xs flex items-center gap-2 mt-1">
                            <Info className="w-3 h-3 text-accent" />
                            {exercise.notes}
                        </p>
                    )
                }
            </TableCell>

            <TableCell className="text-center whitespace-nowrap">
                <span className="text-accent font-medium">{exercise.sets}</span> x <span className="text-muted-foreground"> {exercise.reps}</span>
            </TableCell>

            <TableCell>
                {exercise.rest}
            </TableCell>

            <TableCell className="text-center">
                <span
                    className={`
                    inline-flex items-center justify-center
                    w-8 h-8 rounded-lg text-sm font-medium
                    ${
                        exercise.rpe >= 8
                        ? "bg-red-500/10 text-red-400"
                        : exercise.rpe >= 7
                        ? "bg-yellow-500/10 text-yellow-400"
                        : "bg-green-500/10 text-green-400"
                    }
                    `}
                >
                    {exercise.rpe}
                </span>
            </TableCell>
        </TableRow>
    )
};


function DayCard({ schedule }: { schedule: DaySchedule }) {
    return (
        <Card variant="outlined" className="overflow-hidden">
            <div className="flex justify-between">
                <CardHeader className="flex-1">
                    <CardTitle >{schedule.day}</CardTitle>
                    <CardDescription className="text-secondary ">{schedule.focus}</CardDescription>
                </CardHeader>
                <CardContent className="flex items-center gap-2">
                    <Dumbbell className="w-4 h-4 text-accent" />
                    <span>{schedule.exercises.length} exercises</span>
                </CardContent>
            </div>

            <CardContent>
                <Table>
                    {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                    <TableHeader className="">
                        <TableRow>
                            <TableHead className="w-[100px]">Exercises</TableHead>
                            <TableHead className="text-center">Sets x Reps</TableHead>
                            <TableHead>Rest</TableHead>
                            <TableHead className="text-right">RPE</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody className="divide-y divide-muted-foreground">
                        {
                            schedule.exercises.map((exercise, key) => (
                                <ExerciseRow 
                                    index={key} 
                                    exercise={exercise} 
                                />
                            ))
                        }
                        
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
};


export function PlanDisplay({ weeklySchedule }: PlanDisplayProps) {
    return (
        <div className="flex flex-col gap-4">
            {
                weeklySchedule.map((schedule, key) => (
                    <DayCard 
                        key={key} 
                        schedule={schedule} 
                    />
                ))
            }
        </div>
    )
}