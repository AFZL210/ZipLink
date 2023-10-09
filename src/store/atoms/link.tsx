import { atom } from "recoil";

export const filterState = atom<{ type: string }>({
    key: 'filterState',
    default: {
        type: "Date"
    }
});