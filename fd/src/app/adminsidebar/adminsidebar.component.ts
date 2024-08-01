import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { ProductServiceService } from '../.serive/product-service.service';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-adminsidebar',
  standalone: true,
  imports: [RouterOutlet,ButtonModule,RouterLink,RouterLinkActive,],
  templateUrl: './adminsidebar.component.html',
  styleUrl: './adminsidebar.component.css'
})
export class AdminsidebarComponent {

}
