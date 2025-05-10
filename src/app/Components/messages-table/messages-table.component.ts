import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../Services/message.service';
import { Router } from '@angular/router';
import { Messages } from '../../Interfaces/Message';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-messages-table',
  standalone: true,
  imports: [NgFor],
  templateUrl: './messages-table.component.html',
  styleUrl: './messages-table.component.css'
})
export class MessagesTableComponent implements OnInit {
constructor(private messageService:MessageService){}

messages:Messages[]=[];

  ngOnInit(): void {
   this.messageService.getMessages().subscribe(data=>this.messages=data);
  }
}
