import React from 'react'
import { useRouter } from 'next/navigation'

const Features = () => {

    const router = useRouter();

    return (
        <div className='md:hidden flex flex-col w-[95vw] mx-auto items-center justify-center'>
            <div className='w-[100%] flex'>
                <div onClick={() => { router.push('/features/analytics') }} className='w-[45%] flex flex-col items-start justify-center m-3 hover:bg-slate-200 hover:rounded-[1.2rem] p-3'>
                    <div className='flex items-center gap-1'>
                        <img width="20" height="20" src="https://img.icons8.com/ios-glyphs/30/analytics.png" alt="analytics" />
                        <span className='font-bold text-[.8rem]'>Advanced Analytics</span>
                    </div>
                    <div>
                        <span className='text-[.8rem]'>Powerful analytics for The...</span>
                    </div>
                </div>
                <div onClick={() => { router.push('/features/qr-code') }} className='w-[45%] flex flex-col items-start justify-center m-3 hover:bg-slate-200 hover:rounded-[1.2rem] p-3'>
                    <div className='flex items-center gap-1'>
                        <img width="20" height="20" src="https://img.icons8.com/pastel-glyph/64/qr-code--v2.png" alt="qr-code--v2" />
                        <span className='font-bold text-[.8rem]'>QR Codes</span>
                    </div>
                    <div>
                        <span className='text-[.8rem]'>Free QR Code Generator</span>
                    </div>
                </div>
            </div>
            <div className='w-[100%] flex'>
                <div onClick={() => { router.push('/features/private-links') }} className='w-[45%] flex flex-col items-start justify-center m-3 hover:bg-slate-200 hover:rounded-[1.2rem] p-3'>
                    <div className='flex items-center gap-1'>
                        <img width="20" height="20" src="https://img.icons8.com/ios-filled/50/lock.png" alt="lock" />
                        <span className='font-bold text-[.8rem]'>Private Links</span>
                    </div>
                    <div>
                        <span className='text-[.8rem]'>Create Secure Links</span>
                    </div>
                </div>

                <div onClick={() => { router.push('/features/timed-links') }} className='w-[45%] flex flex-col items-start justify-center m-3 hover:bg-slate-200 hover:rounded-[1.2rem] p-3'>
                    <div className='flex items-center gap-1'>
                        <img width="20" height="20" src="https://img.icons8.com/ios-filled/50/time.png" alt="time" />
                        <span className='font-bold text-[.8rem]'>Timed Links</span>
                    </div>
                    <div>
                        <span className='text-[.8rem]'>Timed Links</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Features