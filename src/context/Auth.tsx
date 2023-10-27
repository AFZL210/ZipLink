"use client"

import React, { useState } from 'react'
import { useRecoilState } from 'recoil';
import { userState } from '@/store/atoms/user';
import { useSession } from 'next-auth/react';

const Auth = () => {

    const { data: session, status } = useSession();
    const [user, setUser] = useRecoilState(userState);
    const [flag, setFlag] = useState(false);

    if (status === 'loading') {
        return <></>
    }

    if (!user.loading && status === "authenticated") {
        setUser({ ...session.user, loading: true });
    }

    return (
        <></>
    )
}

export default Auth