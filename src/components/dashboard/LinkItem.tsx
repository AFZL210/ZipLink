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
import { copyText } from '@/lib/helpers';
import { useToast } from '../ui/use-toast';
import axios from 'axios';
import { LinksState } from '@/store/atoms/link';
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/navigation';

const LinkItem: React.FC<LinkItemType> = ({ id, favicon, clicks, url, shortUrl, createdAt, getLinks, isProtected, password, urlCode }) => {

    const router = useRouter();
    const { toast } = useToast();
    const [linksState, setLinksState] = useRecoilState(LinksState);

    const deleteLink = async () => {
        const ok = confirm("Do you really want to delete this link?");

        if (ok) {
            try {
                const res = await axios.delete('/api/link/delete-link', { headers: { linkId: id } });
                const variant = res.data.error ? "destructive" : "default";
                if (!res.data.error) {
                    getLinks().then((links) => { setLinksState({ loading: false, links: links == undefined ? [] : links }) });
                }
                toast({ description: res.data.msg, variant });
            } catch (e) {
                toast({ description: `${(e as Error).message}`, variant: "destructive" });
                return;
            }
        } else {
            return;
        }
    }

    const duplicateLink = async () => {
        try {
            const res = await axios.post('/api/link/create-link', {
                destinationUrl: url,
                isProtected,
                password
            });
            if (!res.data.error) {
                getLinks().then((links) => { setLinksState({ loading: false, links: links == undefined ? [] : links }) });
                toast({ description: "Created duplicate link", variant: "default" });
            } else {
                toast({ description: "Somethin went wrong!", variant: "destructive" });
            }

        } catch (e) {
            toast({ description: `${(e as Error).message}`, variant: "destructive" });
            return;
        }
    }

    return (
        <div className='w-[100%] h-[100%] flex items-center justify-between px-3 bg-white boxshadow-two'>
            <div className='w-[70%] flex items-center gap-4 justify-start'>
                <img className='w-[24px]' src={favicon} />
                <div className='flex flex-col items-start justify-between py-3'>
                    <div className='flex items-center justify-center gap-3'>
                        <a href={`${shortUrl}`} target='_blank'><h1 className='text-[#1e40b4] font-bold'>{shortUrl.substring(8, shortUrl.length)}</h1></a>
                        <div className='md:block hidden'>
                            <TooltipProviderWrapper tip='Copy Link'>
                                <div onClick={() => {
                                    copyText(shortUrl);
                                    toast({ description: "Copied the link to the clipboard" });
                                }}><ContentCopyIcon sx={{ width: "1.4rem", padding: ".2rem", backgroundColor: 'rgb(243 244 246)', borderRadius: "50%" }} /></div>
                            </TooltipProviderWrapper>
                        </div>
                    </div>
                    <div className='flex gap-3 items-center'>
                        <span>•{createdAt}</span>
                        <span className='md:block hidden'>{`${url.length <= 25 ? url : url.substring(0, 25)}...`}</span>
                        <div className='md:hidden block'>
                            <TooltipProviderWrapper tip='Copy Link'>
                                <div onClick={() => {
                                    copyText(shortUrl);
                                    toast({ description: "Copied the link to the clipboard" });
                                }}><ContentCopyIcon sx={{ width: "1.4rem", padding: ".2rem", backgroundColor: 'rgb(243 244 246)', borderRadius: "50%" }} /></div>
                            </TooltipProviderWrapper>
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex items-center md:gap-2'>
                <Link href={`/link/${urlCode}`}>
                    <div className='flex gap-4 cursor-pointer hover:scale-[1.1] ease-in-out transition-[1.2s]'>
                        <div className='flex items-center justify-center md:gap-2 gap-1 bg-gray-100 p-2 rounded-xl'>
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
                            <DropdownMenuItem onClick={() => router.push(`/link/${urlCode}`)}>Edit</DropdownMenuItem>
                            <DropdownMenuItem onClick={duplicateLink}>Duplicate</DropdownMenuItem>
                            <DropdownMenuItem>QR Code</DropdownMenuItem>
                            <DropdownMenuItem style={{ backgroundColor: 'red', color: 'white' }} onClick={deleteLink}>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                </div>
            </div>
        </div>
    )
}

export default LinkItem