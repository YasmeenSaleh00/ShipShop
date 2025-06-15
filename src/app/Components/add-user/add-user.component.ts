import { Component, OnInit } from '@angular/core';
import { UserService } from '../../Services/user.service';
import { RoleService } from '../../Services/role.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from '../../Interfaces/Role';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddUser } from '../../Interfaces/AddUser';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [NgFor,FormsModule,NgIf],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent implements OnInit {

  role:Role[]=[];

  user:AddUser={
   
    firstName: "",
    lastName:"",
    email: "",
    password: "",
    confirmPassword: "",
   roleId:0
  }

  passwordError: boolean = false; 
  constructor(private userService:UserService,
    private roleService:RoleService,
    private router:Router){}

  ngOnInit(): void {
    this.roleService.getRoles().subscribe(data=>this.role=data);
  }
  onSubmit(form:any){
    if(form.invalid) return;
    if (this.user.password !== this.user.confirmPassword) {
      this.passwordError = true; 
      return;
    }

    this.passwordError = false; 
    this.userService.addUser(this.user)
    .subscribe(()=>{
    Swal.fire({
                         title: 'Created Successfully 🎉',
                         icon: 'success',
                         confirmButtonText: 'Ok',
                         confirmButtonColor: 'rgb(252, 148, 183)', 
                       }).then(()=>{
    this.router.navigate(['/user']);
                       })
    })

  }
    
 

}
