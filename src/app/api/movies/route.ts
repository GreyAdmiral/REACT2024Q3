import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

type Headers = { method: string; headers: HeadersInit };

export async function GET(req: NextRequest) {
   const API_KEY = process.env.API_KEY!;
   const searchParams = req.nextUrl.searchParams;
   const page = searchParams.get('page') || 1;
   const baseUrl = `https://kinopoiskapiunofficial.tech/api/v2.2/films?page=${page}`;
   const keywords = searchParams.get('keyword');
   const url = keywords ? `${baseUrl}&keyword=${keywords}` : baseUrl;
   const options: Headers = {
      method: 'GET',
      headers: { 'X-API-KEY': API_KEY, 'Content-Type': 'application/json' },
   };
   const movies = await fetch(url, options).then((res) => res.json());

   return NextResponse.json(movies);
}
