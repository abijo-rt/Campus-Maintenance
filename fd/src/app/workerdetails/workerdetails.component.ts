import { MenuItem, MessageService } from 'primeng/api';
import { TabMenuModule } from 'primeng/tabmenu';
import { DividerModule } from 'primeng/divider';
import { Component, OnInit, ElementRef } from '@angular/core';
import {
  ProductServiceService,
  details,
  options,
  type,
} from '../.serive/product-service.service';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { DropdownModule } from 'primeng/dropdown';
import { PaginatorModule } from 'primeng/paginator';
import { FormsModule } from '@angular/forms';

import { ApiService } from '../.serive/api.service';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-workerdetails',
  standalone: true,
  imports: [
    TabMenuModule,
    DividerModule,
    CommonModule,
    TableModule,
    ToastModule,
    ButtonModule,
    TagModule,
    DropdownModule,
    PaginatorModule,
    DialogModule,
    FormsModule,
  ],
  templateUrl: './workerdetails.component.html',
  styleUrl: './workerdetails.component.css',
})
export class WorkerdetailsComponent {

okclick() {
  this.visible = false;
  this.show()
}

  constructor(
    private productServiceService: ProductServiceService,
    private apiservice: ApiService,
    private message:MessageService,
  ) {}

  editdata: details | undefined;

  showDialog(inputElement: number) {

    this.editdata = this.workerdata.find(
      (element) => element.staffid == inputElement
    );
    this.visible = true;
    console.log(this.editdata);
  }

  visible: boolean = false;
  getSeverity(status: boolean): string | undefined {
    switch (status) {
      case true:
        return 'success';
      case false:
        return 'danger';
    }
  }

  getStatus(status: boolean): string | undefined {
    switch (status) {
      case true:
        return 'Free';
      case false:
        return 'Busy';
    }
  }
  activeItem: MenuItem | undefined;
  items: MenuItem[] | undefined;
  workerdata!: details[];

  ngOnInit() {
    this.activeItem = { label: 'Worker Details' };
    this.items=this.productServiceService.getMenuItem()

    
    this.apiservice.getWorkerDetails().subscribe((data) => {
   //   console.log(data); 
      if (data) {
        this.workerdata = data.map((worker) => ({
          name: worker.name,
          staffid: worker.staffid,
          status: worker.status,
          phone: worker.phone,
          gender: worker.gender,
          skill: worker.skill,
        }));

        console.log(this.workerdata); 
      } else {
        console.error(
          'Received null or undefined data from getWorkerDetails()'
        );
      }
    });
  }


show():void{
  
  this.message.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
}
}
