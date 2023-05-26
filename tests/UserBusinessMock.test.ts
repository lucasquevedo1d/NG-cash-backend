import { UserBusiness } from "../src/business/UserBusiness";
import { HashGenratorMock } from "./mock/HashGeneratorMock";
import { IdGeneratorMock } from "./mock/IdGeneratorMock";
import { AuthenticatorMock } from "./mock/AuthenticatorMock";
import UserDataBaseMock from "./mock/UserDataBaseMock";
import UserdataBase from "../src/data/UserdataBase";



export const UserBusinessMock = new UserBusiness(
    new IdGeneratorMock(),
    new HashGenratorMock(),
    new AuthenticatorMock() as any,
    new UserDataBaseMock() as UserdataBase
)

describe("Testando o Sign up", () => {
    test("Deve retornar erro quando o campo de username está vazio", async () => {
        try {

            await UserBusinessMock.signupBusiness({username:"", password:"12345678"})

        } catch (error: any) {
            expect(error.message).toEqual("Preencha todos os campos");

        } finally {
            expect.assertions(1)
        }
    })

    test("Deve retornar erro quando o campo de username está com menos de 3 carácteres", async () => {
        try {

            await UserBusinessMock.signupBusiness({username:"lu", password:"12345678"})

        } catch (error: any) {
            expect(error.message).toEqual("O campo nome deve ter mais de três caracteres");

        } finally {
            expect.assertions(1)
        }
    })

    test("Deve retornar erro quando o campo de password está com menos de 8 carácteres", async () => {
        try {

            await UserBusinessMock.signupBusiness({username:"lucas", password:"1234567"})

        } catch (error: any) {
            expect(error.message).toEqual("a senha deve ter no minímo de 8 caracteres");

        } finally {
            expect.assertions(1)

        }
    })


    test("Login com sucesso", async () => {
        try {
            const user1 = {
                username:"Lucas",
                password:"12345678"
            }

           const acessToken  = await UserBusinessMock.signupBusiness(user1)
            expect(acessToken).toEqual("token");

        } catch (error: any) {
            console.log(error)
        }
    })
})