import React, { useEffect, useState, useRef } from 'react'
import AdsClickIcon from '@mui/icons-material/AdsClick';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import TooltipProviderWrapper from '@/components/ui/common/tooltip-provider';
import Link from 'next/link';
import { LinkItemType } from '@/lib/types/types';
import { copyText } from '@/lib/helpers';
import { useToast } from '../ui/use-toast';
import axios from 'axios';
import { LinksState } from '@/store/atoms/link';
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/navigation';
import { Cross1Icon } from '@radix-ui/react-icons';
import QRCode from 'qrcode';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const LinkItem: React.FC<LinkItemType> = ({ id, favicon, clicks, url, shortUrl, createdAt, getLinks, isProtected, password, urlCode }) => {

    const router = useRouter();
    const { toast } = useToast();
    const [linksState, setLinksState] = useRecoilState(LinksState);
    const [openQR, setOpenQR] = useState(false);
    const QRModalTrigger = useRef<HTMLButtonElement | null>(null);
    const [destinationUrl, setDestinationUrl] = useState(url);
    const [pswd, setPswd] = useState(`${isProtected ? password : ""}`);
    const [isPrivate, setIsProtected] = useState(isProtected);
    const modalTriggerRef = useRef<HTMLButtonElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

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
                toast({ description: 'Something went wrong!', variant: "destructive" });
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
            toast({ description: 'Something went wrong!', variant: "destructive" });
            return;
        }
    }

    const updateLink = async (e: any) => {
        e.preventDefault();

        if (isPrivate && password == "") {
            toast({ description: "Password Cannot be empty", variant: "destructive" });
            return;
        }

        if (destinationUrl == "") {
            toast({ description: "URL Cannot be empty", variant: "destructive" });
            return;
        }

        try {
            const res = await axios.patch('/api/link/update-link', { linkId: id, destinationUrl, password: pswd, isProtected: isPrivate });
            toast({ description: "Updated Link Successfully!", variant: "default" });
            modalTriggerRef.current?.click();
        } catch (e) {
            toast({ description: (e as Error).message, variant: "destructive" });
        }
    }

    const downloadQRCode = (e: any) => {
        if (canvasRef !== null) {
            let link = e.currentTarget;
            link.setAttribute('download', `${new Date()}.png`);
            // @ts-ignore
            let image = canvasRef.current.toDataURL('image/png');
            link.setAttribute('href', image);
        }
    };

    const createQRCode = (link: string) => {
        QRCode.toCanvas(document.getElementById("canvas"), link, function (error) {
            if (error) console.error(error);
        })
    }

    return (
        <div className='w-[100%] h-[100%] flex items-center justify-between px-3 bg-white boxshadow-two'>
            {
                <div className={`absolute w-[100%] h-[calc(100vh-7rem)] left-1/2 top-1/2 py-5 bg-white z-50 transform -translate-x-1/2 -translate-y-1/2 ${openQR ? "block" : "hidden"} flex flex-col items-center`}>
                    <div className='w-[100%] flex justify-between px-4'>
                        <h1 className='font-bold text-3xl'>QR Code</h1>
                        <Cross1Icon width={"30"} height={"30"} style={{ backgroundColor: "red", color: "white", cursor: "pointer" }} onClick={() => setOpenQR(false)} />
                    </div>
                    <canvas className='w-[70%] md:w-[20%] mt-10 mb-5' id='canvas' ref={canvasRef} />
                    <h1>{shortUrl}</h1>
                    <h1>Clicks: {clicks}</h1>
                    <a id="download_image_link" href="download_link" onClick={downloadQRCode}><Button>Download QR Code</Button></a>
                </div>
            }
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
                            <DropdownMenuItem onClick={() => modalTriggerRef.current?.click()}>Edit</DropdownMenuItem>
                            <DropdownMenuItem onClick={duplicateLink}>Duplicate</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => {
                                if (openQR) {
                                    setOpenQR(false);
                                } else {
                                    createQRCode(shortUrl);
                                    setOpenQR(true)
                                }
                            }}>QR Code</DropdownMenuItem>
                            <DropdownMenuItem style={{ backgroundColor: 'red', color: 'white' }} onClick={deleteLink}>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                </div>
            </div>

            <Dialog>
                <DialogTrigger ref={modalTriggerRef}>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Update Link</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={updateLink}>
                        <div className='flex flex-col items-center justify-center mt-4 gap-4'>
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="destUrl">Destination Url</Label>
                                <Input type="text" id="destUrl" placeholder="ziplink.me" required value={destinationUrl} onChange={(e) => setDestinationUrl(e.target.value)} />
                            </div>
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <div className='flex justify-between items-center'>
                                    <Label htmlFor="destUrl">Add Password</Label>
                                    <Switch checked={isPrivate} onCheckedChange={(e) => setIsProtected(e)} />
                                </div>
                                {isPrivate && <Input type="password" id="urlPassword" placeholder="mysecret" required value={pswd} onChange={(e) => setPswd(e.target.value)} />}
                            </div>
                            <Button type='submit'>Update Link</Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default LinkItem