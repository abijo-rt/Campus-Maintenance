import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ProductServiceService, worklog, type } from '../.serive/product-service.service';
import { TabMenuModule } from 'primeng/tabmenu';
import { MenuItem } from 'primeng/api';
import {AuthService} from '../.serive/auth.service'
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonModule,TabMenuModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private productServiceService: ProductServiceService,private auth :AuthService){}

  logout(){
    this.auth.logout()
  }
  toggle() {
    this.productServiceService.toggleVisibility();
  }
}
