import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const lat = -41.2864;
        const lon = 174.7762;
        const apiKey = process.env.OPENWEATHERMAP_API_KEY;
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
        const res = await axios.get(url);
        return NextResponse.json(res.data);
    } catch (error) {
        console.log("Error fetching forecast data");
        return new Response("Error fetching forecast data", { status: 500 });
    }
}