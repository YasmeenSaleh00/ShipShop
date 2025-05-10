import { Component } from '@angular/core';
import { MessageService } from '../../Services/message.service';
import { Router } from '@angular/router';
import { Messages } from '../../Interfaces/Message';
import { FormsModule, NgModel } from '@angular/forms';


@Component({
  selector: 'app-contactus',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contactus.component.html',
  styleUrl: './contactus.component.css'
})
export class ContactusComponent {
constructor(private messageService:MessageService,private router:Router){}

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
    alert("Your message has been sent successfully.");
    this.router.navigate(['/home']);
  },
  error: (err) => {
    console.error(err);
    alert("An error occurred. Please try again.");
  }
});

}
}
