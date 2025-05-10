import { Component, OnInit } from '@angular/core';
import { UserService } from '../../Services/user.service';
import { CustomerService } from '../../Services/customer.service';
import { ProductService } from '../../Services/product.service';
import { OrderService } from '../../Services/order.service';
import { RouterLink } from '@angular/router';
import { BrandService } from '../../Services/brand.service';
import { CategoryService } from '../../Services/category.service';
import { SubcategoryService } from '../../Services/subcategory.service';
import { TestimonialService } from '../../Services/testimonial.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent  implements OnInit {

  countOfUsers: number = 0;
  countOfCustomers: number = 0;
  countOfProducts: number = 0;
  countOfOrders: number = 0;
  countOfBrands: number = 0;
  countOfCategory: number = 0;
  countOfSubCategory: number = 0;
  countOfNegativeFeedBack: number = 0;
  constructor(
    private userService: UserService,
    private customerService: CustomerService,
    private productService: ProductService,
    private orderService: OrderService,
    private brandService:BrandService,
    private categoryService:CategoryService,
    private subCategoryService:SubcategoryService,
    private testimonialService:TestimonialService
  ) {}

  ngOnInit(): void {
    this.loadCounts();
  }

  loadCounts() {
    this.userService.getUsersCount().subscribe({
      next: count => this.countOfUsers = count,
      error: err => console.error('Error fetching users count:', err)
    });

    this.customerService.getCustomerCount().subscribe({
      next: count => this.countOfCustomers = count,
      error: err => console.error('Error fetching customers count:', err)
    });

    this.productService.getProductsCount().subscribe({
      next: count => this.countOfProducts = count,
      error: err => console.error('Error fetching products count:', err)
    });

    this.orderService.getOrderCount().subscribe({
      next: count => this.countOfOrders = count,
      error: err => console.error('Error fetching orders count:', err)
    });
    this.brandService.getBrandCount().subscribe({
      next: count => this.countOfBrands = count,
      error: err => console.error('Error fetching brand count:', err)
    });
    this.categoryService.getCategoryCount().subscribe({
      next: count => this.countOfCategory = count,
      error: err => console.error('Error fetching category count:', err)
    });
    this.subCategoryService.getSubCategoriesCount().subscribe({
      next: count => this.countOfSubCategory = count,
      error: err => console.error('Error fetching sub categories count:', err)
    });
      this.testimonialService.getNegativeCount().subscribe({
      next: count => this.countOfNegativeFeedBack = count,
      error: err => console.error('Error fetching Feedback count:', err)
    });
  }

   
}
