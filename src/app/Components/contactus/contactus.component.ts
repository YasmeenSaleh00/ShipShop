import { Component } from '@angular/core';
import { MessageService } from '../../Services/message.service';
import { Router } from '@angular/router';
import { Messages } from '../../Interfaces/Message';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-contactus',
  standalone: true,
  imports: [FormsModule,NgIf],
  templateUrl: './contactus.component.html',
  styleUrl: './contactus.component.css'
})
export class ContactusComponent {
constructor(private messageService:MessageService){}
successMessage:string=""
message:Messages={
  id: 0,
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  createdOn: ''
}
onSubmit(form:any){
     if (form.invalid) return;
    this.messageService.CreateMessage(this.message).subscribe({
  next: () => {
   this.successMessage = "Your message has been sent successfully.";

  
  },
  error: (err) => {
    console.error(err);
    alert("An error occurred. Please try again.");
  }
});

}
}
