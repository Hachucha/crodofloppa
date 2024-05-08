import mysql from 'mysql2/promise';

/*
interface transaction {
    query(sql, values)
    rollback()
}

export class Querier {
    constructor(dbConfig : any)
    query (sql, values) : any
    transaction () : Promise<transaction>
}
*/

export class Querier {
  constructor(dbConfig) {
    this.pool = mysql.createPool({
      host: dbConfig.host,
      port: Number(dbConfig.port) || 3306,
      user: dbConfig.user || 'root',
      password: dbConfig.password || '',
      database: dbConfig.database
    });
  }

  async transaction() {
    let connection = await this.pool.getConnection();
    await connection.query('START TRANSACTION');
    return {
      query: (sql, values) => {
        return new Promise(async (resolve, reject) => {
          try {
            let rows = await connection.query(sql, values);
//           console.log(rows);
            await connection.query('COMMIT');
            await connection.release();
            resolve(rows);
          } catch (e) {
            await connection.query('ROLLBACK');
            connection.release();
            reject(e);
          }
        })
      },
      rollback: async () => {
        await connection.query('ROLLBACK');
        connection.release();
      }
    }
  }


  async query(sql, values = []) {
    debugSqlLog(sql, values);
    //стрингифицируем значения
    values = values.map((value) => {
      if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean' || value === null || value === undefined) {
        return value;
      } else {
        return JSON.stringify(value);
      }
    });
    return new Promise(async (resolve, reject) => {
      let connection = await this.pool.getConnection();
        try {
          let rows = await connection.query(sql, values);
          console.log(rows);
          connection.release();
          resolve(rows);
        } catch (e) {
          connection.release();
          reject(e);
        }
    });
  }
}

function debugSqlLog(str, values) {
  let result = '';
  let valueIndex = 0;

  for (let i = 0; i < str.length; i++) {
    if (str[i] === '?') {
      // Если достигнут конец массива значений, прекращаем замену и возвращаем результат
      if (valueIndex >= values.length) {
        return result;
      }

      // Добавляем значение из массива вместо знака вопроса
      result += (
        typeof values[valueIndex] === 'string' ? '"' + values[valueIndex] + '"' :
          values[valueIndex] == null ? null :
            '"' + JSON.stringify(values[valueIndex]) + '"'
      );
      valueIndex++;
    } else {
      // Добавляем текущий символ в результат
      result += str[i];
    }
  }

  // return result;
 console.log(result);
}