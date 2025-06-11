import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import moment from 'moment';


export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const formatTanggal = (x: Date) => {
    return moment(x).format('LL');
}
