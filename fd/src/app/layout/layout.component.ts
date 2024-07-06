import { Component, ContentChild, ElementRef, ViewChild } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { ContentComponent } from '../content/content.component';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { ProductServiceService } from '../.serive/product-service.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [HeaderComponent,SidenavComponent,ContentComponent,RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

  @ViewChild('contentDiv') contentDiv!: ElementRef;
  isVisible:boolean=true;
  constructor(private productServiceService: ProductServiceService){}

  toggleContent(): void {
    const div = this.contentDiv.nativeElement as HTMLElement;
    if (div.style.display === 'none') {
      div.style.display = 'block';

    } else {
     div.style.display = 'none';
//div.style.width = 'none';

    }
  }

  ngOnInit() {
    this.productServiceService.visibility$.subscribe((visible :boolean)=> {
      this.toggleContent()
    });
  }
}
