"use client"

import React, { useEffect } from 'react';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { SignupFormSchema, SignupFormType, ICustomError } from '@/lib/types/types';
import axios from 'axios';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';

const Signup = () => {

  const { toast } = useToast();
  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    if (session?.status === 'authenticated') {
      router.push('/dashboard');
    }
  })

  const onSubmit: SubmitHandler<SignupFormType> = async (data: SignupFormType) => {
    try {
      const res = await axios.post("/api/sign-up", data);
      toast({
        description: res.data.msg
      });
      router.push("/login");
    } catch (e: any) {
      toast({
        variant: "destructive",
        description: (e as ICustomError).response?.data?.msg
      })
    }
  }

  const { handleSubmit, formState: { errors }, control } = useForm<SignupFormType>({
    resolver: zodResolver(SignupFormSchema)
  });


  return (
    <div className='main w-[100vw] h-[100vh] flex items-center justify-center text-black'>
      <div className='  w-fit md:px-36 px-10 pb-10 bg-white boxshadow-one  rounded-xl flex flex-col items-center'>

        <h1 className=' font-bold text-3xl py-5'>Signup</h1>

        <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "5px" }} >
          <div className='flex flex-col gap-2'>
            <Label style={{ color: "white" }}>Email</Label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => <Input {...field} placeholder='Email' />}
            />
            {errors.email && <Label style={{ color: "red" }}>{errors.email?.message}</Label>}
          </div>

          <div className='flex flex-col gap-2'>
            <Label style={{ color: "white" }}>Username</Label>
            <Controller
              name="username"
              control={control}
              render={({ field }) => <Input {...field} placeholder='Username' />}
            />
            {errors.username && <Label style={{ color: "red" }}>{errors.username?.message}</Label>}
          </div>

          <div className='flex flex-col gap-2'>
            <Label style={{ color: "white" }}>Password</Label>
            <Controller
              name="password"
              control={control}
              render={({ field }) => <Input {...field} placeholder='Password' type='password' />}
            />
            {errors.password && <Label style={{ color: "red" }}>{errors.password?.message}</Label>}
          </div>

          <Button type="submit" style={{ marginTop: "10px", marginBottom: "10px" }}>Signup</Button>

          <div className='flex  items-center justify-center text-md gap-2'>
            <Label>Already have an account?</Label>
            <Link style={{ fontWeight: 500 }} href="/login">Login</Link>
          </div>

          <h1 className='text-center'>OR</h1>
          <div className='flex gap-5 items-center justify-center'>
            <div className='cursor-pointer' onClick={() => signIn('google')}><Image src="/static/google-icon.png" alt='google' width="35" height="35" /></div>
            <div className='cursor-pointer' onClick={() => signIn('github')}><Image src="/static/github-icon.png" alt='google' width="35" height="35" /></div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup