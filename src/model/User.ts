export class User {
    constructor(
        private id:string,
        private username: string,
        private password: string,
        private accountId:string
        ) {}

        public getId = () =>{
           return this.id
        }

        public getUsername = () =>{
           return this.username
        }
        public getPassword = () =>{
           return this.password
        }

        public getAccountId = () =>{
         return this.accountId
      }
       

        static toUserModel(index:any): User{
            return new User(index.id, index.username, index.password, index.accountId)
        }

}

