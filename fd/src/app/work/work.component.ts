import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenuItem, MessageService } from 'primeng/api';
import { TabMenuModule } from 'primeng/tabmenu';
import { DividerModule } from 'primeng/divider';
import { Component, OnInit } from '@angular/core';
import { ProductServiceService, worklog, type } from '../.serive/product-service.service';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { TagModule } from 'primeng/tag';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { PaginatorModule } from 'primeng/paginator';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../.serive/api.service';
import { ToastModule } from 'primeng/toast';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-work',
  standalone: true,
  imports: [
    BreadcrumbModule,
    PaginatorModule,
    ToggleButtonModule,
    DividerModule,
    TabMenuModule,
    DialogModule,
    TableModule,
    ButtonModule,
    TagModule,
    DropdownModule,
    FormsModule,
    ToastModule
  ],
  templateUrl: './work.component.html',
  styleUrl: './work.component.css',
})
export class WorkComponent implements OnInit {
  checked: boolean = false;
  editdata!:worklog |undefined ;
  activeItem: MenuItem = { label: 'Work Log' };

showDialog(inputElement: number) {
    this.editdata=this.products.find(
      (element) => element.taskid == inputElement
    );
    this.visible = true;
  }
  
  oneditdata(){
    if (this.editdata && this.editdata.taskid !== undefined) {
      console.log(this.editdata)
      
      this.apiservice.editwork(this.editdata).pipe(
        catchError((error: any) => {
         this.showMsg(500)
          return throwError(() => error);  // Re-throw the error
        })
      ).subscribe((response :any) => {
        this.showMsg(response.status)
        console.log('Data updated successfully:', response.status);
        if((this.editdata!== undefined)&& response.status==200){
          
this.editdata.status=true;
        }
        
    });
      this.visible = false;
    }

    
  }



  visible: boolean = false;
  statuses!: any[];
  items: MenuItem[] | undefined;
  loading: boolean = false;
  products!: worklog[];
  cate!: type[];

  constructor(
    private productServiceService: ProductServiceService,
    private apiservice: ApiService,
    private message:MessageService,
  ) { }

  ngOnInit() {
    this.items=this.productServiceService.getMenuItem()



    this.apiservice.getworklog().subscribe((workdata: worklog[]) => {
      if (workdata) {
        this.products = workdata.map(data => ({
          date: data.date,
          taskid: data.taskid,
          location: data.location,
          category: data.category,
          workerCount: data.workerCount,
          status: data.status,
          workerDetails: data.workerDetails,
          remarks: data.remarks
        }))

        //console.log(this.products)
      } else {
        console.error(
          'Received null or undefined data from getWorkerDetails()'
        );
      }
    });




    this.loading = false;
    this.cate = this.productServiceService.getCate();

    this.statuses = [
      { label: 'Complete', value: true },
      { label: 'Pending', value: false },
    ];





  }

  getSeverity(status: boolean | undefined): string | undefined {
    switch (status) {
      case true:
        return 'success';
      case false:
        return 'danger';
        case undefined:
          return undefined  ;
    }
  }

  getStatus(status: boolean |undefined): string | undefined {
    switch (status) {
      case true:
        return 'Completed';
      case false:
        return 'Pending';
      case undefined:
      return undefined  ;
    }
  }

  showMsg(status:number):void{
    switch (status) {
      case 200:
        this.message.add({ severity: 'success', summary: 'Success', detail: 'Worker Details Upadated' });
        break;
      case 500:
          this.message.add({ severity: 'error', summary: 'failed', detail: 'Can not update worker Details' });
          break;
      default:
        break;
    }
  }
}


