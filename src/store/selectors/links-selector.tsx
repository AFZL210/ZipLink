import { selector } from 'recoil'
import { LinksState } from '@/store/atoms/link'
import { ILink } from '@/lib/types/types';

export const filterTypeState = selector<ILink[]>({
    key: "getLinksState",
    get: ({ get }) => {
        const state = get(LinksState);
        return state.links;
    }
})