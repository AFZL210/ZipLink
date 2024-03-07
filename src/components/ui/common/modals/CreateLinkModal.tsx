"use client"

import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { signOut } from 'next-auth/react';
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from '../../use-toast';
import { CreateModalPropsType } from '@/lib/types/types';
import { LinksState } from '@/store/atoms/link';
import { useRecoilState, useRecoilValue } from 'recoil';
import { copyText, sortLinks } from '@/lib/helpers';
import { filterState } from '@/store/atoms/filter';

const CreateLinkModal = ({ getLinks }: CreateModalPropsType) => {

    const { toast } = useToast();
    const [destinationUrl, setDestinationUrl] = useState("");
    const [password, setPassword] = useState("");
    const [isProtected, setIsProtected] = useState(false);
    const modalTriggerRef = useRef<HTMLButtonElement | null>(null);
    const [linksState, setLinksState] = useRecoilState(LinksState);
    const filter = useRecoilValue(filterState);


  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.type=="keydown" && (event.key==='c' || event.key==='C')) {
            modalTriggerRef.current?.click();
        }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

    const createnNewLink = async (e: any) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/link/create-link', {
                destinationUrl,
                isProtected,
                password
            });

            if (!res.data.error) {
                getLinks().then((links) => { setLinksState({ loading: false, links: links == undefined ? [] : sortLinks(links, filter) }) });
                modalTriggerRef.current?.click();
                copyText(res.data.data.shortUrl);
                toast({ description: "Copied link to clipboard", variant: "default" });
                setPassword("");
                setDestinationUrl("");
            }
        } catch (e) {
            await signOut();
            toast({ description: 'Something went wrong!', variant: "destructive" });
            window.location.href = '/';
        }
    }

    return (
        <Dialog>
            <DialogTrigger><Button ref={modalTriggerRef} style={{ borderRadius: ".6rem" }}><div className='flex justify-center items-center gap-2'>
                <span>Create Link</span>
                <div className='px-2 py-1 bg-[#3f3f46] text-[#6d7584] rounded-xl'>C</div>
            </div>
            </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create a new ZipLink</DialogTitle>
                </DialogHeader>
                <form onSubmit={createnNewLink}>
                    <div className='flex flex-col items-center justify-center mt-4 gap-4'>
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="destUrl">Destination Url</Label>
                            <Input type="text" id="destUrl" placeholder="ziplink.me" required value={destinationUrl} onChange={(e) => setDestinationUrl(e.target.value)} />
                        </div>
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <div className='flex justify-between items-center'>
                                <Label htmlFor="destUrl">Add Password</Label>
                                <Switch onCheckedChange={(e) => setIsProtected(e)} />
                            </div>
                            {isProtected && <Input type="password" id="urlPassword" placeholder="mysecret" required value={password} onChange={(e) => setPassword(e.target.value)} />}
                        </div>
                        <Button type='submit'>Create new Link</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default CreateLinkModal