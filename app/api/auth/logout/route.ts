import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest)
{
  const token = request.headers.get('authorization');

  // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/logout/`, {
  const response = await fetch(`https://easmark-platform.onrender.com/users/logout/`, {
    method: 'POST',
    headers: {
      'Authorization': token || '',
      'Content-Type': 'application/json',
    },
  });

  const responseData = await response.json();
  return NextResponse.json(responseData, { status: response.status });
}