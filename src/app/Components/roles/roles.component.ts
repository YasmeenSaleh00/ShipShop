import { Component, OnInit } from '@angular/core';
import { RoleService } from '../../Services/role.service';
import { Role } from '../../Interfaces/Role';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RoleDirective } from '../../Directive/role.directive';

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
  deleteRole(id:number){
    this.roleService.deleteRole(id).subscribe(()=>{
      this.roles=this.roles.filter(p=>p.id !== id);
  
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
