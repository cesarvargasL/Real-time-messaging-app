import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatMessage } from 'src/app/models/chat-message';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  public messageInput: string;
  public userId: string;
  public messageList: ChatMessage[];

  constructor(private _chatService: ChatService, private _route: ActivatedRoute) {
    this.messageInput = '';
    this.userId = '';
    this.messageList = [];
   }

  ngOnInit(): void {
    this.userId = this._route.snapshot.params['userId'];
    this._chatService.joinRoom('ABC');
    this.listenMessages();
  }

  public sendMessage(): void {
    const chatMessage = {
      message: this.messageInput,
      user: this.userId,
      messageSide: this.userId === '1' ? 'sender' : 'reciver',
      profileImage: this.userId === '1' ? 'assets/user1.webp' : 'assets/user2.webp'
    } as ChatMessage
    this._chatService.sendMessage('ABC', chatMessage);
    this.messageInput = '';
  }

  public listenMessages(): void {
    this._chatService.getMessageSubject().subscribe((messages: ChatMessage[]) => {
      this.messageList = messages.map((item: ChatMessage) => ({
        ...item,
        messageSide: item.user === this.userId ? 'sender' : 'reciver'
      }));
    });
  }
}
