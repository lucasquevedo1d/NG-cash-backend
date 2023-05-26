import { User } from "../../src/model/User";
import { UserMock } from "./UserMock";

export default class UserDataBaseMock {
    insertUser = async (params: any):Promise<User | undefined> => {
        return UserMock as any

    }


    findbyName = async (username: string): Promise<User | undefined> => {
        switch (username) {
            case "Lucas":
               return undefined
               default:
               return UserMock
        }
    }

    findUserbyId = async (id: string): Promise<User | undefined> => {
        switch (id) {
            case "1":
               return UserMock
               default:
               return undefined
        }
        
    }

    // findAllUsers = async () => {
    //     return UserMock

    // }
}