import { Component, Input } from '@angular/core';
import { CardComponent } from "../card/card.component";
import { CommonModule } from '@angular/common';
import { Cardinfo, ProductServiceService } from '../.serive/product-service.service';
import { ApiService } from '../.serive/api.service';

@Component({
  selector: 'app-d-grid',
  standalone: true,
  imports: [CardComponent,CommonModule],
  templateUrl: './d-grid.component.html',
  styleUrl: './d-grid.component.css'
})
export class DGridComponent {
// @Input() date:string;



cards!:Cardinfo[];

constructor(private apiservice : ApiService){}

ngOnInit() {

}

  cardinfoapi(date:string):void{
  this.apiservice.getcardinfo(date).subscribe((workdata) => {
    console.log("workdata")
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
  })
  }


}

  

