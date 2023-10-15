import { selector } from 'recoil';
import { filterState } from '../atoms/filter';

export const filterValue = selector<string>({
    key: "filterValue",
    get: ({ get }) => {
        const state = get(filterState);
        return state;
    }
})