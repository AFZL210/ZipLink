import { selector } from 'recoil'
import { filterState } from '@/store/atoms/link'

export const filterTypeState = selector<string | null>({
    key: "filterTypeState",
    get: ({ get }) => {
        const state = get(filterState);
        return state.type;
    }
})