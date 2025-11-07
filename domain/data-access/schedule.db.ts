import database from "../../util/database";
import { Lecturer } from "../model/lecturer";
import { Schedule} from "../model/scheduler";

const createSchedule = async(schedule: Schedule): Promise<Schedule> =>{
    try{
        const schedulePrisma = await database.schedule.create({
            data: {
                start: schedule.getStart(),
                end: schedule.getEnd(),
                course: {
                    connect: {
                        id: schedule.getCourse().getId()
                    },
                },
                lecturer: {
                    connect: {
                        id: schedule.getLecturer().getId(),
                    },
                },
                students: {
                    connect: schedule.getStudents().map((student) => ({id: student.getId()})),
                    },
                },
            include:{
                course: true,
                lecturer: {
                    include: {
                        user: {
                            include: {role: true},
                        },
                        courses: true,
                    },
                },
                students: {
                    include:{
                        user: {
                            include: {
                                role: true,
                            },
                        },
                    },
                },
            },

        })
        return Schedule.from(schedulePrisma);
    }
    catch(error){
        console.error(error);
        throw new Error('see console for error');
    }
}
const updateStudentSchedule = async(schedule: Schedule): Promise<Schedule | null> => {
    try{
        const schedulePrisma = await database.schedule.update({
            where: {
                id: schedule.getId(),
            },
            data: {
                students: {
                    connect: schedule.getStudents().map((student)=>({id: student.getId()})),
                },
            },
            include:{
                students:{
                    include: {user: {include: {role : true}}}
                },
                lecturer:{
                    include: {
                        user: {include: {role : true}},
                        courses: true,
                    }
                },
                course: true,
            }
        })
        return (schedulePrisma? Schedule.from(schedulePrisma): null)
    }
    catch(error){
        console.error(error);
        throw new Error('see console for error');
    }
}
const getAllSchedules = async(): Promise<Schedule[]> =>{
    try{
        const schedulePrisma = await database.schedule.findMany({
        include: {
            lecturer: {
                include: {
                    courses: true,
                    user: {
                        include: {role: true},
                    },
                }
            },
            course: true,
            students: {
                include: {
                    user: {
                        include: {role: true},
                    },
                }
            },
        }
    });
    return (schedulePrisma.map((schedule) => Schedule.from(schedule)));
    }
    catch(error){
        console.error(error);
        throw new Error('see console for error');
    }
}
const getScheduleByid = async({id}: {id: number}): Promise<Schedule | null> =>{
    try{
        const schedulePrisma = await database.schedule.findUnique({
        where: {
            id: id,
        },
        include: {
            lecturer: {
                include: {
                    courses: true,
                    user: {
                        include: {role: true},
                    },
                },
            },
            course: true,
            students: {
                include: {
                    user: {
                        include: {role: true},
                    },
                },
            },
        },
        
    })
    return (schedulePrisma? Schedule.from(schedulePrisma) : null)
    }
    catch(error){
        console.error(error);
        throw new Error('see console for error');
    }
    
}
const getSchedulesForLecturerName = async({username}: {username: string}): Promise<Schedule[]> => {
    try{
        const schedulePrisma = await database.schedule.findMany({
            where: {
                lecturer: {
                    user: {
                        username: username,
                    },
                },
            },
            include: {
            lecturer: {
                include: {
                    courses: true,
                    user: {
                        include: {role: true},
                    },
                },
            },
            course: true,
            students: {
                include: {
                    user: {
                        include: {role: true},
                    },
                },
            },
        },
            
        })
        return (schedulePrisma.map((schedule) => Schedule.from(schedule)))
    }
    catch(error){
        console.error(error);
        throw new Error('see console for error');
    }
}
const getSchedulesByLecturerId = async({id}: {id: number}): Promise<Schedule[]> => {
    try{
        const schedulePrisma = await database.schedule.findMany({
            where: {
                id: id,
            },
            include: {
                course: true,
                students: {
                    include: {user: {include: {role: true}}}
                },
                lecturer: {
                    include: {
                        courses: true,
                        user: {include: {role: true}}
                    }
                },
            }
        })
        return (schedulePrisma.map((schedule) => Schedule.from(schedule)))
    }
    catch(error){
        console.error(error);
        throw new Error('see console for error');
    }
}
const getScheduleByLecturerAndCourse = async({courseId,LecturerId}: {courseId: number,LecturerId: number}): Promise<Schedule | null> => {
    try{
        const schedulePrisma = await database.schedule.findFirst({
            where: {
                courseId: courseId,
                lecturerId: LecturerId,
            },
            include: {
                lecturer: {
                    include: {
                        courses: true,
                        user: {
                            include: {
                                role: true,
                            },
                        },
                        
                    },
                },
                students: {
                    include: {
                        user: {
                            include: {
                                role: true,
                            },
                        },
                        
                    },
                },
                course: true,
            },
        });
        return (schedulePrisma? Schedule.from(schedulePrisma):  null)
    }
    catch(error){
        console.error(error);
        throw new Error('see console for error');
    }
}
export default{
    createSchedule,
    updateStudentSchedule,
    getAllSchedules,
    getScheduleByid,
    getSchedulesForLecturerName,
    getSchedulesByLecturerId,
    getScheduleByLecturerAndCourse,
}