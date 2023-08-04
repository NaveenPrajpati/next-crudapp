import { dbconnect } from "@/config/dbConfig"
import Prompt from "@/models/prompt"



export const GET = async (request: any) => {
    try {
        await dbconnect()

        const prompts = await Prompt.find({}).populate('creator')

        return new Response(JSON.stringify(prompts), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all prompts", { status: 500 })
    }
} 