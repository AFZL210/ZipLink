import { ILink } from "@/lib/types/types";

export const copyText = (text: string) => {
    navigator.clipboard.writeText(text);
}



export const sortLinks = (arr: any, option: string): ILink[] => {
    if(!arr) return arr;
    
    if (option === 'clicks') {
        arr.sort((a: ILink, b: ILink) => {
            if (a.clicks < b.clicks) return 1;
            if (a.clicks > b.clicks) return -1;
            return 0;
          });          
    } else if (option === 'date') {
        arr.sort((a: ILink, b: ILink) => {
            return 0;
        });
    } else {

    }

    return arr;
}