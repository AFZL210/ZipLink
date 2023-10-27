import NextAuth from 'next-auth'

declare module "next-auth" {
    interface User {
        username: string
        id: string
    }

    interface Session {
        user: User & {
            username: string
            id: string
            loading: boolean
        }
    }

    interface token {
        username: string
        id: string
    }
}