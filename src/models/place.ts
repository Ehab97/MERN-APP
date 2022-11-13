export interface Place {
    id?: string;
    title?: string;
    description?: string;
    imageUrl?: string;
    address?: string;
    location?: {
        lat: number;
        lng: number;
    },
    creator?: string;
    save?: () => void | Promise<void>;
}


export type RequestParams = { placeId?: string, userId?: string };