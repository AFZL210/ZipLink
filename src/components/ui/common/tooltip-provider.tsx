"use client"

import React from 'react'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"


const TooltipProviderWrapper = ({ children, tip }: { children: React.ReactNode, tip: string }) => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>{children}</TooltipTrigger>
                <TooltipContent>
                    <p>{tip}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>

    )
}

export default TooltipProviderWrapper