import { TrasictionsDataBase } from "../data/TransictionsDataBase";
import UserdataBase from "../data/UserdataBase";
import { Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { transictionByAccountId, transictionByCredit, transictionBydebit } from "../types/TypeTransiction";

export default class TransictionsBusiness{
    constructor(
        private idGenerator: IdGenerator,
        private hashManager: HashManager,
        private tokenGenerator: Authenticator,
        private userDataBase: UserdataBase
    ){}
    getTransictionsByName = async (params:transictionByAccountId) =>{

        const {auth, accountId} = params 


        if(!auth){
            throw new Error("Você precisa estar logado para realizar essa ação");
        }

        if(!accountId){
            throw new Error("Você precisa passar o id do usuário para essa operação");
        }

        const verifyAuth = await this.tokenGenerator.getTokenData(auth)

        if (!verifyAuth) {
            throw new Error("Usuário precisa estar logado!")
        }

        const getfindUserName = await this.userDataBase.findUserbyId(accountId)

        if(!getfindUserName){
            throw new Error("Usuário não encontrado");
        }


       const result = await new TrasictionsDataBase().getTransicntionsById(getfindUserName.getAccountId() as any) 

        return result
    }

    getTransictionByDebit = async (params:transictionBydebit) =>{
        const {auth, debitTransiction} = params

        if(!auth){
            throw new Error("Você precisa estar logado para realizar essa ação");
        }

        if(!debitTransiction){
            throw new Error("Você precisa passar o debitId do usuário para essa operação");
        }

        const verifyAuth = await this.tokenGenerator.getTokenData(auth)

        if (!verifyAuth) {
            throw new Error("Usuário precisa estar logado!")
        }

        const getfindUserName = await this.userDataBase.findUserbyId(debitTransiction)

        if(!getfindUserName){
            throw new Error("Usuário não encontrado");
        }

        const accountId = getfindUserName.getAccountId() as any


       const result = await new TrasictionsDataBase().getTransicntionsDebit(accountId)

        return result

    }

    getTransictionByCredit = async (params:transictionByCredit) =>{
        const {auth, creditTransiction} = params


        if(!auth){
            throw new Error("Você precisa estar logado para realizar essa ação");
        }

        if(!creditTransiction){
            throw new Error("Você precisa passar o nome do usuário para essa operação");
        }

        const verifyAuth = await this.tokenGenerator.getTokenData(auth)

        if (!verifyAuth) {
            throw new Error("Usuário precisa estar logado!")
        }

        const getfindUserName = await this.userDataBase.findUserbyId(creditTransiction)

        if(!getfindUserName){
            throw new Error("Usuário não encontrado");
        }

        const accountId = getfindUserName.getAccountId() as any


       const result = await new TrasictionsDataBase().getTransicntionsCredit(accountId)

        return result

    }
}