import database from "../../util/database";
import { Student } from "../model/student";

const getAllStudents = async(): Promise<Student[]> =>{
    try{
        const studentPrisma = await database.student.findMany({
            include: {
                user: {
                    include: {role: true}
                }
            }
        })
        return studentPrisma.map((student) => Student.from(student));
    }
    catch(error){
        console.error(error);
        throw new Error('see console for error');
    }
}
const getStudentById = async({id}: {id:number}): Promise<Student | null> => {
    try{
        const studentPrisma = await database.student.findUnique({
            where: {
                id
            },
            include: {
                user: {
                    include: {
                        role: true
                    }
                }
            }
        })
        return (studentPrisma? Student.from(studentPrisma) : null);
    }
    catch(error){
        console.error(error);
        throw new Error('see console for error')
    }
}
const createStudent = async(student: Student) : Promise<Student> => {
    try{
        const studentPrisma = await database.student.create({
            data: {
                studentnumber: student.getStudentNumber(),
                user: {
                    create: {
                        username: student.getUser().getUsername(),
                        firstName: student.getUser().getFirstname(),
                        lastName: student.getUser().getLastname(),
                        email: student.getUser().getEmail(),
                        password: student.getUser().getPassword(),
                        role: {
                            connect: {id: student.getUser().getRole().id}
                        }
                    }
                },
            },
            include: {
                user: {
                    include: {
                        role: true,
                    }
                }
            },
        })
        return Student.from(studentPrisma)
    }
    catch(error){
        console.error(error);
        throw new Error('see console for error');
    }
}
export default{
    getAllStudents, getStudentById, createStudent
}
