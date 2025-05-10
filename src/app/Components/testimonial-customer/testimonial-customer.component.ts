import { Component, OnInit } from '@angular/core';
import { Testimonial } from '../../Interfaces/Testimonial';
import { TestimonialService } from '../../Services/testimonial.service';
import { TokenService } from '../../Services/token.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-testimonial-customer',
  standalone: true,
  imports: [],
  templateUrl: './testimonial-customer.component.html',
  styleUrl: './testimonial-customer.component.css'
})
export class TestimonialCustomerComponent implements OnInit {
  testimonial: Testimonial| null = null;

  constructor(private testimonialService: TestimonialService, private tokenService:TokenService) {}

  ngOnInit(): void {
    const customerId=this.tokenService.getUserId();
    if(customerId)
    this.testimonialService.getTestimonialByCustomerId(customerId).subscribe(data => {
      this.testimonial = data;
    });
  }
}
