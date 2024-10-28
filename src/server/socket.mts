import { Server, Socket } from "socket.io";


interface SocketHandler{
	setupSocket(socket : Socket) : void;
}

export { SocketHandler }

