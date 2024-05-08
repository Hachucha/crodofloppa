import * as helpers from './sql_helpers.js'
export default class Finder {
    wide = false

    withFields(fields) {
        this.fields = fields
        return this
    }

    checkPagination(){
        if (this.page && Number(this.page) > 0 && this.pageSize && Number(this.pageSize) > 0) {
            this.queryConf.pageSize = this.pageSize
            this.queryConf.page = this.page
        }
    }

    paginate(pageSize, page = 1) {
        this.page = page
        this.pageSize = pageSize
        return this
    }

    async pagesCount(){
        let res = await this.count();
        return Math.ceil(res / this.queryConf.pageSize)
    }

    constructor(querier) {
        this.querier = querier;
        this.queryConf = new helpers.QueryConf()
        this.queryConf.operation = 'SELECT';
    }

    async count() {
        this.prepare()
        this.queryConf.fields = ['COUNT(*)'];
        if (this.queryConf.where.length == 0) {
            return 0
        }
        this.queryConf.prepare()
        const data = await this.querier.query(this.queryConf.sql, this.queryConf.values)
        return data[0].count
    }

    async one() {
        this.prepare()
        this.queryConf.pagesize = 1
        this.queryConf.page = 1
        if (this.queryConf.where.length == 0) {
            throw new Error('no where')
        }
        this.queryConf.prepare()
        const data = await this.querier.query(this.queryConf.sql, this.queryConf.values)
        return data[0]
    }

    async all() {
        this.prepare()
        if (this.queryConf.where.length == 0 && this.queryConf.pagesize && !this.wide) {
            {
                //широкие запросы не разрешены
                throw new Error('no where and pagesize')
            }
        }
        this.queryConf.prepare()
        // console.log(this.queryConf.sql, this.queryConf.values)
        const data = await this.querier.query(this.queryConf.sql, this.queryConf.values)
        // console.log(data)
        return data
    }
}