import { Request, Response } from "express";
import TransictionsBusiness from "../business/TransictionsBusiness";
import UserdataBase from "../data/UserdataBase";
import { Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { transictionByCredit } from "../types/TypeTransiction";
import { transictionBydebit } from "../types/TypeTransiction";
import { transictionByAccountId } from "../types/TypeTransiction";

export default class TransictionController {
    getTransitctions = async (req: Request, res: Response) => {
        try {
            const auth = req.headers.authorization as string

            const {accountId} = req.params

            const input: transictionByAccountId = {
                auth,
                accountId
            }

            const result = await new TransictionsBusiness(new IdGenerator(), new HashManager(), new Authenticator(), new UserdataBase()).getTransictionsByName(input)

            res.status(200).send({ message: result })

        } catch (error: any) {
            res.status(404).send({ message: error.message })

        }

    }

    getTransictionsDebit = async (req: Request, res: Response) => {
        try {
            const auth = req.headers.authorization as string

            const { debitTransiction } = req.params

            const input: transictionBydebit = {
                auth,
                debitTransiction
            }

            const result = await new TransictionsBusiness(new IdGenerator(), new HashManager(), new Authenticator(), new UserdataBase()).getTransictionByDebit(input)

            res.status(200).send({ message: result })
        } catch (error: any) {
            res.status(404).send({ message: error.message })

        }

    }

    getTransictionsCredit = async (req: Request, res: Response) => {
        try {
            const auth = req.headers.authorization as string

            const { creditTransiction } = req.params

            const input: transictionByCredit = {
                auth,
                creditTransiction
            }

            const result = await new TransictionsBusiness(new IdGenerator(), new HashManager(), new Authenticator(), new UserdataBase()).getTransictionByCredit(input)

            res.status(200).send({ message: result })

        } catch (error: any) {
            res.status(404).send({ message: error.message })

        }

    }
}