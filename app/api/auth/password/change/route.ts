import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const token = request.headers.get('authorization');
    const data = await request.json();
    
    const response = await fetch(`https://easmark-platform.onrender.com/users/change-password/`, {
    // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/change-password/`, {
      method: 'POST',
      headers: {
        'Authorization': token || '',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  
    const responseData = await response.json();
    return NextResponse.json(responseData, { status: response.status });
  }