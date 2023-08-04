
import { dbconnect } from "@/config/dbConfig";
import Prompt from "@/models/prompt";

export const POST = async (request: { json: () => PromiseLike<{ userId: any; prompt: any; tag: any; }> | { userId: any; prompt: any; tag: any; }; }) => {
    const { userId, prompt, tag } = await request.json();

    try {
        await dbconnect();
        const newPrompt = new Prompt({ creator: userId, prompt, tag });

        await newPrompt.save();
        return new Response(JSON.stringify(newPrompt), { status: 201 })
    } catch (error) {
        return new Response("Failed to create a new prompt", { status: 500 });
    }
}
