"use client"

import React from 'react'
import { useRecoilState } from 'recoil';
import { userState } from '@/store/atoms/user';
import { useSession } from 'next-auth/react';

const Auth = () => {

    const { data: session, status } = useSession();
    const [user, setUser] = useRecoilState(userState);

    if (status === 'loading') {
        return <></>
    }

    if (status === 'unauthenticated') {
        window.location.href = '/';
    }

    if (status === "authenticated") {
        setUser(session.user);
    }

    return (
        <></>
    )
}

export default Auth