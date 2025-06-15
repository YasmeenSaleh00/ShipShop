import { Component, OnInit } from '@angular/core';
import { UserService } from '../../Services/user.service';
import { User } from '../../Interfaces/User';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RoleService } from '../../Services/role.service';
import { Role } from '../../Interfaces/Role';
import { RoleDirective } from '../../Directive/role.directive';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-user',
  standalone: true,
  imports: [NgFor, RouterLink,RoleDirective],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {
  users: User[] = [];
  roles:Role[]=[];
  userRole: string | null='';


  constructor(private userService: UserService,private roleService:RoleService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(data=>this.users=data);
    this.roleService.getRoles().subscribe(data=>this.roles=data);
   
    
  }
  canShowActions(): boolean {
    return this.userRole !== 'Add';
  }
  
  
  deleteUser(id:number){
     Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          this.userService.deleteUser(id).subscribe(() => {
       
            this.users = this.users.filter(p => p.id !== id); 
            Swal.fire({
              title: "Deleted!",
              text: "Deleted successfully.",
              icon: "success"
            });
          }, error => {
            Swal.fire({
              title: "Error!",
              text: "Something went wrong.",
              icon: "error"
            });
          });
        }
      });

  }
  sortByCreationDate(sortDirection:string){
    this.userService.sortByCreationDate(sortDirection).subscribe(data=>this.users=data);
    }
    sortByName(sortDirection:string){
      this.userService.sortByName(sortDirection).subscribe(data=>this.users=data);
    
    }
    sortByEmail(sortDirection:string){
      this.userService.sortByEmail(sortDirection).subscribe(data=>this.users=data);
    
    }
    sortById(sortDirection:string){
      this.userService.sortById(sortDirection).subscribe(data=>this.users=data);
    
    }

}
