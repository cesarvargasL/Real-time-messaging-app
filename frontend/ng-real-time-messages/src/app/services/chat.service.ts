import { Injectable } from '@angular/core';
import { Client, Message, Stomp } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { ChatMessage } from '../models/chat-message';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private _stompClient: Client;

  constructor() { 
    this._stompClient = new Client();
    this.initialConnectionSocket();
  }

  public initialConnectionSocket(): void {
    const url = '//localhost:3000/chat-websocket';
    const socket = new SockJS(url);
    this._stompClient = Stomp.over(socket);
  }

  public joinRoom(roomId: string): void {
    this._stompClient.onConnect= () => {
      this._stompClient.subscribe(`/topic/${roomId}`, (messages: Message) => {
      });
    };
    this._stompClient.activate();
  }

  public sendMessage(roomId: string, chatMessage: ChatMessage): void {
    this._stompClient.publish({
      destination: `/app/chat/${roomId}`,
      body: JSON.stringify(chatMessage)
    });
  }
}
