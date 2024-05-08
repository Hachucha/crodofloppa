export interface ConnectionDTO {
    UserId: string | null;
    socket: WebSocket;
    Send: (message: string) => void;
    Close: () => void;
}

export interface SocketManager{
    SetMessageHandler(callback: (message: string, c: ConnectionDTO) => void) : void;
    SendToUser(message: string, userId: string) : void;
    SetConnectionUser(c: ConnectionDTO, userId: string) : void;
}