import { Component } from '@angular/core';
import { LookupTypeModel } from '../../Interfaces/LookupTypeModel';
import { LookupService } from '../../Services/lookup.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { OrderService } from '../../Services/order.service';
import { CreateOrder } from '../../Interfaces/CreateOrder';
import { OrderModel } from '../../Interfaces/OrderModel';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-order',
  standalone: true,
  imports: [FormsModule,NgFor,NgIf],
  templateUrl: './edit-order.component.html',
  styleUrl: './edit-order.component.css'
})
export class EditOrderComponent {
  orderStatuses: LookupTypeModel[] = []; 
  order:OrderModel={
    customerName: '',

    shippingAddress: '',
    orderNumber: 0,
    customerPhone: '',
    orderStatus: '',
    orderDate: '',
    deliveryDate: '',
    notes: null,
    totalPrice: 0,
    items: [],
    orderStatusId: 0
  }
 

  constructor(private lookupService: LookupService,private route:ActivatedRoute,private orderService:OrderService,private router:Router) { }

  ngOnInit(): void {
    const orderId = this.route.snapshot.paramMap.get('orderId');
    const lookupTypeId = this.route.snapshot.paramMap.get('lookupTypeId');
  
    console.log('OrderId from route:', orderId);
    console.log('LookupTypeId from route:', lookupTypeId);
  
    if (lookupTypeId) {
      this.lookupService.getLookupItemValuesByType(+lookupTypeId).subscribe({
        next: (data) => {
          console.log('Lookup statuses received:', data);
          this.orderStatuses = data;
        },
        error: (error) => {
          console.error('Error fetching lookup statuses:', error);
        }
      });
    } else {
      console.warn('No lookupTypeId provided in route.');
    }
  
    if (orderId) {
      this.orderService.getOrderById(+orderId).subscribe({
        next: (orderData) => {
          console.log('Order data received:', orderData);
          this.order = orderData;
        },
        error: (error) => {
          console.error('Error fetching order:', error);
        }
      });
    }
  }
  
 onSubmit(form: any): void {
  if (form.invalid) {
    return;
  }

  this.orderService.updateOrderStauts(this.order.orderNumber, this.order.orderStatusId).subscribe({
    next: () => {
      Swal.fire({
        title: 'Status Updated Successfully 🎉',
        icon: 'success',
        confirmButtonText: 'Ok',
        confirmButtonColor: 'rgb(252, 148, 183)',
      }).then(() => {
        this.router.navigate(['/order-table']);
      });
    },
    error: (err) => {
      Swal.fire({
        title: 'An error occurred',
        text: 'Please try again later.',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
      console.error(err);
    }
  });
}

}
