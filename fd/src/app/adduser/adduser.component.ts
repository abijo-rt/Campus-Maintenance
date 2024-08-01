import { Component } from '@angular/core';
import { TabMenuModule } from 'primeng/tabmenu';
import { MenuItem } from 'primeng/api';
import {  FormControl,  FormControlName,  FormGroup,  Validators,} from '@angular/forms';
import { FormsModule } from '@angular/forms'; // for template-driven forms
import { DropdownModule } from 'primeng/dropdown';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { ApiService } from '../.serive/api.service';
import { ProductServiceService,StaffDetails, details } from '../.serive/product-service.service';


interface work {
  name: string;
}
interface gender{
  name:string;
}
interface City {
  name: string;
  code: string;
}


@Component({
  selector: 'app-adduser',
  standalone: true,
  imports: [
    TabMenuModule,
    InputTextModule,
    DropdownModule,
    FloatLabelModule,
    MessagesModule,
    ReactiveFormsModule,
    ToastModule,
    MultiSelectModule,
    InputNumberModule,
    FormsModule,
    ButtonModule,
  ],
  templateUrl: './adduser.component.html',
  styleUrl: './adduser.component.css',
})
export class AdduserComponent {
  name: string | undefined;
  form!: FormGroup;
  work: work[] | undefined;
  gender: gender[] | undefined;
  phoneno: number | undefined;
  activeItem: MenuItem | undefined;
  items: MenuItem[] | undefined;
  cities: City[] | undefined;
  loading: boolean = false;
 
  constructor(private message: MessageService,private apiservice :ApiService,private productservice:ProductServiceService) {}
  payLoad = '';
 

onSubmit(){
  this.loading=true;
this.show();

  let formdata :StaffDetails = {
    name: this.form.value.name,
    phone: this.form.value.phoneno,
    skill: (this.form.value.selectedwork).map((items: { name: string; })=> items.name),
    gender: this.form.value.selectedgender.name,
  }
  


console.log(formdata)
  this.apiservice
    .addstaff(formdata)
    .subscribe((response) => console.log(response.status));
  
}

show():void{
  this.message.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
  this.loading=false;
}

  

  ngOnInit() {
    

    this.work = [
      { name: 'Mason' },
      { name: 'Welding' },
      { name: 'plumbing' },
      { name: 'Wiring' },
      { name: 'Palining' },
    ];
    
    this.activeItem = { label: 'Add Worker' };
    this.items=this.productservice.getMenuItem()
   
    
    this.gender = [{ name: 'male' }, { name: 'female' }];

    this.form = new FormGroup({
      name: new FormControl<string | null>(null, [
        Validators.required,
        Validators.minLength(4),
      ]),
      selectedwork: new FormControl<string[] | null>(null, Validators.required),
      selectedgender: new FormControl<gender | null>(null, Validators.required),

      phoneno: new FormControl(null, Validators.required),
    });
  }
}







