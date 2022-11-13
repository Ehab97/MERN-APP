import {Schema,model} from 'mongoose';
import { User } from './user';
import uniqueValidator from 'mongoose-unique-validator';

const userSchema = new Schema<User>({
    name: { type: String, required: true },
    email: { type: String, required: true ,unique:true},
    password: { type: String, required: true, minlength: 6 },
    image: { type: String, required: false },
    places: [{ type: Schema.Types.ObjectId, required: false, ref: 'Place' }]
});

userSchema.plugin(uniqueValidator);
const UserModel =model<User>('User', userSchema);

export default UserModel;