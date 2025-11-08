import express, {Request, Response} from 'express';
import courseService from '../service/course.service';

const courseRouter = express.Router();

courseRouter.get('/:id',async (req:Request,res: Response) => {
    try{
        const course = await courseService.getCourseById(Number(req.params.id));
        res.status(200).json(course);
    }
    catch(error){
        res.status(400).json({status: 'error',ErrorMessage: error.message})
    }
})

export {courseRouter}