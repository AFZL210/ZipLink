import { atom } from 'recoil'
import { UserStateType } from '@/lib/types/types'

export const userState = atom<UserStateType>({
    key: "userState",
    default: {
        loading: false,
        email: null,
        id: null,
        image: null,
        username: null,
        name: null
    }
})