import { Schema, model } from 'mongoose';
import { Place } from './place';



const placeSchema = new Schema<Place>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    address: { type: String, required: true },
    location: {
        lat: { type: Number, required: false },
        lng: { type: Number, required: false }
    },
    creator: { type: Schema.Types.ObjectId, required: true, ref: 'User' }
});

const PlaceModel = model<Place>('Place', placeSchema);

export default PlaceModel;