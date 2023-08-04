import { dbconnect } from "@/config/dbConfig"
import Prompt from "@/models/prompt"


export const GET = async (request: any, { params }: any) => {
    try {
        await dbconnect()

        const prompts = await Prompt.find({ creator: params.id }).populate("creator")

        return new Response(JSON.stringify(prompts), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch prompts created by user", { status: 500 })
    }
} 