import {User as UserPrisma} from '@prisma/client';
import {Role as RolePrisma} from '@prisma/client';
import {Role} from '../../types';

export class User {
    private id?: number;
    private username: string;
    private lastName: string;
    private firstName: string;
    private email: string;
    private password: string;
    private role: Role;
    constructor(user: {id?: number,username: string,lastName: string,firstName: string ,email: string,password: string,role: Role}){

    this.validate(user);
    this.id = user.id;
    this.username = user.username;
    this.lastName = user.lastName;
    this.firstName = user.firstName;
    this.email = user.email;
    this.password = user.password;
    this.role = user.role;
    }
    validate(user: {username: string,firstName: string,lastName: string,email: string,password:string,role: Role}){
        if(!user.username?.trim()){
            throw new  Error('username required');
        };
        if(!user.firstName?.trim()){
            throw new Error('firstname required');
        };
        if(!user.lastName?.trim()){
            throw new Error('lastname required');
        };
        if(!user.email?.trim()){
            throw new Error('email required');
        };
        if(!user.password?.trim()){
            throw new Error('password required');
        };
        if(!user.role){
            throw new Error('role required');
        }
    }
    getId(): number | undefined{
        return this.id;
    }
    getUsername(){
        return this.username
    }
    getFirstname(){
        return this.firstName
    }
    getLastname(){
        return this.lastName
    }
    getEmail(){
        return this.email
    }
    getPassword(){
        return this.password
    }
    getRole(){
        return this.role
    }
    equals(user: User): boolean{
        return (
            this.username === user.getUsername() &&
            this.firstName === user.getFirstname() &&
            this.lastName === user.getLastname() &&
            this.email === user.getEmail() &&
            this.password === user.getPassword() &&
            this.role === user.getRole()
        );
    }
    static from({id,username,firstName,lastName,email,password,role}: UserPrisma & {role: RolePrisma}){
        return new User({
            id,
            username,
            firstName,
            lastName,
            email,
            password,
            role: role as Role
        }
        )
    }
}