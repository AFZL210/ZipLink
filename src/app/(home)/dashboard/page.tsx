"use client"

import React, { useEffect } from 'react'
import { useSession } from 'next-auth/react'

const Dashboard = () => {

  const { data: session } = useSession();

  useEffect(() => {
    if (!session?.user) {
      window.location.href = '/';
    }
    console.log(session?.user)
  }, [])

  return (
    <div>Dashboard</div>
  )
}

export default Dashboard