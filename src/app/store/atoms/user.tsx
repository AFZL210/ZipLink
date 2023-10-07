import { atom } from 'recoil'
import { UserStateType } from '@/lib/types'

export const userState = atom<UserStateType>({
    key: "userState",
    default: {
        email: null,
        id: null,
        profileImg: null,
        username: null
    }
})