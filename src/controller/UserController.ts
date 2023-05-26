import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import UserdataBase from "../data/UserdataBase";
import { Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { signupInputDTO } from "../types/TypeUser";

export class Usercontroller {
     signup = async (req:Request, res:Response) =>{
        try {
            const {username, password} = req.body 
    
            const input:signupInputDTO ={
                username,
                password
            }

            console.log(input)
    
            const result = await new UserBusiness(new IdGenerator(),new HashManager(), new Authenticator(),new UserdataBase()).signupBusiness(input)
            res.status(201).send({message: "Usuário criado com sucesso!",token:result.token ,accountId:result.accountId})
        } catch (error:any) {
            res.status(500).send({message: error.message})
        }
    }

    login = async (req:Request, res:Response) =>{
        try {
            const {username, password} = req.body 

            const input:signupInputDTO ={
                username,
                password
            }
            const result = await new UserBusiness(new IdGenerator(),new HashManager(), new Authenticator(),new UserdataBase()).loginBusiness(input)
            res.status(201).send({message: "Usuário logado com sucesso!",token:result.token ,accountId:result.accountId})
        } catch (error:any) {
            res.status(404).send({message: error.message})

        }
    }

    getAllUser = async(req:Request, res:Response) =>{
        try {
            const auth = req.headers.authorization as string
            
            const result = await new UserBusiness(new IdGenerator(), new HashManager(), new Authenticator(), new UserdataBase()).GetAllUserBusiness(auth)
            res.status(202).send({message:result})
            
        } catch (error:any) {
            res.status(404).send({message:error.message})
        }
    }

    getUserById = async (req:Request, res:Response) =>{
        try {
            const auth = req.headers.authorization as string
            const accountId = req.params

            const index={
                auth,
                accountId
            }

            const result = await new UserBusiness(new IdGenerator(), new HashManager(), new Authenticator(), new UserdataBase()).getUserById(index)
            res.status(201).send({message:result})
        } catch (error:any) {
            res.status(404).send({message:error.message})
        }
    }
}

