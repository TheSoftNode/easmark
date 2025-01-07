export const dynamic = 'force-dynamic';


import { NextRequest, NextResponse } from "next/server";

export async function PUT(
    request: NextRequest,
    { params }: { params: { code: string } }
) {
    const token = request.headers.get('authorization');
    const body = await request.json();
    
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/coupons/update/${params.code}/`,
        {
            method: 'PUT',
            headers: {
                'Authorization': token || '',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        }
    );

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { code: string } }
) {
    const token = request.headers.get('authorization');
    
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/coupons/delete/${params.code}/`,
        {
            method: 'DELETE',
            headers: {
                'Authorization': token || '',
            },
        }
    );

    if (response.status === 204) {
        return new NextResponse(null, { status: 204 });
    }

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
}

export async function GET(
    request: NextRequest,
    { params }: { params: { code: string } }
) {
    const token = request.headers.get('authorization');
    
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/coupons/${params.code}/`,
        {
            headers: {
                'Authorization': token || '',
            },
        }
    );

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
}