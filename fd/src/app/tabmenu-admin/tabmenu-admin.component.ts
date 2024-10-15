import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ProductServiceService } from '../.serive/product-service.service';
import { TabMenu } from 'primeng/tabmenu';
import { TabMenuModule } from 'primeng/tabmenu';
@Component({
  selector: 'app-tabmenu-admin',
  standalone: true,
  imports: [TabMenuModule],
  templateUrl: './tabmenu-admin.component.html',
  styleUrl: './tabmenu-admin.component.css'
})
export class TabmenuAdminComponent {
  activeItem: MenuItem = { label: 'Settings' };
  
  items:MenuItem[]=[
  

    { label: 'Dash Board', routerLink: "/admin/dashboard", icon: 'pi pi-chart-bar'  },
    { label: 'New Work', routerLink: '/admin/addwork', icon:'pi pi-calendar-plus'  },
    { label: 'New Worker', routerLink: '/admin/adduser' ,icon:'pi pi-user-plus'},
    { label: 'Work Log', routerLink: '/admin/works' ,icon:'pi pi-book'},
    { label: 'Worker Details', routerLink: '/admin/workerdetails',icon:'pi pi-address-book' },
    { label: 'Settings', routerLink: '/admin/settings', icon: 'pi pi-fw pi-cog' },

]
}
