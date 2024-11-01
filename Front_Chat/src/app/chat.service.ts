import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client'; // Importa el 'Socket' type

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socket: any;

  constructor() {
    // Conecta con el servidor backend (ajusta la URL según tu entorno)
    this.socket = io('http://localhost:3000');
  }

  // Envía un mensaje al servidor
  sendMessage(message: { text: string }): void {
    this.socket.emit('message', message);
  }

  // Escucha los mensajes provenientes del servidor
  onNewMessage(callback: (message: { text: string, isLocal: boolean }) => void): void {
    this.socket.on('message', callback);
  }
}