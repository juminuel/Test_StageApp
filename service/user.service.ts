import { User } from "../domain/model/user";
import UserDB from '../domain/data-access/user.db';
import { generateJwtToken } from "../util/jwt";
import bcrypt from 'bcrypt';
import {userInput, authenticationResponse}  from "../types";
import userDb from "../domain/data-access/user.db";

const getAllUsers = async() : Promise<User[]> => await UserDB.getAllUsers();

const getUserByUsername = async({username}: {username: string}): Promise<User> => {
    const user = await UserDB.getUserByUserName({username});
    if (!user) throw new Error(`user with username ${username} does not exists`);
    return user;
}

const authenticate = async({username, password}: userInput): Promise<authenticationResponse> => {
    const user = await getUserByUsername({username});
    const passwordCorrect = bcrypt.compare(password,user.getPassword());
    if(!passwordCorrect) throw new Error(`password for user with username ${username} is not vallid`);
    return {
        token: generateJwtToken({username,role: user?.getRole() }),
        username: user.getUsername(),
        fullname: `${user.getFirstname()}${user.getLastname()}`,
        role: user.getRole().name,
    }
}
const createUser = async({username,password,firstName,role,lastName,email}: userInput): Promise<User> => {
    const userExists = await UserDB.getUserByUserName({username});
    if(!userExists) throw new Error(`user with username ${username} already exists`);
    const passwordHashed = await bcrypt.hash(password,12);
    const newUser = new User({
        username,
        firstName,
        lastName,
        password: passwordHashed,
        email,role
    })
    const createdUser = await userDb.createUser(newUser);
    return createdUser;
}

export default {getAllUsers,getUserByUsername,authenticate,createUser}