import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

type Headers = { method: string; headers: HeadersInit };

export async function GET(req: NextRequest) {
   const API_KEY = process.env.API_KEY!;
   const searchParams = req.nextUrl.searchParams;
   const id = searchParams.get('id');
   const url = `https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}`;
   const options: Headers = {
      method: 'GET',
      headers: { 'X-API-KEY': API_KEY, 'Content-Type': 'application/json' },
   };
   const movie = await fetch(url, options).then((res) => res.json());

   return NextResponse.json(movie);
}
