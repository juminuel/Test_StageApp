import {User as UserPrisma,Role as RolePrisma,Student as StudentPrisma} from '@prisma/client';
import { Role } from '../../types';
import { User } from './user';

export class Student{
    private id?: number | undefined;
    private studentnumber: string;
    private user: User;
    constructor(student: {id?: number;studentnumber: string;user: User}){
        this.validate(student);
        this.id = student.id;
        this.studentnumber = student.studentnumber;
        this.user = student.user;
    }
    validate(student: {id?: number;studentnumber: string;user: User}){ 
        if (!student.studentnumber){
        throw Error('studentnumber missing');};
        if (!student.user){
        throw Error('user missing');
        };
    }
    getId(){
        return this.id;
    }
    getUser(){
        return this.user;
    }
    getStudentNumber(){
        return this.studentnumber;
    }
    equals(student: Student): boolean{
        return (this.user === student.getUser() &&
        this.studentnumber === student.getStudentNumber() &&
        this.id === student.getId());
    }
    static from ({id,user,studentnumber}: StudentPrisma & {user: UserPrisma & {role: RolePrisma}}){
        return new Student(
            {
                id,
                user: User.from(user),
                studentnumber
            }
        )
    }
}

