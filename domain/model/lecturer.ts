import { Course as CoursePrisma,User as UserPrisma,Role as RolePrisma,Lecturer as LecturerPrisma} from "@prisma/client";
import { Course } from "./course";
import { User } from "./user";
import { Role } from "../../types";
export class Lecturer{
    private id?: number;
    private expertise: string;
    private user: User;
    private courses: Course[];
    constructor(lecturer: {id?: number;expertise: string; user: User; courses: Course[]}){
        this.validate(lecturer);
        this.id = lecturer.id;
        this.expertise = lecturer.expertise;
        this.user = lecturer.user;
        this.courses = lecturer.courses;
    }
    validate(lecturer: {expertise: string; user: User; courses: Course[]}){
        if(!lecturer.expertise?.trim()){
            throw Error("expertise needed")
        };
        if(!lecturer.user){
            throw Error("user needed")
        };
        if(!lecturer.courses){
            throw Error("courses needed")
        }
    }
    getId(): number | undefined{
        return this.id;
    }
    getExpertise(): string{
        return this.expertise;
    }
    getCourses(): Course[]{
        return this.courses;
    }
    getUser(): User{
        return (this.user);
    }
    equals(lecturer: Lecturer): boolean{
        return(
            this.id === lecturer.getId() &&
            this.expertise === lecturer.getExpertise() &&
            this.courses.every((course,index) => course.equals(lecturer.getCourses()[index])) && 
            this.user === lecturer.user
        );
    }
    
    static from({id,expertise,user, courses}: LecturerPrisma & {user: UserPrisma & {role: RolePrisma};courses: CoursePrisma[]}){
        return new Lecturer({
            id,
            expertise,
            user: User.from(user),
            courses: courses.map((course) => Course.from(course)),
        })
    }
}