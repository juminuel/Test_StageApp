import { PrismaClient} from "@prisma/client";
import bcrypt from 'bcrypt';
import {set} from 'date-fns';

const prisma = new PrismaClient();

const main = async() =>{
    await prisma.schedule.deleteMany();
    await prisma.course.deleteMany();
    await prisma.student.deleteMany();
    await prisma.lecturer.deleteMany();
    await prisma.user.deleteMany();
    await prisma.role.deleteMany();

    const adminRole = await prisma.role.create({
        data: {name : 'admin',},
    });
    const lecturerRole = await prisma.role.create({
        data: {
            name: 'lecturer',
        },
    });
    const studentRole = await prisma.role.create({
        data: {
            name: 'student',
        },
    });
    const admin = await prisma.user.create({
        data: {
            username:'administrator',
            firstName: 'Thomas',
            lastName: 'VanDijk',
            email: 'admin@ucll.be',
            role: {
                connect:{id: adminRole.id}
            },
            password: await bcrypt.hash('test1',12),
        },
    });
    const userLecturer1 = await prisma.user.create({
        data: {
            username:'JohnWick',
            firstName: 'John',
            lastName: 'Wick',
            email: 'johnwick@ucll.be',
            role: {
                connect:{id: lecturerRole.id}
            },
            password: await bcrypt.hash('johnwick',12),
        },
    });
    const userLecturer2 = await prisma.user.create({
        data: {
            username: 'gertje',
            firstName: 'gert',
            lastName: 'vos',
            email: 'gert.vos@ucll.be',
            role: {connect: {id: lecturerRole.id}},
            password: await bcrypt.hash('gertje',12),
        },
    });
    const userStudent1 = await prisma.user.create({
        data: {
            username: 'emmanu',
            firstName: 'emmanuel',
            lastName: 'jumelin',
            email: 'emmanuel.jumelin@ucll.be',
            role: {connect: {id: studentRole.id}},
            password: await bcrypt.hash('emmanu',12),
        },
    });
    const userStudent2 = await prisma.user.create({
        data: {
            username: 'katrienvdb',
            firstName: 'katrien',
            lastName: 'vdb',
            email: 'katrien.vdb@ucll.be',
            role: {connect: {id: studentRole.id}},
            password: await bcrypt.hash('kat',12),
        },
    });

    const fullstack = await prisma.course.create({
        data: {
            name: 'fullstack',
            description: 'develop frond and back-end',
            phase: 1,
            credits: 6,
        },
    });
    const backend = await prisma.course.create({
        data: {
            name: 'backend',
            description: 'develop only back-end',
            phase: 1,
            credits: 6,
        },
    });
    const GertVosLecturer = await prisma.lecturer.create({
       data: {
            expertise: '.net',
            user: {connect: {id: userLecturer1.id}},
            courses: {connect: [{id: fullstack.id},{id: backend.id}]},
       },
    });
    const emmanuelStudent = await prisma.student.create({
        data: {
            studentnumber: '11304458',
            user: {connect: {id: userStudent1.id}},
        },
    });
    const katrienStudent = await prisma.student.create({
        data: {
            studentnumber: '11304459',
            user: {connect: {id: userStudent2.id}},
        },
    });
    const scheduleFullstack = await prisma.schedule.create({
        data: {
            start: set(new Date(),{hours: 8, minutes: 30}),
            end: set(new Date(),{hours: 10,minutes: 0}),
            course: {connect: {id: fullstack.id}},
            lecturer: {connect: {id: GertVosLecturer.id}},
            students: {connect: [{id: emmanuelStudent.id},{id: katrienStudent.id}]}
        },
    });

};
(async () => {
    try{
        await main();
        await prisma.$disconnect();
    }
    catch(error){
        console.error(error);
        await prisma.$disconnect();
        process.exit(-1);

    }
})();