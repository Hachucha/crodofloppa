export default class ConnectionManager {
  constructor() {
    this.users = new Map();
  }

  async getConnectionsByUserId(userId) : Promise<[]>

  async setConnectionUser(connection, userId) : Promise<any>

  // async setConnection(connection) {
  //   this.users.set(connection, null);
  // }

  async getUserByConnection(connection) : Promise<any>

  async deleteConnection(connection) : Promise<any>
}