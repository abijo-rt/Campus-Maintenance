import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ProductServiceService } from '../.serive/product-service.service';
import { TabMenu } from 'primeng/tabmenu';
import { TabMenuModule } from 'primeng/tabmenu';

@Component({
  selector: 'app-tabmenu',
  standalone: true,
  imports: [TabMenuModule],
  templateUrl: './tabmenu.component.html',
  styleUrl: './tabmenu.component.css'
})
export class TabmenuComponent {
  activeItem: MenuItem = { label: 'Settings' };
  
  items:MenuItem[]=[
  

    { label: 'Dash Board', routerLink: "/incharge/dashboard", icon: 'pi pi-chart-bar'  },
    { label: 'New Work', routerLink: '/incharge/addwork', icon:'pi pi-calendar-plus'  },
    { label: 'New Worker', routerLink: '/incharge/adduser' ,icon:'pi pi-user-plus'},
    { label: 'Work Log', routerLink: '/incharge/works' ,icon:'pi pi-book'},
    { label: 'Worker Details', routerLink: '/incharge/workerdetails',icon:'pi pi-address-book' },
    { label: 'Settings', routerLink: '/incharge/settings', icon: 'pi pi-fw pi-cog' },

]
  
  



}
