/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Returns all users
 */
import express,{Request,Response,NextFunction} from 'express';
import userService from '../service/user.service';
import { userInput } from '../types';

const userRouter = express.Router();

userRouter.get('/',async (req: Request,res: Response,next: NextFunction) => {
    try{
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    }
    catch(error){
        next(error);
    };

});
userRouter.post('/login',async(req: Request,res: Response,next: NextFunction) => {
    try{
const userCasted = <userInput>req.body
    const authResponse = await userService.authenticate(userCasted);
    res.status(200).json({message: 'authentication successfull',...authResponse})
    }
    catch(error){
        next(error);
    }
})

userRouter.post('/signup',async (req: Request,res: Response,next: NextFunction) => {
    try{
        const userCast = <userInput>req.body
        const newUser = await userService.createUser(userCast);
        res.status(200).json(newUser);
    }
    catch(error){
        next(error);
    }
})
;
export {userRouter};