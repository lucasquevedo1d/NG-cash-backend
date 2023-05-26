import { User } from "../model/User";
import { BaseDataBase } from "./BaseDatabase";

export default class UserdataBase extends BaseDataBase {

    insertUser = async (params: User):Promise<User | undefined> => {
        const user = await UserdataBase.connection("Users10")
            .insert({
                id: params.getId(),
                username: params.getUsername(),
                password: params.getPassword(),
                accountId: params.getAccountId()
            })
        return user && User.toUserModel(user)

    }


    findbyName = async (username: string): Promise<User> => {
        try {
            const user = await UserdataBase.connection("Users10")
                .select("*")
                .where({ username })
            return user[0] && User.toUserModel(user[0])
        } catch (error: any) {
            throw new Error(error.message || error.sqlMessage);

        }
    }

    findUserbyId = async (accountId: string): Promise<User| undefined> => {
        try {
            const user = await UserdataBase.connection("Users10")
                .select("*")
                .where({ accountId })
            return user[0] && User.toUserModel(user[0])
        } catch (error: any) {
            throw new Error(error.message || error.sqlMessage);

        }
    }

    findAllUsers = async () => {
        try {
            const result = await BaseDataBase.connection("Users10")
                .select("*")
            return result

        } catch (error: any) {
            throw new Error(error.message || error.sqlMessage);
            


        }

    }

    findeUserByAccountId = async (accountId:any) =>{
        try {
            const user = await UserdataBase.connection("Users10")
            .select("*")
            .where({ accountId })
        return user[0] && User.toUserModel(user[0])
        } catch (error:any) {
            throw new Error(error.message || error.sqlMessage);
        }
    }

}