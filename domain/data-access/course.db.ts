import database from '../../util/database';
import { Course } from '../model/course';

const createCourse = async(course: Course): Promise<Course> => {
    try{
        const coursePrisma = await database.course.create({
            data:{
                name: course.getName(),
                credits: course.getCredits(),
                description: course.getDescription(),
                phase: course.getPhase()
            }
        })
        return Course.from(coursePrisma)
    }
    catch(error){
        console.error(error);
        throw new Error("see console for error")
    }
}
const getCourseById = async({id}:{id:number}): Promise<Course | null> => {
    try{
        const coursePrisma = await database.course.findUnique(
            {
                where: {id}
            }
        )
        return coursePrisma? Course.from(coursePrisma) : null
    }
    catch(error){
        console.error(error)
        throw new Error("see console for error")
    }
}
 export default{
    getCourseById,
    createCourse
 }