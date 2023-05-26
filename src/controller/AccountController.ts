import { Request, Response } from "express"
import AccountBusiness from "../business/AccountBusiness"
import UserdataBase from "../data/UserdataBase"
import { Authenticator } from "../services/Authenticator"
import { HashManager } from "../services/HashManager"
import { IdGenerator } from "../services/IdGenerator"
import { postBalanceDTO } from "../types/TypeAccountDTO"

export default class AccountController {
    getBalance = async (req: Request, res: Response) => {
        try {
            const auth = req.headers.authorization as string
            const { id } = req.params
    
            const input = {
                auth,
                id
            }

    
            const result = await new AccountBusiness(new IdGenerator(),new HashManager(), new Authenticator(), new UserdataBase()).getAccountById(input)
            res.status(200).send({ message: result })
        } catch (error:any) {
            res.status(404).send({ message: error.message })

        }
       
    }


    putAccount = async (req: Request, res: Response) => {
        try {
            const auth = req.headers.authorization as string
        const { accountId, username, balance } = req.body
        const post: postBalanceDTO = {
            accountId,
            auth,
            username,
            balance
        }

        await new AccountBusiness(new IdGenerator(),new HashManager(), new Authenticator(), new UserdataBase()).putAccountBusiness(post)

        res.status(201).send({ message: `Transação realizada com sucesso` })
            
        } catch (error:any) {
            res.status(400).send({ message: error.message })

        }
        
    }
}