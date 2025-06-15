import { Component } from '@angular/core';
import { MessageService } from '../../Services/message.service';
import { Router } from '@angular/router';
import { Messages } from '../../Interfaces/Message';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import Swal from 'sweetalert2';


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
     Swal.fire({
               title: 'Send Successfully 🎉',
               icon: 'success',
               confirmButtonText: 'Ok',
               confirmButtonColor: 'rgb(252, 148, 183)', 
             }).then(() => {
        form.reset();
      });
    },
  error: (err) => {
    Swal.fire({
                          title: 'An error occurred. ',
                     text:'Please try again.',
                          icon: 'error',
                          confirmButtonText: 'Ok',
                          confirmButtonColor: 'rgb(252, 148, 183)', 
                        }); 
   
  }
});

}
}
