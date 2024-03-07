"use client"

import React, { use, useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Loader from '@/components/ui/common/Loader';
import { useRecoilState } from 'recoil';
import { userState } from '@/store/atoms/user';
import axios from 'axios';
import { useToast } from '@/components/ui/use-toast';
import { Label } from '@/components/ui/label';
import { uploadImage } from '@/lib/actions/common';
import { prisma } from '@/db/db';

const Settings = () => {

    const { data: session, status } = useSession();
    const [user, setUser] = useRecoilState(userState);
    const [username, setUsername] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [errors, setErros] = useState({ username: { error: false, msg: "", disabled: true }, avatar: { error: false, msg: "", disabled: true } });
    const { toast } = useToast();

    useEffect(() => {
        setUsername(user.username!);
    }, [user])

    if (status === 'loading') {
        return <div className='w-[100vw] h-[calc(100vh-8rem)] flex items-center justify-center'><Loader /></div>
    }

    if (status === 'unauthenticated') {
        window.location.href = '/';
    }

    const deleteAccount = async () => {
        const ok = confirm("Do you really want to delete your account?");

        if (ok) {
            try {
                const res = await axios.delete('/api/user/delete-user', { headers: { userId: user.id } });
                toast({ description: "Successfully deleted your account.", variant: "default" });
                window.location.href = "/";
            } catch (e) {
                toast({ description: `Something went wrong!`, variant: "destructive" });
            }
        } else {
            return;
        }
    }

    const updateAccount = async (option: string) => {
        if (option === "username") {
            try {
                if (username == "") {
                    setErros({ username: { error: true, msg: "username cannot be empty", disabled: true }, avatar: { ...errors.avatar } })
                    return;
                }
                const res = await axios.put('/api/user/update-user', {}, { headers: { userId: user.id, username, email: user.email, image: user.image } });
                toast({ description: res.data.msg, variant: "default" });
                const updatedUser = { ...user, username: username };
                setUser(updatedUser);
                setErros({ username: { ...errors.username, disabled: true }, avatar: { ...errors.avatar } });
            } catch (e) {
                toast({ description: 'Something went wrong!', variant: "destructive" });
            }
        } else {
            try {
                if (file) {
                    const res = await uploadImage(file);
                    const updatedUser = { ...user, image: res };
                    setUser(updatedUser);
                    await axios.put('/api/user/update-user', {}, { headers: { userId: user.id, username, email: user.email, image: user.image } });
                    setErros({ username: { ...errors.username }, avatar: { ...errors.avatar, disabled: true } });
                }
            } catch (e) {
                toast({ description: 'Something went wrong!', variant: "destructive" });
            }
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
                            {errors.username.error && <Label style={{ color: 'red' }}>{errors.username.msg}</Label>}
                            <div className='w-[100%] flex items-center justify-between gap-2'><Input type='text' value={username} placeholder={`${username}`} onChange={(e) => {
                                setUsername(e.target.value);
                                setErros({ username: { ...errors.username, disabled: false }, avatar: { ...errors.avatar } });
                            }} />
                                <Button disabled={errors.username.disabled && username !== ""} onClick={() => updateAccount("username")}>Save</Button></div>
                        </div>
                        <div className='w-[100%] flex flex-col gap-5 items-start h-fit px-[3rem] py-[2rem]' id='boxshadow-two'>
                            <div className='w-[100%] flex items-center justify-between'>
                                <h1 className='font-medium text-2xl'>Avatar</h1>

                            </div>
                            <div className='w-[100%] flex items-center justify-between gap-2'>
                                {errors.avatar.error && <Label style={{ color: 'red' }}>{errors.avatar.msg}</Label>}
                                <input type='file' accept='image/png, image/gif, image/jpeg' onChange={(e) => {
                                    setErros({ username: { ...errors.username }, avatar: { ...errors.avatar, disabled: false } });
                                    setFile(e.target.files![0]);
                                }} />
                                <Button disabled={errors.avatar.disabled} onClick={() => updateAccount("avatar")}>Save</Button></div>
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