import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit {
  messages: { text: string, isLocal: boolean }[] = [];
  newMessage: string = '';

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.chatService.onNewMessage((message: { text: string, isLocal: boolean }) => {
      this.messages.push(message);
    });
  }

  sendMessage(): void {
    if (this.newMessage.trim()) {
      this.chatService.sendMessage({ text: this.newMessage });
      this.messages.push({ text: this.newMessage, isLocal: true });
      this.newMessage = '';
    }
  }
}