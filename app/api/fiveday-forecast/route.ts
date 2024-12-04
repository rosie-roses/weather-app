import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const searchParams = req.nextUrl.searchParams;
        const lat = searchParams.get('lat');
        const lon = searchParams.get('lon');
        const apiKey = process.env.OPENWEATHERMAP_API_KEY;
        const url = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
        const res = await fetch(url, {
            next: { revalidate: 3600 },
        });
        const data = await res.json();
        return NextResponse.json(data);
    }
    catch (error) {
        console.log('Error in getting daily data');
        return new Response('Error in getting daily data', { status: 500 });
    }
}