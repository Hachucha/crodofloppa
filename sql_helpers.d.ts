
export class QueryConf {
    prefixes: string[];
    prefixValues: any[];
    postfixes: string[];
    postfixValues: any[];
    operation: string;
    table: string;
    fields: string[];
    fieldValues: any[];
    joins: string[];
    where: string[];
    whereValues: any[];
    order: string[];
    page: number;
    pageSize: number;
    sql: string;
    values: any[];
    groupBy: string[];

    prepare(): QueryConf;
}

export function removeLastComma(text: string): string;

export class PreparedSQL {
    sql: string;
    values: any[];
    constructor(sql: string, values: any[]);
}