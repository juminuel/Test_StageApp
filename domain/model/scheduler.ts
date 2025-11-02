import {Course as CoursePrisma,
    Lecturer as LecturerPrisma,
    Student as StudentPrisma,
    User as UserPrisma,
    Role as RolePrisma,
    Schedule as SchedulePrisma} from '@prisma/client';
import { Course } from './course';
import { Lecturer } from './lecturer';
import { Student } from './student';
import { User } from './user';
import { Role } from '../../types';

export class Schedule{
    private id?: number;
    private start: Date;
    private end: Date;
    private course: Course;
    private lecturer: Lecturer;
    private students: Student[];
    constructor(schedule: {id?: number;start: Date;end: Date;course: Course;lecturer: Lecturer;students: Student[]}){
        this.validate(schedule);
        this.id = schedule.id;
        this.start = schedule.start;
        this.end = schedule.end;
        this.course = schedule.course;
        this.lecturer = schedule.lecturer;
        this.students = schedule.students;

    }
    validate(schedule: {id?: number;start: Date;end: Date;course: Course;lecturer: Lecturer;students: Student[]}){
        if(!schedule.start || !schedule.end){
            throw new Error('schedule or start are missing');
        };
        if(schedule.start < schedule.end){
            throw new Error('start cannot be after end time');
        };
        if(!schedule.course){
            throw new Error('course is missing');
        };
        if(!schedule.lecturer){
            throw new Error('lecturer missing');
        };
    }
    getId(): number | undefined{
        return this.id;
    }
    getStart(): Date{
        return this.start;
    }
    getEnd(): Date{
        return this.end;
    }
    getCourse(): Course{
        return this.course;
    }
    getLecturer(): Lecturer{
        return this.lecturer;
    }
    getStudents(): Student[]{
        return this.students;
    }
    addStudentToSchedule(student: Student){
        if(this.students.includes(student)){
            throw new Error('error already inroled in schedule');
        };
        if(!student){
            throw new Error('student missing');
        };
    }
    equals(schedule: Schedule): boolean{
        return (this.id === schedule.getId() &&
        this.course === schedule.getCourse() &&
        this.lecturer === schedule.getLecturer() &&
        this.start === schedule.getStart() &&
        this.end === schedule.getEnd() &&
        this.students.every((course,index) => course.equals(schedule.getStudents()[index])));
    }
    static from({id,course,students,lecturer,start,end}:SchedulePrisma & {course: CoursePrisma; students: (StudentPrisma & {user: UserPrisma & {role: RolePrisma}})[] ; lecturer: LecturerPrisma & {user: UserPrisma & {role: RolePrisma};courses: CoursePrisma[]}}){
        return new Schedule({
            id,
            start,
            end,
            course: Course.from(course),
            lecturer: Lecturer.from(lecturer),
            students: students.map((student) => Student.from(student)),
        })
    }
}
