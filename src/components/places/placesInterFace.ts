export interface Place{
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    address: string;
    creatorId: string;
    coordinates: {
        lat: string;
        lng: string;
    }
}