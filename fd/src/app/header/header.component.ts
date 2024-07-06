import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ProductServiceService, worklog, type } from '../.serive/product-service.service';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private productServiceService: ProductServiceService){}

  toggle() {
    this.productServiceService.toggleVisibility();
  }

}
