import { Component, Input, SimpleChanges } from '@angular/core';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { Cardinfo, ProductServiceService } from '../.serive/product-service.service';

import { ProgressBarModule } from 'primeng/progressbar';




@Component({
  selector: 'app-card',
  standalone: true,
  imports: [BadgeModule,ButtonModule,CommonModule,ProgressBarModule,
    CardModule
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})

export class CardComponent {


@Input() location : string |undefined;
@Input() completed : number |undefined;
@Input() pending : number |undefined;


total: number = 0;
  percentage: number = 0;

  ngOnInit(): void {
    this.calculateValues();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['completed'] || changes['pending']) {
      this.calculateValues();
    }
  }

  private calculateValues(): void {
    if (this.completed !== undefined && this.pending !== undefined) {
      this.total = this.completed + this.pending;
      this.percentage = Math.round( (this.completed / this.total) *100) ;
    }
  }
}


