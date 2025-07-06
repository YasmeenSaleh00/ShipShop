import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { BrandService } from '../../Services/brand.service';
import { Brand } from '../../Interfaces/Brand';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import Swal from 'sweetalert2';
import { NgFor, NgIf, NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RoleDirective } from '../../Directive/role.directive';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-brand',
  standalone: true,
  imports: [
 
    NgClass,
    RouterLink,
    RoleDirective,
      MatTableModule,
    MatSortModule,
 MatPaginatorModule,
    MatButtonModule,

  ],
  templateUrl: './brand.component.html',
  styleUrl: './brand.component.css'
})
export class BrandComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['id', 'name', 'nameAr','imagePath', 'createdOn', 'status', 'edit', 'delete'];
  dataSource = new MatTableDataSource<Brand>();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private brandService: BrandService) {}

  ngOnInit(): void {
    this.brandService.getBrands().subscribe(data => {
      this.dataSource.data = data;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator; 
  }

  deleteBrand(id: number): void {
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
        this.brandService.deleteBrand(id).subscribe(() => {
          this.dataSource.data = this.dataSource.data.filter(b => b.id !== id);
          Swal.fire("Deleted!", "Brand has been deleted.", "success");
        });
      }
    });
  }

  applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}
}
