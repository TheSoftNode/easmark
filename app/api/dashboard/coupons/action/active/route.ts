import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const token = request.headers.get('authorization');
    
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/coupons/action/active/`, {
        headers: {
            'Authorization': token || '',
        },
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
}