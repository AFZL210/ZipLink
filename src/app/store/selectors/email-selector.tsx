import { selector } from 'recoil'
import { userState } from '@/app/store/atoms/user'

export const usernameState = selector<string | null>({
    key: "usernameState",
    get: ({ get }) => {
        const state = get(userState);
        return state.email
    }
})