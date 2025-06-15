import { Component, OnInit } from '@angular/core';
import { RoleService } from '../../Services/role.service';
import { Role } from '../../Interfaces/Role';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RoleDirective } from '../../Directive/role.directive';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [NgFor,RouterLink,RoleDirective],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css'
})
export class RolesComponent implements OnInit {


  roles:Role[]=[];

  constructor(private roleService:RoleService){}
  ngOnInit(): void {
    this.roleService.getRoles().subscribe(data=>this.roles=data);
  }
  deleteRole(id: number) {
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
      this.roleService.deleteRole(id).subscribe(() => {
   
        this.roles = this.roles.filter(p => p.id !== id); 
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
      this.roleService.sortByCreationDate(sortDirection).subscribe(data=>this.roles=data);
      }
      sortByName(sortDirection:string){
        this.roleService.sortByName(sortDirection).subscribe(data=>this.roles=data);
      
      }
      sortById(sortDirection:string){
        this.roleService.sortById(sortDirection).subscribe(data=>this.roles=data);
      
      }
}
