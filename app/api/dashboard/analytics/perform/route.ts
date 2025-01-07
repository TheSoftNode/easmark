import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const token = request.headers.get('authorization');
        const body = await request.json(); 

        // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/analysis/perform/`, {
        const response = await fetch(`https://easmark-platform.onrender.com/analysis/perform/`, {
            method: 'POST', 
            headers: {
                'Authorization': token || '',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        const data = await response.json();
        return NextResponse.json(data, { status: response.status });
    } catch (error) {
        console.error('Error in analysis API route:', error);
        return NextResponse.json(
            { error: 'Failed to process request' }, 
            { status: 500 }
        );
    }
}

