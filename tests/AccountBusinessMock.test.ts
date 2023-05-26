import AccountBusiness from "../src/business/AccountBusiness";
import UserdataBase from "../src/data/UserdataBase";
import { AuthenticatorMock } from "./mock/AuthenticatorMock";
import { HashGenratorMock } from "./mock/HashGeneratorMock";
import { IdGeneratorMock } from "./mock/IdGeneratorMock";

export const AccountBusinessMock = new AccountBusiness(
    new IdGeneratorMock(),
    new HashGenratorMock(),
    new AuthenticatorMock() as any,
    new UserdataBase()
)

describe("Testando o Account", () =>{
    test("deve retornar o erro quando o id estiver vazio", async () =>{
        try {
            await AccountBusinessMock.putAccountBusiness({auth:"", username:"lucas", balance:150, accountId:"1"})
        } catch (error:any) {
            expect(error.message).toEqual("Preencha todos os campos corratamante")
        } finally{
            expect.assertions(1)
        }
    })


    test("deve retornar o erro quando o id estiver vazio", async () =>{
        try {
            await AccountBusinessMock.getAccountById({id:""})
        } catch (error:any) {
            expect(error.message).toEqual("Ação não permitida verifique se está logado corretamente!");

        } finally{
            expect.assertions(1)
        }
    })

    

})