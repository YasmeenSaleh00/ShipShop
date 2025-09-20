import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../Services/product.service';
import { Router, RouterLink } from '@angular/router';
import { Product } from '../../Interfaces/Product';
import { RoleDirective } from '../../Directive/role.directive';
import Swal from 'sweetalert2';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-table',
  standalone: true,
  imports: [
    RouterLink,
    RoleDirective,
    MatSort,
    MatPaginator,
    MatButtonModule,MatTableModule, CurrencyPipe, MatSortModule
  ],
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.css']
})
export class ProductTableComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'name',
    'nameAr',
    'categoryName',
    'brandName',
    'description',
    'descriptionAr',
    'price',
    'taxPercentage',
    'productStatus',
    'imageUrl',
    'quantity',
    'createdOn',
    'isActive',
    'edit',
    'delete'
  ];

  dataSource = new MatTableDataSource<Product>();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => {
      this.dataSource.data = data;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  deleteProduct(id: number) {
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
        this.productService.deleteProduct(id).subscribe(() => {
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
