import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const searchParams = req.nextUrl.searchParams;
        const apiKey = process.env.OPENWEATHERMAP_API_KEY;
        const city = searchParams.get('search');
        const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`;
        const res = await axios.get(url);
        const data = await res.data;
        return NextResponse.json(data);
    }
    catch (error) {
        console.log('Error in getting geocoded data');
        return new Response('Error in getting geocoded data', { status: 500 });
    }
}