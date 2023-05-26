import app from "./app";
import AccountController from "./controller/AccountController";
import TransictionController from "./controller/TransictionsController";
import { Usercontroller } from "./controller/UserController";

app.post("/user", new Usercontroller().signup)
app.post("/login", new Usercontroller().login)
app.get("/getAllUser", new Usercontroller().getAllUser)
app.get("/userByAccountId/:id", new Usercontroller().getUserById)
app.put("/balance", new AccountController().putAccount)
app.get("/balance/:id", new AccountController().getBalance)
app.get("/transiction/:accountId", new TransictionController().getTransitctions)
app.get("/debitTransiction/:debitTransiction", new TransictionController().getTransictionsDebit)
app.get("/creditTransiction/:creditTransiction", new TransictionController().getTransictionsCredit)