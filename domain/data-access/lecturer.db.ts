import database from "../../util/database";
import { Lecturer } from "../model/lecturer";
import {Course} from "../model/course";

const getAllLecturers = async({}): Promise<Lecturer[]> => {
    try{
        const lecturerPrisma = await database.lecturer.findMany({
            include: {
                courses: true,
                user: {
                    include: {role: true}
                }
            },
            
        })
        return (lecturerPrisma.map((lecturer) => Lecturer.from(lecturer)))
    }
    catch(error){
        console.error(error);
        throw new Error('see console for error');
    }
}
const createLecturer = async(lecturer: Lecturer): Promise<Lecturer> =>{
    try{
        const lecturerPrisma = await database.lecturer.create({
            data: {
                expertise: lecturer.getExpertise(),
                user: {
                    create: {
                        username: lecturer.getUser().getUsername(),
                        firstName: lecturer.getUser().getFirstname(),
                        lastName: lecturer.getUser().getLastname(),
                        password: lecturer.getUser().getPassword(),
                        email: lecturer.getUser().getEmail(),
                        role: {
                            connect: {
                                id: lecturer.getUser().getRole().id
                            }
                        }
                    },
                },
                courses: {
                    connect: lecturer.getCourses().map((course) => ({id: course.getId()}))
                }
                
            },
            include: {
                courses: true,
                user: {
                    include: {role: true}
                }
            }
        })
        return Lecturer.from(lecturerPrisma)
    }
    catch(error){
        console.error(error);
        throw new Error('see console for error');
    }
}
const getLecturerById = async({id}: {id:number}): Promise<Lecturer | null> =>{
    try{
        const lecturerPrisma = await database.lecturer.findUnique({
            where: {id},
            include:{
                user: {
                    include:{
                        role: true,
                    },
                },
                courses: true,
            }
        })
        return (lecturerPrisma ? Lecturer.from(lecturerPrisma): null);
    }
    catch(error){
        console.error(error);
        throw new Error('see console for error');
    }
}
export default{
    getAllLecturers,createLecturer,getLecturerById
}