import { Router } from 'express';
import { check } from 'express-validator'
import { getPlaceById, getPlacesByUserId, createNewPlace, deletePlaceById, getAllPlaces, updatePlaceById } from '../controller/place-controller';
import fileUpload from '../middleware/file-upload';



//define routes
const router = Router();

//get place with id
router.get('/:placeId', getPlaceById);
//get places by user id
router.get('/user/:userId', getPlacesByUserId);
//patch place
router.patch('/:placeId',
    [
        check('title').not().isEmpty(),
        check('description').isLength({ min: 5 }),
        check('address').not().isEmpty()
    ]
    , updatePlaceById);
//delete place
router.delete('/:placeId', deletePlaceById);
//get all places
router.get('/', getAllPlaces);
//post place
router.post('/',
    fileUpload.single('image'),
    [
        check('title').not().isEmpty(),
        check('description').isLength({ min: 5 }),
        check('address').not().isEmpty()
    ]
    , createNewPlace)
export default router;

