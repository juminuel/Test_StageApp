import database from "../../util/database";
import { User } from "../model/user";

const getAllUsers = async() : Promise<User[]> =>{
    try{
        const UserPrisma = await database.user.findMany({
            include: {role: true}
        })
        return (UserPrisma.map((user) => User.from(user)))
    }
    catch(error){
        console.error(error)
        throw new Error("see console for error")
    }
}
const getUserById = async({id}:{id:number}): Promise<User | null> => {
    try{
        const userPrisma = await database.user.findUnique({
            where: {
                id
            },
            include: {
                role: true
            },
        })
        return (userPrisma ? User.from(userPrisma): null)
    }
    catch(error){
        console.error(error);
        throw new Error("see console for error")
    }
}
const getUserByUserName = async({username}:{username:string}): Promise<User | null>=> {
    try{
        const userPrisma = await database.user.findUnique({
            where: {username},
            include: {
                role: true
            }
        })
        return (userPrisma ? User.from(userPrisma): null)
    }
    catch(error){
        console.error(error);
        throw new Error("see console for error");
    }
}
const createUser = async(user: User): Promise<User> => {
    try{
        const userPrisma = await database.user.create({
            data: {
                username: user.getUsername(),
                firstName: user.getFirstname(),
                lastName: user.getLastname(),
                password: user.getPassword(),
                email: user.getEmail(),
                role: {
                    connect: {id: user.getRole().id},
                    },
            },
            include: {
                role: true
            }

        })
        return User.from(userPrisma);
    }
    catch(error){
        console.error(error);
        throw new Error("see console for error");
    }
}
export default {
    getAllUsers, getUserById, createUser, getUserByUserName,
}