function valueOrNull(value) {
    return value === undefined ? null : value;
}



export default class SimpleCRUD {
    constructor(config, querier) {
        this.config = config;
        this.querier = querier;
    }

    async create(obj) {
        let sql = `INSERT INTO ${this.config.tableName} (`;
        let values = [];
        sql += this.config.fields.join(', ');
        sql += ') VALUES (';
        for (let i = 0; i < this.config.fields.length; i++) {
            sql += '?,';
            values.push(valueOrNull(obj[this.config.fields[i]]));
        }
        sql = sql.slice(0, -1);
        sql += ')';
        return await this.querier.query(sql, values);
    }

    async read(key, values) {
        let sql = `SELECT * FROM ${this.config.tableName} WHERE `;
        let queryValues = [];
        for (let i = 0; i < this.config.keys[key].length; i++) {
            sql += `${this.config.keys[key][i]} = ? AND `;
            queryValues.push(values[i]);
        }
        sql = sql.slice(0, -4);
        return await this.querier.query(sql, queryValues);
    }

    async update(obj) {
        let sql = `UPDATE ${this.config.tableName} SET `;
        let values = [];
        for (let i = 0; i < this.config.fields.length; i++) {
            if (obj[this.config.fields[i]] !== undefined) {
                sql += `${this.config.fields[i]} = ?,`;
                values.push(obj[this.config.fields[i]]);
            }
        }
        sql = sql.slice(0, -1);
        sql += ' WHERE ';
        for (let i = 0; i < this.config.keys[this.config.primaryKey].length; i++) {
            if (obj[this.config.keys[this.config.primaryKey][i]] !== undefined) {
                sql += `${this.config.keys[this.config.primaryKey][i]} = ? AND `;
                values.push(obj[this.config.keys[this.config.primaryKey][i]]);
            }
        }
        sql = sql.slice(0, -4);
        //        // console.log('Выводим querier:')
        //        console.log(this);
        return await this.querier.query(sql, values);
    }

    async createOrUpdate(obj) {
        let sql = `INSERT INTO ${this.config.tableName} (`;
        let values = [];
        sql += this.config.fields.join(', ');
        sql += ') VALUES (';
        for (let i = 0; i < this.config.fields.length; i++) {
            sql += '?,';
            values.push(valueOrNull(obj[this.config.fields[i]]));
        }
        sql = sql.slice(0, -1);
        sql += ') ON DUPLICATE KEY UPDATE ';
        for (let i = 0; i < this.config.fields.length; i++) {
            if (obj[this.config.fields[i]] !== undefined) {
                sql += `${this.config.fields[i]} = ?,`;
                values.push(obj[this.config.fields[i]]);
            }
        }
        sql = sql.slice(0, -1);
        return await this.querier.query(sql, values);
    }

    async delete(key, values) {
        let sql = `DELETE FROM ${this.config.tableName} WHERE `;
        let queryValues = [];
        for (let i = 0; i < this.config.keys[key].length; i++) {
            sql += `${this.config.keys[key][i]} = ? AND `;
            queryValues.push(values[i]);
        }
        sql = sql.slice(0, -4);
        return await this.querier.query(sql, queryValues);
    }
}