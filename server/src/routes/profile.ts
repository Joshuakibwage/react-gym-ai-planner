import { Router, type Request, type Response } from "express";
import { prisma } from "../lib/prisma";

export const profileRouter = Router();


profileRouter.post("/", async(req: Request, res: Response) => {
    try {
        const { userId, ...profileData} = req.body;

        if( !userId ) {
            return res.status(400).send({error: "User ID is required."});
        }

        const {
            goal,
            experience,
            daysPerWeek,
            sessionLength,
            equipment,
            preferredSplit,
            injuries
        } = profileData;

        if (!goal || !experience || !daysPerWeek || !sessionLength || !equipment || !preferredSplit || !injuries) {
            return res.status(400).send({error: "All fields are required."});
        };
     
        await prisma.user_profile.upsert({
            where: {user_id: userId},
            update: {
                goal,
                experience,
                days_per_week: daysPerWeek,
                session_length: sessionLength,
                equipment,
                preferred_split: preferredSplit,
                injuries: injuries || null,
                updated_at: new Date()
            },
            create: {
                user_id: userId,
                goal,
                experience,
                days_per_week: daysPerWeek,
                session_length: sessionLength,
                equipment,
                preferred_split: preferredSplit,
                injuries: injuries || null,
            }
        });

        resp.json({success: true});

    } catch (error) {
        console.error("Error saving profile.", error);
        res.status(500).send({error:"Failed to save profile."});
    }
})