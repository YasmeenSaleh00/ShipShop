import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../Services/user.service';
import { User } from '../../Interfaces/User';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RoleService } from '../../Services/role.service';
import { Role } from '../../Interfaces/Role';
import { RoleDirective } from '../../Directive/role.directive';
import Swal from 'sweetalert2';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-user',
  standalone: true,
  imports: [ RouterLink,RoleDirective,
        MatTableModule,
      MatSortModule,
   MatPaginatorModule,
      MatButtonModule,],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit , AfterViewInit {
  users: User[] = [];
  roles:Role[]=[];
  userRole: string | null='';


  constructor(private userService: UserService,private roleService:RoleService) { }
  
  displayedColumns: string[] = ['id', 'firstName', 'lastName','email', 'roleName','createdOn', 'edit', 'delete'];
  dataSource = new MatTableDataSource<User>();
    @ViewChild(MatSort) sort!: MatSort;
    @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngOnInit(): void {
    this.userService.getUsers().subscribe(data=>this.dataSource.data=data);
    this.roleService.getRoles().subscribe(data=>this.roles=data);
   
    
  }
  ngAfterViewInit(): void {
     this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator; 
 
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
       
            this.dataSource.data = this.dataSource.data.filter(p => p.id !== id); 
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
  applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}

}
