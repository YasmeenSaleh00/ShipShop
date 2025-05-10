import { Component, OnInit } from '@angular/core';
import { TestimonialService } from '../../Services/testimonial.service';
import { Testimonial } from '../../Interfaces/Testimonial';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-testimonial-table',
  standalone: true,
  imports: [NgFor],
  templateUrl: './testimonial-table.component.html',
  styleUrl: './testimonial-table.component.css'
})
export class TestimonialTableComponent implements OnInit{

  constructor(private testimonialService:TestimonialService){}

  testimonials:Testimonial[]=[];
  ngOnInit(): void {
    this.testimonialService.getTestimonials().subscribe(data=>this.testimonials=data);
  }
  sortById(sortDirection:string){
    this.testimonialService.sortById(sortDirection).subscribe(data=>this.testimonials=data);
   }
  sortByCreationDate(sortDirection:string){
   this.testimonialService.sortByCreationDate(sortDirection).subscribe(data=>this.testimonials=data);
  }
  sortByRating(sortDirection:string){
    this.testimonialService.sortByRating(sortDirection).subscribe(data=>this.testimonials=data);
   }
}
