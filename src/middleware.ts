import { NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;
    console.log(path)
    const isPrivatePath = path.startsWith('/setting') || path.startsWith('/dashboard') || path.startsWith('/links/');
    const token = req.cookies.get("next-auth.session-token")?.value || "";

    if (isPrivatePath && token === "") {
        return NextResponse.redirect(new URL('/', req.nextUrl));
    }
}

export const config = {
    matcher: [
        '/',
        '/dashboard',
        '/settings',
        '/login',
        '/sign-up',
        '/links/:linkId*',
        '/api/link/create-link',
        '/api/link/delete-link/:linkId'
    ]
}