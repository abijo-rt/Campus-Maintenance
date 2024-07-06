import { Component } from '@angular/core';
import { TabMenuModule } from 'primeng/tabmenu';
import { MenuItem } from 'primeng/api';
@Component({
  selector: 'app-setting',
  standalone: true,
  imports: [TabMenuModule],
  templateUrl: './setting.component.html',
  styleUrl: './setting.component.css'
})
export class SettingComponent {
  activeItem: MenuItem = { label: 'Settings' };
  
  items: MenuItem[] | undefined;
  
  
  ngOnInit() {
     this.items = [
       { label: 'Dash Board', routerLink: '/dashboard' },
       { label: '+ New Work', routerLink: '/adduser' },
       { label: '+ New Worker', routerLink: '/addwork' },
       { label: 'Work Log', routerLink: '/works' },
       { label: 'Worker Details', routerLink: '/workerdetails' },
       { label: 'Settings', routerLink: '/settings' },
     ]}
    
}
