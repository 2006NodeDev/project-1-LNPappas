import { QueryResult, PoolClient } from "pg";
import { connectionPool } from ".";
import { User } from "../../models/User";
import { UserDTOtoUserConvertor } from "../../util/UserDTO-to-User-converter";
import { AuthenticationFailureError } from "../../errors/AuthenticationFailureError";

export async function getAllUsers():Promise<User[]>{
    let client:PoolClient;
    try {
        client = await connectionPool.connect();
        let results:QueryResult = await client.query(`select u.user_id, u.username, u.password, u.first_name, u.last_name, u.email, u.description, u.image, r.role_id, r."role" 
                                                        from ers.users u
                                                        join ers.roles r on u."role" = r.role_id
                                                        group by u.user_id, u.username, u.first_name, u.last_name, u.email, u.description, u.image, r.role_id, r."role"
                                                        order by u.user_id;`);
        
        if (results.rowCount === 0){
            throw new Error('No Users Found');
        }
        return results.rows.map(UserDTOtoUserConvertor);
        
    } catch (error) {
        if (error.message === "No Users Found"){
            console.log(error);
            throw new Error(error.message);
        }
        throw new Error('Unknown Error');
    } finally {
        client && client.release();
    }
}

export async function getUserByUserNameAndPassword(username:string, password:string):Promise<User>{
    let client:PoolClient;
    try {
        client = await connectionPool.connect();
        let results = await client.query(`select u.user_id, u.username, u.password, u.first_name, u.last_name, u.email, u.description, u.image, r.role_id, r."role" 
                                            from ers.users u
                                            join ers.roles r on u."role" = r.role_id
                                            where u."username" = $1 and u."password" = $2
                                            group by u.user_id, u.username, u.first_name, u.last_name, u.email, u.description, u.image, r.role_id, r."role"`,
                                            [username, password]); // paramaterized queries, pg auto sanitizes

        if (results.rowCount === 0){
            throw new Error('User Not Found');
        }
        return UserDTOtoUserConvertor(results.rows[0]);
        
    } catch (error) {
        throw new AuthenticationFailureError();
    } finally{
        client && client.release();
    }
}

export async function getUsersById(id:number):Promise<User>{
    let client:PoolClient;
    try {
        client = await connectionPool.connect();
        let results:QueryResult = await client.query(`select u.user_id, u.username, u.password, u.first_name, u.last_name, u.email, u.description, u.image, r.role_id, r."role" 
        from ers.users u
        join ers.roles r on u."role" = r.role_id
        where u.user_id = $1`, [id]);
        return UserDTOtoUserConvertor(results.rows[0]);

    } catch (error) {
        if (error.message === "User Not Found"){
            console.log(error);
            throw new Error(`The User was ${error.message}`);
        }
        throw new Error('Unknown Error getUserById');
    } finally {
        client && client.release();
    }
}

export async function updateOneUser(updatedUser:User):Promise<User>{
    let client:PoolClient
    try{
        client = await connectionPool.connect()

        await client.query(`update ers.users u
                                set username = $1, password = $2, first_name = $3, last_name = $4, email = $5, description = $6, image = $7, "role" = $8
                                where u.user_id = $9`, [updatedUser.username, updatedUser.password, updatedUser.firstName, updatedUser.lastName, updatedUser.email, updatedUser.description, updatedUser.image, updatedUser.role.roleId, updatedUser.userId])
        return getUsersById(updatedUser.userId);

    }catch(e){
        console.log(e)
        throw new Error('Unhandled Error Occured updateUser()')
    }finally{
        client && client.release();
    }
}

export async function getNewUser(newUser:User):Promise<User>{
    let client:PoolClient
    try{
        client = await connectionPool.connect()
        console.log(`new user ${newUser.username}`);
        
        await client.query(`insert into ers.users("username","password","first_name", 
                                "last_name", "email", "description", "image", "role")
                                values	($1, $2, $3, $4, $5, $6, $7, $8)`, 
                                [newUser.username, newUser.password, newUser.firstName, 
                                newUser.lastName, newUser.email, newUser.description, newUser.image, newUser.role.roleId])
        return getUserByUserNameAndPassword(newUser.username, newUser.password);
    }catch(e){
        console.log(e)
        throw new Error('Unhandled Error Occured getNewUser()')
    }finally{
        client && client.release();
    }
}

            
// `update ers.users 
// set "username" = $1, "password" = $2, "first_name" = $3, "last_name" = $4, "email" = $5, "role" = $6, "description" = $7, "image" = $8,
// where user_id = $9`,
// [updatedUser.username, updatedUser.password, updatedUser.firstName, updatedUser.lastName, updatedUser.email, updatedUser.role.roleId, updatedUser.description, updatedUser.image, updatedUser.userId]