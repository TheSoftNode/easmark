import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const token = request.headers.get('authorization');
    const body = await request.json();
    
    const response = await fetch(`https://easmark-platform.onrender.com/credits/usage/`, {
    // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/credits/usage/`, {
        method: 'POST',
        headers: {
            'Authorization': token || '',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
}