// app/api/credits/usage/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        // Get the authorization token from headers
        const token = request.headers.get('authorization');
        
        if (!token) {
            return NextResponse.json(
                { message: 'Authorization token is required' },
                { status: 401 }
            );
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/credits/get-usage/`, {
            method: 'GET',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            return NextResponse.json(
                { 
                    message: errorData.error || 'Failed to fetch credit usage' 
                },
                { status: response.status }
            );
        }

        const data = await response.json();
        return NextResponse.json(data, { 
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            }
        });

    } catch (error: any) {
        console.error('Credit usage fetch error:', error);
        return NextResponse.json(
            { 
                message: error.message || 'Failed to fetch credit usage' 
            },
            { status: 500 }
        );
    }
}