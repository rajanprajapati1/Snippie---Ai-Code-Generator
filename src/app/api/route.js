import { AiModel } from '@/lib/AiModel';
import { NextResponse } from 'next/server'


export async function POST(req, res) {
    try {
        const data = await req.json();
        const AiResponse = await AiModel(data?.userPrompt)
        const finalResponse = AiResponse.choices[0].message.content;
        return NextResponse.json({
            msg: 'Successfully Generated Response',
            data: finalResponse
        })
    } catch (error) {
        return NextResponse.json({
            msg: 'Failed to Generated Response',
            error
        })
    }
}