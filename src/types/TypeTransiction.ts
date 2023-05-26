export type transictionByUsername={
    auth:string,
    username:string
}

export type getTransiction ={
    debitedAccountId:string,
    creditAccountId:string
}

export type transictionByAccountId={
    auth:string,
    accountId:string
}

export type transictionBydebit={
    auth:string,
    debitTransiction:string
}



export type transictionByCredit={
    auth:string,
    creditTransiction:string
}