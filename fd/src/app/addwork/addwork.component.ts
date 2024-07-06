import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagModule } from 'primeng/tag';
import { TabMenuModule } from 'primeng/tabmenu';
import { MenuItem } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputNumberModule } from 'primeng/inputnumber';
import { CalendarModule } from 'primeng/calendar';
import { ApiService } from '../.serive/api.service';
import { ProductServiceService, worklog, options } from '../.serive/product-service.service';
import { map } from 'rxjs';

interface Option {
  name: string;
}

@Component({
  selector: 'app-addwork',
  standalone: true,
  imports: [
    TabMenuModule,
    FormsModule,
    TagModule,
    ReactiveFormsModule,
    InputNumberModule,
    CalendarModule,
    MultiSelectModule,
    InputTextModule,
    DropdownModule,
    CommonModule,
  ],
  templateUrl: './addwork.component.html',
  styleUrls: ['./addwork.component.css'],
})
export class AddworkComponent implements OnInit {
  activeItem: MenuItem = { label: 'New Work' };
  
  items = [
    { label: 'Dash Board', routerLink: '/dashboard' },
    { label: '+ New Work', routerLink: '/addwork' },
    { label: '+ New Worker', routerLink: '/adduser' },
    { label: 'Work Log', routerLink: '/works' },
    { label: 'Worker Details', routerLink: '/workerdetails' },
    { label: 'Settings', routerLink: '/settings' },

  ];
  workdata!: worklog;
  ngoption:options[] =[];
  Olocation: options[] | undefined;
  Otype: options[] | undefined;
  Oname: options[] | undefined;
  newdate!:string;
  date!: Date;
  slocation: string | undefined;
  stype: string | undefined;
  taskid!: number;
  numberOfFields!: number;
  inputFields: string[] = [];
  formdata!: worklog | undefined;
  
  constructor(private apiservice: ApiService, private productServiceService: ProductServiceService) { }
  
  ngOnInit() {
    this.Olocation = this.productServiceService.getOlocation();
    this.Otype = this.productServiceService.getOtype();
    
    this.apiservice.getOstaff().subscribe(
      (data) => {
        this.Oname = data.map((item) => ({ name: item.name }));
      },
      (error) => {
        console.error("Error fetching data:", error);
      }
      
    );
  }

  onSubmit() {
    if (this.validateForm()) {
      this.workdata = this.getformdata();
      console.log('Form Data:', this.workdata); // Accessing the values
      this.postform();
    }
  }

  postform() {
    this.apiservice.addwork(this.workdata).subscribe((response) => console.log(response));
  }

  validateForm(): boolean {
    if (this.numberOfFields <= 0) {
      return false;
    }
    return true;
  }

  generateInputFields() {
    this.inputFields = Array.from({ length: this.numberOfFields }, () => '');
  }

  onFieldChange(event: any, index: number) {
    const selectedValue = event.value;
    this.inputFields[index] = selectedValue ? selectedValue.name : '';
    this.ngoption[index]={name:selectedValue ? selectedValue.name : ''}

    console.log(`Field changed at index: ${index}`);
    console.log(`Field value: ${this.inputFields[index]}`); // Accessing the value of changed field
  }


  dateformat(date: Date): string {
    // Extract day, month, and year from the date object
    const day: string = String(date.getDate()).padStart(2, '0'); // Ensure two digits with leading zero
    const month: string = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-indexed
    const year: number = date.getFullYear();

    // Concatenate day, month, and year with hyphens
    return `${day}-${month}-${year}`;
}

  getformdata(): worklog {

    this.newdate=this.dateformat(this.date);

    this.formdata = {
      date: this.newdate,
      location: this.slocation || '',
      category: this.stype || '',
      taskid: this.taskid || 0,
      workerCount: this.numberOfFields || 0,
      workerDetails: this.inputFields,
      status: false,
      remarks: '',
    };

   

    return this.formdata;
  }
}
