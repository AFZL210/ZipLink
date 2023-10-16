"use client"

import React from 'react'
import { useSession } from 'next-auth/react'
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Loader from '@/components/ui/common/Loader';
import { useRecoilState } from 'recoil';
import { userState } from '@/store/atoms/user';
import axios from 'axios';
import { useToast } from '@/components/ui/use-toast';

const Settings = () => {

    const { data: session, status } = useSession();
    const [user, setUser] = useRecoilState(userState);
    const { toast } = useToast();

    if (status === 'loading') {
        return <div className='w-[100vw] h-[calc(100vh-8rem)] flex items-center justify-center'><Loader /></div>
    }

    if (status === 'unauthenticated') {
        window.location.href = '/';
    }

    if (status === "authenticated") {
        setUser(session.user);
    }

    const deleteAccount = async () => {
        const ok = confirm("Do you really want to delete your account?");

        if (ok) {
            try {
                const res = await axios.delete('/api/user/delete-user', { headers: { userId: user.id } });
                console.log(res)
                toast({ description: "Successfully deleted your account.", variant: "default" });
                window.location.href = "/";
            } catch (e) {
                toast({ description: `${(e as Error).message}`, variant: "destructive" });
            }
        } else {
            return;
        }
    }

    return (
        <div className='w-[100vw] h-[calc(100vh-8rem)] overflow-x-hidden flex flex-col items-center justify-start'>
            <div className='w-[100%] flex items-center justify-center'>
                <div className='w-[100%] bg-white flex items-center justify-center py-10'>
                    <div className='md:w-[60%] w-[88%] flex px-5 py-3 justify-between items-center mt-4'>
                        <h1 className='text-3xl'>Settings</h1>
                    </div>
                </div>
            </div>
            <div className='w-[100%] flex items-center justify-center'>
                <div className='md:w-[60%] w-[88%] flex px-5 py-3 justify-between items-center mt-1'>
                    <div className='w-[100%] flex justify-start items-center gap-4'>
                    </div>
                </div>
            </div>
            <div className='md:w-[90%] w-[88%] h-[5.5rem]'>
                <div className='w-[100%] flex items-center justify-center py-[2rem]'>
                    <div className='flex flex-col gap-5 md:w-[60%] w-[88%]'>
                        <div className='w-[100%] flex flex-col gap-5 items-start h-fit px-[3rem] py-[2rem]' id='boxshadow-two'>
                            <h1 className='font-medium text-2xl'>Username</h1>
                            <div className='w-[100%] flex items-center justify-between gap-2'><Input type='text' value={user.username || ""} /><Button disabled={true}>Save</Button></div>
                        </div>
                        <div className='w-[100%] flex flex-col gap-5 items-start h-fit px-[3rem] py-[2rem]' id='boxshadow-two'>
                            <div className='w-[100%] flex items-center justify-between'>
                                <h1 className='font-medium text-2xl'>Avatar</h1>

                            </div>
                            <div className='w-[100%] flex items-center justify-between gap-2'>
                                <input type='file' />
                                <Button disabled={true}>Save</Button></div>
                        </div>

                        <div className='w-[100%] flex flex-col gap-5 items-start h-fit px-[3rem] py-[2rem]' id='boxshadow-two'>
                            <h1 className='font-medium text-2xl'>Delete Account</h1>
                            <span>Permanently delete your ZipLink account and all of your links + their stats.
                                This action cannot be undone - please proceed with caution.
                            </span>
                            <div className='w-[100%] bg-[#f9fafb] flex items-center justify-end'>
                                <Button variant="destructive" onClick={deleteAccount}>Delete Account</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings