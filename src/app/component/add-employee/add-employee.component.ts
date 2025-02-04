import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule} from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { Employee } from '../../model/Employee';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EmployeeService } from '../../service/employee.service';


@Component({
  selector: 'app-add-employee',
  imports: [MatCardModule, ReactiveFormsModule, MatFormFieldModule, 
    MatInputModule, MatButtonModule, MatSelectModule, MatDatepickerModule, 
    MatIconModule
  ],
  providers: [provideNativeDateAdapter(), ],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})
export class AddEmployeeComponent {

  constructor(private service:EmployeeService,private ref:MatDialogRef<AddEmployeeComponent>) { }

  title = 'Add Employee'
  empForm = new FormGroup({
    id:new FormControl(0 ),
    name:new FormControl('',Validators.required),
    doj:new FormControl(new Date(),Validators.required),
    role:new FormControl('',Validators.required),
    salary:new FormControl(0,Validators.required),
  });

  SaveEmployee(){
    if(this.empForm.valid){
      let _data:Employee={
        id: this.empForm.value.id as number,
        name: this.empForm.value.name as string,
        doj: new Date(this.empForm.value.doj as Date),
        role: this.empForm.value.role as string,
        designation: '', // Add a default value or get it from the form
        salary: this.empForm.value.salary as number
      }

      this.service.Create(_data).subscribe(item=>{
        console.log(item);
        alert('Employee added successfully');
        this.closepopup();
      });
    }
  }

  closepopup(){
    this.ref.close();
  }

}
