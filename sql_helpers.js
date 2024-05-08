export class QueryConf {
    prefixes = []
    prefixValues = []
    postfixes = []
    postfixValues = []
    operation = "SELECT"
    table = ""
    fields = []
    fieldValues = []
    joins = []
    where = []
    whereValues = []
    order = []
    page = 0
    pageSize = 0
  
    sql = ""
    values = []
  
    groupBy = []
  
    prepare() {
      let newSql = "";
      let newValues = [];
  
      newSql += this.prefixes.join(" ");
      this.prefixValues.forEach((prefixValue) => {
        newValues.push(prefixValue);
      });
      newSql += ' ';
      switch (this.operation) {
        case "SELECT":
          newSql += "SELECT ";
          for (let i = 0; i < this.fields.length; i++) {
            newSql += this.fields[i];
            if (i < this.fields.length - 1) {
              newSql += ", ";
            }
          }
          newSql += " FROM "+this.table;
          break;
        case "INSERT":
          newSql = "INSERT INTO "+this.table;
          if (this.fields.length > 0) {
            newSql += " (" + this.fields.join(", ") + ")";
          }
          newSql += " VALUES (";
          for (let i = 0; i < this.fields.length; i++) {
            newSql += "?";
            if (i < this.fields.length - 1) {
              newSql += ", ";
            }
          }
          newSql += ")";
          for (let i = 0; i < this.fieldValues.length; i++) {
            newValues.push(this.fieldValues[i]);
          }
          break;
        case "UPDATE":
          newSql += "UPDATE "+this.table+" SET ";
          for (let i = 0; i < this.fields.length; i++) {
            newSql += this.fields[i]+" = ?";
            if (i < this.fields.length - 1) {
              newSql += ", ";
            }
          }
          for (let i = 0; i < this.fieldValues.length; i++) {
            newValues.push(this.fieldValues[i]);
          }
          break;
        case "DELETE":
          newSql = "DELETE FROM ";
          break;
      }
      newSql += " ";
      if (this.joins.length > 0) {
        newSql += this.joins.join(' ');
      }
      if (this.where.length > 0) {
        newSql += ' WHERE ' + this.where.join(' AND ');
      }
      if (this.groupBy.length > 0) {
        newSql += ' GROUP BY ' + this.groupBy.join(' ');
      }
      if (this.whereValues.length > 0) {
        this.whereValues.forEach((value) => {
          newValues.push(value);
        });
      }
      if (this.order.length > 0) {
        newSql += ' ORDER BY ' + this.order.join(' ');
      }
      if (this.page > 0 && this.pageSize > 0 && this.operation != "DELETE") {
        newSql += ' LIMIT ? OFFSET ?';
        newValues.push(this.pageSize, (this.page - 1) * this.pageSize);
      }
      newSql += ' ';
      newSql += this.postfixes.join(" ");
      this.postfixValues.forEach((postfixValue) => {
        newValues.push(postfixValue);
      });
      this.sql = newSql;
      this.values = newValues;
  //    console.log(newSql);
      return this;
    }
  }

  export function removeLastComma(text) {
    while (text[text.length - 1] == ' ') {
      text = text.substring(0, text.length - 1);
    }
    if (text[text.length - 1] == ',') {
      return text.substring(0, text.length - 1);
    }
    return text;
  }

export class PreparedSQL {
    sql
    values
    constructor(sql, values) {
        this.sql = sql
        this.values = values
    }
}