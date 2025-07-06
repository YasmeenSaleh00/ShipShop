import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Category } from '../../Interfaces/Category';
import { CategoryService } from '../../Services/category.service';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RoleDirective } from '../../Directive/role.directive';
import Swal from 'sweetalert2';
import { MatButtonModule } from '@angular/material/button';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [RouterLink,RoleDirective,MatButtonModule,MatSortModule, MatTableModule, MatPaginatorModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit, AfterViewInit  {

category:Category[]=[];

constructor(private categoryService:CategoryService){}
 displayedColumns: string[] = ['id', 'name', 'nameAr','imageUrl', 'description', 'descriptionAr','createdOn', 'edit', 'delete'];
  dataSource = new MatTableDataSource<Category>();

  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(data => {
      this.dataSource.data = data;

    });
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator; 
  }
deleteCategory(id:number){
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
            this.categoryService.deleteCategory(id).subscribe(() => {
         
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
