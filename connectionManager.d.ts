export default class ConnectionManager {
  getConnectionsByUserId(userId) : Promise<any[]>

  setConnectionUser(connection, userId) : Promise<any>

  // async setConnection(connection) {
  //   this.users.set(connection, null);
  // }

  getUserByConnection(connection) : Promise<any>

  deleteConnection(connection) : Promise<any>
}