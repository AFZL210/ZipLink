"use client"

import React from 'react'
import { RecoilRoot } from 'recoil'

export const RecoilRootProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <RecoilRoot>
            {children}
        </RecoilRoot>
    )
}