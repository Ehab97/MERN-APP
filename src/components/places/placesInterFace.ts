export interface Place {
  id?: string;
  _id?: string;
  title?: string;
  description?: string;
  image?: string;
  address?: string;
  creator?: string;
  coordinates?: {
    lat: string;
    lng: string;
  };
}
