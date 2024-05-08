export default class ConnectionManager {
  constructor() {
    this.users = new Map();
  }

  async getConnectionsByUserId(userId) {
    const result = [];
    for (const [connection, user] of this.users) {
      if (user === userId) {
        result.push(connection);
      }
    }
    return result;
  }

  async setConnectionUser(connection, userId) {
    this.users.set(connection, userId);
  }

  // async setConnection(connection) {
  //   this.users.set(connection, null);
  // }

  async getUserByConnection(connection) {
    return this.users.get(connection);
  }

  async deleteConnection(connection) {
    this.users.delete(connection);
  }
}