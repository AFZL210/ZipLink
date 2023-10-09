import { atom } from "recoil";
import { ILink } from '@/lib/types/types';

export const filterState = atom<{ type: string }>({
    key: 'filterState',
    default: {
        type: "Date"
    }
});

interface IlinkState {
    loading: boolean,
    links: ILink[]
}

export const LinksState = atom<IlinkState>({
    key: 'LinksState',
    default: {
        loading: true,
        links: []
    }
})