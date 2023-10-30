import { ILink, IDate } from "@/lib/types/types";
import { isWithinRange } from '@/lib/actions/common';

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

export enum dateFilterOptions {
    TODAY = "Today",
    MONTH = "Last 30 Days",
    ALL_TIME = "All Time"
}

export const filterDates = (dates: IDate[], option: string): IDate[] => {

    let res: IDate[] = [];

    if (option === dateFilterOptions.TODAY) {
        const today = new Date().toISOString().split('T')[0];

        dates.forEach((date) => {
            let ok = date.date.split('T')[0] === today;
            if (ok) {
                res.push(date);
            }
        });
    } else if (option === dateFilterOptions.MONTH) {
        const currentDate = new Date();

        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1;

        const filteredData = dates.filter(record => {
            const recordDate = new Date(record.date);
            const recordYear = recordDate.getFullYear();
            const recordMonth = recordDate.getMonth() + 1;

            return recordYear === currentYear && recordMonth === currentMonth;
        });

        res.push(...filteredData);
    }
    else {
        res.push(...dates);
    }

    return res;
};


export const detectDeviceAndOS = (): string[] => {
    const res: string[] = [];
    const userAgent = window.navigator.userAgent;

    const isAndroid = userAgent.indexOf("Android");
    const isIphone = userAgent.indexOf("iPhone");
    const isWindows = userAgent.indexOf("Windows");
    const isLinux = userAgent.indexOf("Linux");

    if (isAndroid != -1) res.push("Android");
    else if (isIphone != -1) res.push("iPhone/iPad");
    else if (isLinux && isAndroid == -1) res.push("Linux");
    else if (isWindows != -1) res.push("Windows");
    else res.push("Others");

    if (userAgent.indexOf("Mobile") != -1) {
        res.push("Mobile");
    } else {
        res.push("Desktop");
    }

    return res;
}