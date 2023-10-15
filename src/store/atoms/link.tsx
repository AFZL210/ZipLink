import { atom } from "recoil";
import { ILink } from '@/lib/types/types';

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