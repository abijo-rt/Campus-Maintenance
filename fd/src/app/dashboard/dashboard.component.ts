import { Component, ElementRef, ViewChild } from '@angular/core';
import { ChartComponent } from '../chart/chart.component';
import { LayoutComponent } from '../layout/layout.component';
import { ChipModule } from 'primeng/chip';
import { TabMenuModule } from 'primeng/tabmenu';
import { MenuItem } from 'primeng/api';
import { CardComponent } from '../card/card.component';
import { Cardinfo, ProductServiceService } from '../.serive/product-service.service';
import { ApiService } from '../.serive/api.service';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ChartComponent,LayoutComponent,ChipModule,TabMenuModule,CardComponent,CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent {
  @ViewChild('logoDiv') logoDiv!: ElementRef;


 cards!:Cardinfo[];
  constructor(private productServiceService: ProductServiceService,private apiservice :ApiService){}



activeItem: MenuItem = { label: 'Dash Board' };
items: MenuItem[] | undefined;


ngOnInit() {
   this.items = [
     { label: 'Dash Board', routerLink: '/dashboard' },
     { label: '+ New Work', routerLink: '/addwork' },
     { label: '+ New Worker', routerLink: '/adduser' },
     { label: 'Work Log', routerLink: '/works' },
     { label: 'Worker Details', routerLink: '/workerdetails' },
     { label: 'Settings', routerLink: '/settings' },
   
   ];

  this.apiservice.getcardinfo().subscribe((workdata) => {
    console.log(workdata)
    if (workdata) {
      this.cards = workdata.location.map((data :Cardinfo ) => ({
       location:data.location,
pending:data.pending,
completed:data.completed
      }))

    } else {
      this.displaylogo()
      console.error(
        'Received null or undefined data from getWorkerDetails()'
      );
    }
  });

console.log("hihi"+this.cards)
      

        this.activeItem = this.items[0];
    }

displaylogo():void{
  const div = this.logoDiv.nativeElement as HTMLElement;
  div.style.display='block';
}

}
