import { MenuItem } from 'primeng/api';
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
import { filter } from 'rxjs';
import { ApiService } from '../.serive/api.service';

@Component({
  selector: 'app-workerdetails',
  standalone: true,
  imports: [
    TabMenuModule,
    DividerModule,
    TableModule,
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
  constructor(
    private productServiceService: ProductServiceService,
    private apiservice: ApiService
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
    this.items = [{ label: 'Worker Details' }];
    this.activeItem = this.items[0];

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
}
