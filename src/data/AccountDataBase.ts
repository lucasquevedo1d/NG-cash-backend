import { Account } from "../model/Account";
import { postBalance } from "../types/TypeAccountDTO";
import { BaseDataBase } from "./BaseDatabase";

export default class AccountDataBase extends BaseDataBase{
    insertAccount = async (index:Account) =>{
        const account = await BaseDataBase.connection("Accounts")
        .insert({
            id:index.getId(),
            balance:index.getBalance()
    })
        return account
    }

    accountDefault = async (index:any) =>{
        const accountDefault = await BaseDataBase.connection("Accounts")
        .insert({
            id:index
        })
        return accountDefault
    }
    
    putAccount = async (params:postBalance) =>{
        try {
            const account = await BaseDataBase.connection("Accounts")
            .update({balance:params.balance})
            .where("id", params.id)
             return account
        } catch (error:any) {
            throw new Error(error.message || error.sqlMessage);
            
        }
       
    }



    findbyId = async (id: string) => {
        try {
            const account = await AccountDataBase.connection("Accounts")
                .select("*")
                .where({ id })
            return account[0] && Account.toUserModel(account[0])
        } catch (error: any) {
            throw new Error(error.message || error.sqlMessage);

        }
    }


    deleteAccountById = async (id:string) =>{
        const deleteAccount = await BaseDataBase.connection("Accounts") 
        .delete()
        .where({id})
        return deleteAccount
    }
}