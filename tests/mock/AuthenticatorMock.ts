import * as jwt from "jsonwebtoken"


export interface AuthenticatorData {
    id: string

}

export class AuthenticatorMock {
    generate(payload: string): string {

        return "token"
    }

    getTokenData(token: string):string {
        token = "token"
        return token 
    }

}