import { NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;
    const authCookie = process.env.NODE_ENV == "development" ? `${process.env.DEV_COOKIE_NAME}` : `${process.env.PROD_COOKIE_NAME}`;
    const isPrivatePath = path.startsWith('/setting') || path.startsWith('/dashboard') || path.startsWith('/links/');
    const token = req.cookies.get(authCookie)?.value || "";

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
