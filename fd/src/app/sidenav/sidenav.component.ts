import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { ProductServiceService } from '../.serive/product-service.service';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [ButtonModule,RouterLink,RouterLinkActive,RouterOutlet],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})


export class SidenavComponent {
//   @ViewChild('contentDiv') contentDiv!: ElementRef;
//   isVisible:boolean=true;
//   constructor(private productServiceService: ProductServiceService){}

//   toggleContent(): void {
//     const div = this.contentDiv.nativeElement as HTMLElement;
//     if (div.style.display === 'none') {
//       div.style.display = 'block';

//     } else {
//      div.style.display = 'none';
// //div.style.width = 'none';

//     }
//   }

//   ngOnInit() {
//     this.productServiceService.visibility$.subscribe((visible :boolean)=> {
//       this.toggleContent()
//     });
//   }
  
}

