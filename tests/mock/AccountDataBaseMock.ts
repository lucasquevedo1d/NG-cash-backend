import { AccountMock } from "./AccountMock"

export class AccountDataBaseMock {
    getAccountById = async (index: any) => {
            switch(index){
                case "1":
                return AccountMock
                default:
                    return undefined
            }
       
    }

    putAccountBusiness = async (index:any) =>{
        switch(index){
            case "1":
            return AccountMock
            default:
                return undefined
        }
    }
}

