import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { RoleDirective } from '../../Directive/role.directive';
import { NgFor } from '@angular/common';
import { SubCategory } from '../../Interfaces/SubCategory';
import { SubcategoryService } from '../../Services/subcategory.service';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-subcategory-table',
  standalone: true,
  imports: [RoleDirective,RouterLink,MatTableModule,
      MatSortModule,
   MatPaginatorModule,
      MatButtonModule,],
  templateUrl: './subcategory-table.component.html',
  styleUrl: './subcategory-table.component.css'
})
export class SubcategoryTableComponent implements OnInit , AfterViewInit {
category:SubCategory[]=[];

constructor(private subCategoryService:SubcategoryService){}

 displayedColumns: string[] = ['id', 'name', 'nameAr','mainCategory','imageUrl','description','descriptionAr', 'createdOn', 'edit', 'delete'];
  dataSource = new MatTableDataSource<SubCategory>();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
ngOnInit(): void {
  this.subCategoryService.getSubCategories().subscribe(data=>this.dataSource.data=data);
}
  ngAfterViewInit(): void {
   this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator; 
  }
deleteSubCategory(id:number){
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
        this.subCategoryService.deleteSubCategory(id).subscribe(() => {
     
     this.dataSource.data = this.dataSource.data.filter(b => b.id !== id); 
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
  this.dataSource.filter = filterValue.trim().toLowerCase();}
}
