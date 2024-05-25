export default class ConnectionManager {
  getConnectionsByUserId(userId) : Promise<any[]>

  setConnectionUser(connection, userId) : Promise<any>

  getUserByConnection(connection) : Promise<any>

  deleteConnection(connection) : Promise<any>
}