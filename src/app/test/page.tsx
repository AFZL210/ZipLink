import React from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

const page = async () => {
    const sesson = await getServerSession(authOptions)
    console.log(sesson)
    return (
    <div>page</div>
  )
}

export default page