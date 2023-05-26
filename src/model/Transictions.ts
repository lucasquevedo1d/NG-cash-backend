export default class Transictions{
    constructor(    
        private id:string,
        private debitedAccountId:string,
        private creditAccountId:string,
        private createdAt:string,
        private value:number
        
){}

getId = () =>{
    return this.id
}

getdebitAccountId = () =>{
    return this.debitedAccountId
}

getCreditAccountId = () =>{
    return this.creditAccountId
}

getCreatedAt = () =>{
    return this.createdAt
}

getValue = () =>{
    return this.value
}

static toUserModel(index:Transictions): Transictions{
    return new Transictions(index.id, index.debitedAccountId, index.creditAccountId,index.createdAt, index.value)
}
}