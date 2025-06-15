import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RoleService } from '../../Services/role.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from '../../Interfaces/Role';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-role-form',
  standalone: true,
  imports: [NgIf,FormsModule],
  templateUrl: './role-form.component.html',
  styleUrl: './role-form.component.css'
})
export class RoleFormComponent implements OnInit {

  role:Role={
    id:0,
    name:'',
    createdOn: '',
    updatedOn: null,
    isActive: true
  }
  isEdit=false;
  constructor(private roleService:RoleService,private route:ActivatedRoute,private router:Router){}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get(`id`);
    if(id){
      this.isEdit=true;
      this.roleService.getRoleById(+id).subscribe(data=>this.role=data);
    }
  }
  onSubmit(form:any){
    if(form.invalid) return;
    if(this.isEdit){
      this.roleService.updateRole(this.role.id,this.role)
      .subscribe(()=>{
        Swal.fire({
                      title: 'Updated Successfully 🎉',
                      icon: 'success',
                      confirmButtonText: 'Ok',
                      confirmButtonColor: 'rgb(252, 148, 183)', 
                    }).then(()=>{
 this.router.navigate(['/role']);
                    })
      })
    }
    else{
      this.roleService.addRole(this.role)
      .subscribe(()=>{
        Swal.fire({
                      title: 'Added Successfully 🎉',
                      icon: 'success',
                      confirmButtonText: 'Ok',
                      confirmButtonColor: 'rgb(252, 148, 183)', 
                    }).then(()=>{
 this.router.navigate(['/role']);
                    })
       
      });
    }
  }
}
