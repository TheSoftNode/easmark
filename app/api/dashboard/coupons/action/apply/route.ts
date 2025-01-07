import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest)
{
    const token = request.headers.get('authorization');
    const body = await request.json();

    try
    {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/coupons/action/apply/`, {
            method: 'POST',
            headers: {
                'Authorization': token || '',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        });

        const data = await response.json();

        if (data.error) {
            return NextResponse.json({ error: data.error }, { status: 400 });
        }

        // Check if response is not ok
        if (!response.ok) {
            return NextResponse.json(
                { error: 'Failed to apply coupon' }, 
                { status: response.status }
            );
        }


        return NextResponse.json(data, { status: response.status });
    } catch (error)
    {
        return NextResponse.json(
            { error: 'Failed to apply coupon' },
            { status: 500 }
        );
    }
}