import { selector } from 'recoil'
import { userState } from '@/store/atoms/user'

export const usernameState = selector<string | undefined | null>({
    key: "usernameState",
    get: ({ get }) => {
        const state = get(userState);
        return state.username
    }
})