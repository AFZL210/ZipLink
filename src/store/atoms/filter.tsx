import { atom } from 'recoil';

export const filterState = atom<string>({
    key: "filterState",
    default: "clicks"
}) 