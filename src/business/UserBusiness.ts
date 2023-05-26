import AccountDataBase from "../data/AccountDataBase";
import { TrasictionsDataBase } from "../data/TransictionsDataBase";
import UserdataBase from "../data/UserdataBase";
import { Account } from "../model/Account";
import Transictions from "../model/Transictions";
import { User } from "../model/User";
import { Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { signupInputDTO } from "../types/TypeUser";

export class UserBusiness {
    constructor(
        private idGenerator: IdGenerator,
        private hashManager: HashManager,
        private tokenGenerator: Authenticator,
        private userDataBase: UserdataBase
    ){}
     signupBusiness = async (input:signupInputDTO)  => {
       try {
        const{username, password} = input

        if(!username || !password){
            throw new Error("Preencha todos os campos");
        }

        if(username.length < 3){
            throw new Error("O campo nome deve ter mais de três caracteres");
        }
        
        if(password.length < 8){
            throw new Error("a senha deve ter no minímo de 8 caracteres");

        }

        const findUser = await new UserdataBase().findbyName(username)
        if(findUser){
            throw new Error("Usuário já cadstrado!");
        }

       
        const accountId = await this.idGenerator.generator()


        const id = await this.idGenerator.generator()
        const hash = await this.hashManager.createHash(password) 

        
        const insertUser = new User(id, username, hash, accountId)

        await new AccountDataBase().accountDefault(accountId)


        const createUser = await this.userDataBase.insertUser(insertUser) 
        
        if(!createUser){
            const id2 = await new AccountDataBase().findbyId(accountId)
            await new AccountDataBase().deleteAccountById(id2.getId()) 
            throw new Error("Erro ao criar a conta!");
            
        }


        const token = await this.tokenGenerator.generate(id) 

        return ({token, accountId})
        
       } catch (error:any) {
        throw new Error(error.message || error.sqlMessage);
        
       }
        
    }

    loginBusiness = async (input:signupInputDTO) =>{
        try {
            const{username, password} = input
            

        if(!username || !password){
            throw new Error("Preencha todos os campos");
        }

        const findName =  await this.userDataBase.findbyName(username) 

        if(!findName){
            throw new Error("Usuário não encontrado");
        }
        
        const correctPass = await this.hashManager.compareHash(password, findName.getPassword() as string) 

        if(!correctPass){
            throw new Error("Senha incorreta");
        }

        const token = await this.tokenGenerator.generate(findName.getId())
        const accountId = findName.getAccountId()
        return ({token, accountId})

        } catch (error:any) {
            throw new Error(error.message || error.sqlMessage);

        }
        

    }

    GetAllUserBusiness = async (params:string) =>{
        try {
            const auth = params

            if(!auth){
                throw new Error("É necessário estar logado para ter acesso");
            }
              

            const result = await this.userDataBase.findAllUsers()
        return result
            
        } catch (error:any) {
            throw new Error(error.message || error.sqlMessage);
        }
    }

    getUserById = async (index:any) =>{
        try {
        const accountId = index

        if(!accountId){
            throw new Error("ID inválido"); 
        }

        const findByAccountId = this.userDataBase.findeUserByAccountId(accountId)


        if(!findByAccountId){
            throw new Error("ID não encontrado"); 
        }

        return findByAccountId
        } catch (error:any) {
            throw new Error(error.message || error.sqlMessage);
        }
    }


}