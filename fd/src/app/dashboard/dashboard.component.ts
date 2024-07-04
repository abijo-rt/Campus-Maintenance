import { Component } from '@angular/core';
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
 cards!:Cardinfo[];
  constructor(private productServiceService: ProductServiceService,private apiservice :ApiService){}



activeItem: MenuItem = { label: 'Dash Board' };
items: MenuItem[] =[{ label: 'Dash Board' }];

 ngOnInit() {

  this.apiservice.getcardinfo().subscribe((workdata) => {
    console.log(workdata)
    //const workerLocations = workdata.map(worker => worker.location[0]);
    if (workdata) {
      this.cards = workdata.location.map((data :Cardinfo ) => ({
       location:data.location,
pending:data.pending,
completed:data.completed
      }))

    } else {
      console.error(
        'Received null or undefined data from getWorkerDetails()'
      );
    }
  });


//his.cards=this.productServiceService.getcardinfo();
      

        this.activeItem = this.items[0];
    }

}
