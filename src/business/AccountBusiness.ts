import AccountDataBase from "../data/AccountDataBase";
import { TrasictionsDataBase } from "../data/TransictionsDataBase";
import UserdataBase from "../data/UserdataBase";
import Transictions from "../model/Transictions";
import { Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { postBalance, postBalanceDTO } from "../types/TypeAccountDTO";

export default class AccountBusiness{
    constructor(
        private idGenerator: IdGenerator,
        private hashManager: HashManager,
        private tokenGenerator: Authenticator,
        private userDataBase: UserdataBase
    ){}
    getAccountById = async (index:any)=>{
       const {auth, id} = index

        if(!auth || !id ){
            throw new Error("Ação não permitida verifique se está logado corretamente!");
        }

        const balance = await new AccountDataBase().findbyId(id)
     


        if(!balance){
            throw new Error("Saldo não encontrado, verfique se passou o id corretamente");
        }

        return balance
    }

    putAccountBusiness = async (index:postBalanceDTO) =>{
        const{accountId, auth, username, balance} = index

        if(!accountId || !auth || !username || !balance){
            throw new Error("Preencha todos os campos corratamante");
        }


        if(!username){
            throw new Error("Usuário deve passar o id");
        }

        const findMyId = await new AccountDataBase().findbyId(accountId)

        if(!findMyId){
            throw new Error("ID de conta invalido");
        }

        const availableBalance = await findMyId.getBalance() - balance


        if(availableBalance < 0){
            throw new Error("Saldo insufuciente");
        }
        const findUsername = await this.userDataBase.findbyName(username)

        if(findUsername.getAccountId() === accountId){
            throw new Error("Usuário não pode mandar dinheiro pra si mesmo");
            
        }
        
        const findAccount = await new AccountDataBase().findbyId(findUsername.getAccountId()) 

        const cashIn = findAccount.getBalance() + balance
        

        const id = findAccount.getId()

        if(!findUsername){
            throw new Error("Usuário não encontrado!")
        }



        if(!balance){
            throw new Error("Usuário precisa passar o valor do deposito");
            
        }

        const verifyAuth = await this.tokenGenerator.getTokenData(auth)
        
        if (!verifyAuth) {
            throw new Error("Usuário precisa estar logado!")
        }
        
        const post:postBalance = {
            id:id,
            auth,
            balance:cashIn
        }


        const debit:postBalance = {
            id:accountId,
            auth,
            balance:availableBalance
        }


        const transitionId = await this.idGenerator.generator()

        const date = new Date()
        const formatter = Intl.DateTimeFormat("pt-BR",{
            dateStyle:"short"
        })

        const transactionDate = formatter.format(date) as any

        const insertTransition = new Transictions(transitionId, accountId, findAccount.getId(), transactionDate, balance)

        const result = await new AccountDataBase().putAccount(post)

        if(result){
            await new AccountDataBase().putAccount(debit)
            await new TrasictionsDataBase().createTransiction(insertTransition)
        }

        if(!result){
            throw new Error("Erro na transeferencia!");
            
        }
        
        return result
    }
}