import { Component } from '@angular/core';
import { LayoutComponent } from "../layout/layout.component";
import { AdminsidebarComponent } from "../adminsidebar/adminsidebar.component";
import { HeaderComponent } from '../header/header.component';
import { RouterOutlet } from '@angular/router';
import { TabmenuAdminComponent } from "../tabmenu-admin/tabmenu-admin.component";

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [LayoutComponent, AdminsidebarComponent, HeaderComponent, RouterOutlet, TabmenuAdminComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

}
