import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
    try {
        const token = request.headers.get('authorization');
        
        if (!token) {
            return NextResponse.json(
                { message: 'Authorization token is required' },
                { status: 401 }
            );
        }

        const data = await request.json();
        
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/profile/update/`, {
            method: 'PUT',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const responseData = await response.json();
        return NextResponse.json(responseData, { status: response.status });

    } catch (error: any) {
        console.error('Profile update error:', error);
        return NextResponse.json(
            { 
                status: 'error',
                message: error.message || 'Failed to update profile' 
            },
            { status: 500 }
        );
    }
}