import { ILink } from "@/lib/types/types";

export const copyText = (text: string) => {
    navigator.clipboard.writeText(text);
}



export const sortLinks = (arr: any, option: string): ILink[] => {
    if (!arr) return arr;

    if (option === 'clicks') {
        arr.sort((a: ILink, b: ILink) => {
            return b.clicks - a.clicks;
        })
    }

    else if (option === 'date-added') {
        arr.sort((a: ILink, b: ILink) => {
            const dateA = new Date(a.createdAt);
            const dateB = new Date(b.createdAt);

            return dateB.getTime() - dateA.getTime();
        });
    }

    else if (option === 'last-clicked') {
        arr.sort((a: ILink, b: ILink) => {
            const dateA = new Date(a.lastClicked);
            const dateB = new Date(b.lastClicked);

            return dateB.getTime() - dateA.getTime();
        });
    }

    return arr;
}