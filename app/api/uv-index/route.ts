import { NextResponse } from "next/server";

export async function GET(req: NextResponse) {
    try {
        const lat = -41.2864;
        const lon = 174.7762;
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=uv_index_max,uv_index_clear_sky_max&timezone=auto&forecast_days=1`;
        const res = await fetch(url, {
            next: { revalidate: 900 },
        });
        const data = await res.json();
        return NextResponse.json(data);
    } catch (error) {
        console.log('Error in getting UV data');
        return new Response('Error in getting UV data', { status: 500 });
    }
}