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
import { LinkItemType } from '@/lib/types/types';

const LinkItem: React.FC<LinkItemType> = ({ favicon, clicks, url, shortUrl, createdAt }) => {

    return (
        <div className='w-[100%] h-[100%] flex items-center justify-between px-3 bg-white boxshadow-two'>
            <div className='w-[70%] flex items-center gap-4 justify-start'>
                <img className='w-[24px]' src={favicon} />
                <div className='flex flex-col items-start justify-between py-3'>
                    <div className='flex items-center justify-center gap-3'>
                        <a href={`${shortUrl}`} target='_blank'><h1 className='text-[#1e40b4] font-bold'>{shortUrl}</h1></a>
                        <TooltipProviderWrapper tip='Copy Link'>
                            <div><ContentCopyIcon sx={{ width: "1.4rem", padding: ".2rem", backgroundColor: 'rgb(243 244 246)', borderRadius: "50%" }} /></div>
                        </TooltipProviderWrapper>
                    </div>
                    <div className='flex gap-3 items-center'>
                        <span>•{createdAt}</span>
                        <span className='md:block hidden'>{`${url.length <= 25 ? url : url.substring(0, 25)}...`}</span>
                    </div>
                </div>
            </div>

            <div className='flex items-center gap-2'>
                <Link href={"/links/5duasgd"}>
                    <div className='flex gap-4 cursor-pointer hover:scale-[1.1] ease-in-out transition-[1.2s]'>
                        <div className='flex items-center justify-center gap-2 bg-gray-100 p-2 rounded-xl'>
                            <AdsClickIcon />
                            <span>{clicks}</span>
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