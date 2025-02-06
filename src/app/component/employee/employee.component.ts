import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { MatDialog } from '@angular/material/dialog';
import { Employee } from '../../model/Employee';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { EmployeeService } from '../../service/employee.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatDialogModule, MatTableModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit, OnDestroy {

  empList: Employee[] = [];
  datatable!:MatTableDataSource<Employee>;
  displayedColumns: string[] = ['id', 'name', 'doj', 'role', 'salary', 'action'];
  subscription= new Subscription();

  constructor(private dialog: MatDialog, private service: EmployeeService) {
    console.log('EmployeeService:', this.service); // Verifica que el servicio esté inyectado
    this.GetallEmployee();

   }
  ngOnDestroy(): void {

    this.subscription.unsubscribe();
  }
  ngOnInit(): void {
    
  }

  GetallEmployee() {
    let sub= this.service.GetAll().subscribe(item => {
      this.empList = item;
      this.datatable = new MatTableDataSource(this.empList)
    })
    this.subscription.add(sub);
  }
    addEmployee() {
        this.dialog.open(AddEmployeeComponent, {
          width: '50%',
          exitAnimationDuration: '1000ms',
          enterAnimationDuration: '1000ms'  
        });

        
    }
}
