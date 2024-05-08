// finder.d.ts
import helpers from './sql_helpers';

export default class Finder {
    wide: boolean;
    fields: string[];
    page?: number;
    pageSize?: number;
    queryConf: helpers.QueryConf;

    constructor(querier: any);

    withFields(fields: string[]): this;

    checkPagination(): void;

    paginate(pageSize: number, page?: number): this;

    pagesCount(): Promise<number>;

    count(): Promise<number>;

    one(): Promise<any>;

    all(): Promise<any[]>;
}