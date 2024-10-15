import { Component } from '@angular/core';
import { TabMenuModule } from 'primeng/tabmenu';
import { MenuItem } from 'primeng/api';
import { ProductServiceService } from '../.serive/product-service.service';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
@Component({
  selector: 'app-setting',
  standalone: true,
  imports: [TabMenuModule,DialogModule,ButtonModule],
  templateUrl: './setting.component.html',
  styleUrl: './setting.component.css'
})
export class SettingComponent {
showLocationEdit() {
throw new Error('Method not implemented.');
}
  activeItem: MenuItem = { label: 'Settings' };
  
  constructor(private productservice:ProductServiceService){}
  
  items=this.productservice.getMenuItem()
  
  
  visible: boolean = false;

  showDialog() {
      this.visible = true;
  }
    
}
