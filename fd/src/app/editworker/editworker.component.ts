import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // For ngModel
import { CommonModule } from '@angular/common'; // For ngFor


@Component({
  selector: 'app-editworker',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editworker.component.html',
  styleUrl: './editworker.component.css',
})
export class EditworkerComponent {
  numberOfFields: number = 0;
  inputFields: string[] = [];

  formData: any = {}; // Object to store form data

  generateInputFields() {
    this.inputFields = Array(this.numberOfFields).fill('');
  }

  onSubmit() {
    console.log('Form Data:', this.formData);
  }
}
