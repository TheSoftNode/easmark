import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const token = request.headers.get('authorization');
    
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
      headers: {
        'Authorization': token || '',
        'Content-Type': 'application/json',
      },
    });
  
    const responseData = await response.json();
    return NextResponse.json(responseData, { status: response.status });
  }
  