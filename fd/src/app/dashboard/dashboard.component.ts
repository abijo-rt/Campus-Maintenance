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
import { CalendarModule } from 'primeng/calendar';
import { TagModule } from 'primeng/tag';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ChartComponent,LayoutComponent,ChipModule,TabMenuModule,CardComponent,CommonModule,CalendarModule,TagModule,FormsModule,ReactiveFormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent {



date!:Date;

selectdate() {
  const selecteddate=this.dateformat(this.date);
   this.cardinfoapi(selecteddate)
}
  @ViewChild('logoDiv') logoDiv!: ElementRef;


 cards!:Cardinfo[];
  newdate!: String;

  constructor(private productServiceService: ProductServiceService,private apiservice :ApiService){}



activeItem: MenuItem = { label: 'Dash Board' };
items: MenuItem[] | undefined;

dateformat(date: Date): string {
  const day: string = String(date.getDate()).padStart(2, '0'); // Ensure two digits with leading zero
  const month: string = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-indexed
  const year: number = date.getFullYear();
  return `${day}-${month}-${year}`;
}


ngOnInit() {
  this.date=new Date();
  const strdate=this.dateformat(this.date);
  this.cardinfoapi(strdate)
  
  this.items=this.productServiceService.getMenuItem()


  


      

        this.activeItem = this.items[0];
    }

displaylogo(status:number):void{
  const div = this.logoDiv.nativeElement as HTMLElement;
  if(status){
  div.style.display='block';
}else{
  div.style.display='none';

}

}

cardinfoapi(date:string):void{

this.apiservice.getcardinfo(date).subscribe((workdata) => {
  console.log(workdata)
  if (workdata) {
    this.cards = workdata.location.map((data :Cardinfo ) => ({
     location:data.location,
pending:data.pending,
completed:data.completed
    }))
    this.displaylogo(0)


  } else {
    this.displaylogo(1)
    
    console.error(
      'Received null or undefined data from getWorkerDetails()'
    );
  }
});
}




}
