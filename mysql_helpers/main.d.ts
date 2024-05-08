interface transaction {
    query(sql:string, values : any[])
    rollback()
}

export class Querier {
    constructor(dbConfig : any)
    query (sql:string, values : any[]) : any
    transaction () : Promise<transaction>
}