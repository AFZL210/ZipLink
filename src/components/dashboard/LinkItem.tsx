import React from 'react'
import AdsClickIcon from '@mui/icons-material/AdsClick';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import TooltipProviderWrapper from '../ui/common/tooltip-provider';
import Link from 'next/link';


const LinkItem = () => {

    return (
        <div className='w-[100%] h-[100%] flex items-center justify-between px-3 bg-white boxshadow-two'>
            <div className='w-[70%] flex items-center gap-4 justify-start'>
                <img className='w-[24px]' src='http://www.google.com/s2/favicons?domain=www.dub.sh' />
                <div className='flex flex-col items-start justify-between py-3'>
                    <div className='flex items-center justify-center gap-3'>
                        <a href='/l/dajsd6' target='_blank'><h1>ziplink.me/l/sdas</h1></a>
                        <TooltipProviderWrapper tip='Copy Link'>
                            <div><ContentCopyIcon sx={{ width: "1.4rem", padding: ".2rem", backgroundColor: 'rgb(243 244 246)', borderRadius: "50%" }} /></div>
                        </TooltipProviderWrapper>
                    </div>
                    <div className='flex gap-3 items-center'>
                        <span>•4m</span>
                        <span className='md:block hidden'>http://www.google.com/s2/fa?do...</span>
                    </div>
                </div>
            </div>

            <div className='flex items-center gap-2'>
                <Link href={"/links/5duasgd"}>
                    <div className='flex gap-4 cursor-pointer hover:scale-[1.1] ease-in-out transition-[1.2s]'>
                        <div className='flex items-center justify-center gap-2 bg-gray-100 p-2 rounded-xl'>
                            <AdsClickIcon />
                            <span>4</span>
                            <span className='md:block hidden'>Clicks</span>
                        </div>
                    </div>
                </Link>
                <div>
                    <DropdownMenu>
                        <DropdownMenuTrigger><MoreVertIcon /></DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Duplicate</DropdownMenuItem>
                            <DropdownMenuItem>QR Code</DropdownMenuItem>
                            <DropdownMenuItem>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                </div>
            </div>
        </div>
    )
}

export default LinkItem