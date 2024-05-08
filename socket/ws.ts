import { ConnectionDTO, SocketManager } from './interfaces';
import WebSocket from 'ws';

class WebSocketManager implements SocketManager {
    connections: Map<string, Set<ConnectionDTO>> = new Map();
    messageHandler: (message: string, c: ConnectionDTO) => void = () => { };
    cookieAuthFunction: (c: ConnectionDTO, cookieObj: any) => boolean = () => false;

    Run(websocketServer: WebSocket.Server) {
        websocketServer.on('connection', (socket : any) => {
            const connection: ConnectionDTO = {
                UserId: null,
                socket,
                Send: (message) => {
                    socket.send(message);
                },
                Close: () => {
                    socket.close();
                }
            };

            socket.request.headers.cookie && this.cookieAuthFunction(connection, socket.request.headers.cookie)

            socket.on('message', (m: any) => {
                this.messageHandler(m.toString(), connection);
            });

            socket.on('close', () => {
                const userId = connection.UserId;
                if (userId) {
                    const userConnections = this.connections.get(userId) || new Set();
                    userConnections.delete(connection);
                    this.connections.set(userId, userConnections);
                }
            });

            socket.on('error', () => {
                socket.close();
                const userId = connection.UserId;
                if (userId) {
                    const userConnections = this.connections.get(userId) || new Set();
                    userConnections.delete(connection);
                    this.connections.set(userId, userConnections);
                }
            });
        })
    }

    SetMessageHandler(callback: (message: string, c: ConnectionDTO) => void) {
        this.messageHandler = callback;
    }

    SendToUser(message: string, userId: string) {
        const userConnections = this.connections.get(userId) || new Set();
        userConnections.forEach((connection) => {
            connection.Send(message);
        });
    }

    SetConnectionUser(c: ConnectionDTO, userId: string) {
        let userConnections = this.connections.get(userId);
        if (!userConnections) {
            userConnections = new Set();
            this.connections.set(userId, userConnections);
        }
        userConnections.add(c);
        c.UserId = userId;
    }

    SetCookieAuthFunction(callback: (c: ConnectionDTO, cookieObj: any) => boolean) {
        this.cookieAuthFunction = callback;
    }
}
