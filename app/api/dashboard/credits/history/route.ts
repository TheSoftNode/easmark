import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const token = request.headers.get('authorization');
    const { searchParams } = new URL(request.url);
    
    const queryString = searchParams.toString();
    const apiUrl = `https://easmark-platform.onrender.com/credits/history/${queryString ? `?${queryString}` : ''}`;
    // const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/credits/history/${queryString ? `?${queryString}` : ''}`;
    
    const response = await fetch(apiUrl, {
        headers: {
            'Authorization': token || '',
        },
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
}