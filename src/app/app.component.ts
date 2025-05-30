import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavegationComponent } from "./Components/navegation/navegation.component";
import { FooterComponent } from "./Components/footer/footer.component";




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavegationComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Beauty Box';
   isButtonVisible = false;

  

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }


  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isButtonVisible = window.scrollY > 300;
  }

}
