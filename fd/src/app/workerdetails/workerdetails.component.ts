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
import { MultiSelectModule } from 'primeng/multiselect';
import { ApiService } from '../.serive/api.service';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';

interface gender{
  name:string;
}

interface work {
  name: string;
}

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
    MultiSelectModule
  ],
  templateUrl: './workerdetails.component.html',
  styleUrl: './workerdetails.component.css',
})



export class WorkerdetailsComponent {
editgender: any;
editskill: any;
editphone: any;
editname: any;
reset() {
throw new Error('Method not implemented.');
}
gender: gender[] | undefined;
work: work[] | undefined;

okclick() {
 
  const update = {
    name : this.editname ,
    gender : this.editgender ,
    phone : this.editphone ,
    skill : this.editskill,
    id : this.editdata?.staffid
  }
  this.apiservice.updateworkerdata(update).subscribe((res) => {
    // console.log("respnse" , res.ok)
    if(res){
      this.showMsg(200)
    }else{
      this.showMsg(400)
    }
  })
  console.log(update)
  
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

    this.gender = [{ name: 'male' }, { name: 'female' }];
    
    this.work = [
      { name: 'Mason' },
      { name: 'Welding' },
      { name: 'plumbing' },
      { name: 'Wiring' },
      { name: 'Palining' },
    ];

    this.apiservice.getWorkerDetails().subscribe((data) => {
      
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


showMsg(status:number):void{
  switch (status) {
    case 200:
      this.message.add({ severity: 'success', summary: 'Success', detail: 'Worker Details Upadated' });
      break;
    case 400:
        this.message.add({ severity: 'error', summary: 'failed', detail: 'Can not update worker Details' });
        break;
    default:
      break;
  }
}

}
