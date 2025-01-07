import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const data = await request.json();
    
    const response = await fetch(`https://easmark-platform.onrender.com/users/request-password-reset/`, {
    // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/request-password-reset/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  
    const responseData = await response.json();
    return NextResponse.json(responseData, { status: response.status });
  }