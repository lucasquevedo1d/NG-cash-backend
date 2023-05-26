import Transictions from "../model/Transictions";
import { getTransiction } from "../types/TypeTransiction";
import { BaseDataBase } from "./BaseDatabase";

export class TrasictionsDataBase extends BaseDataBase{
    createTransiction = async(params:Transictions) =>{
       await  BaseDataBase.connection("Transactions") 
       .insert({
        id:params.getId(),
        debitedAccountId:params.getdebitAccountId(),
        creditAccountId:params.getCreditAccountId(),
        createdAt:params.getCreatedAt(),
        value:params.getValue()
        
    })
    }

   getTransicntionsById = async (params:getTransiction) =>{
        const result = await BaseDataBase.connection("Transactions")
        .select("*")
        .join("Users10", "Users10.accountId", "debitedAccountId")
        .where("debitedAccountId", params)
        .orWhere("creditAccountId", params)
        return result
    }
    
    getTransicntionsDebit = async (params:getTransiction) =>{
        const result = await BaseDataBase.connection("Transactions")
        .select("*")
        .join("Users10", "Users10.accountId", "creditAccountId")
        .where("debitedAccountId", params)
        return result
    }

    getTransicntionsCredit = async (params:getTransiction) =>{
        const result = await BaseDataBase.connection("Transactions")
        .select("*")
        .join("Users10", "Users10.accountId", "debitedAccountId")
        .where("creditAccountId", params)
        return result
    }
}