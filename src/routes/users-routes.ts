import { Router } from 'express';
import { check } from 'express-validator'
import { getAllUsers, getUserById,userSignup,userLogin } from '../controller/user-controller';



//define routes
const router = Router();

//get single user with id
router.get('/:userId', getUserById);
//user signup
router.post('/signup',
            [
                check('name').isLength({min:3}),
                check('email').normalizeEmail().isEmail(),
                check('password').isLength({min:6})
            ]
            ,userSignup);
//user login
router.post('/login',
                   [
                    check('email').normalizeEmail().isEmail(),
                    check('password').isLength({min:6})
                  ]   
                ,userLogin);
//get all users
router.get('/', getAllUsers);

export default router;
