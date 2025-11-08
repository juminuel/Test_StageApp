import { Course } from "../domain/model/course";
import courseService from "../domain/data-access/course.db";

const getCourseById = async(id: number) : Promise<Course> => {
    const course = await courseService.getCourseById({id});
    if(!course) throw new Error(`course with ${id} does not exist`);
    return course;
}
export default {getCourseById}
