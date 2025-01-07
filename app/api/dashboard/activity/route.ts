import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const token = request.headers.get('authorization');
    
    // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/activity`, {
    const response = await fetch(`https://easmark-platform.onrender.com/api/dashboard/activity`, {
        headers: {
            'Authorization': token || '',
            'Content-Type': 'application/json',
        },
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
}
