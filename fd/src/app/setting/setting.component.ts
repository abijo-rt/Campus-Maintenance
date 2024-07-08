import { Component } from '@angular/core';
import { TabMenuModule } from 'primeng/tabmenu';
import { MenuItem } from 'primeng/api';
import { ProductServiceService } from '../.serive/product-service.service';
@Component({
  selector: 'app-setting',
  standalone: true,
  imports: [TabMenuModule],
  templateUrl: './setting.component.html',
  styleUrl: './setting.component.css'
})
export class SettingComponent {
  activeItem: MenuItem = { label: 'Settings' };
  
  constructor(private productservice:ProductServiceService){}
  
  items=this.productservice.getMenuItem()
  
  

    
}
