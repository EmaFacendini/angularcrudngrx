import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../model/Employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  apiUrl = 'http://localhost:3000/employees';

  constructor(private http:HttpClient) { }

  GetAll(){
    return this.http.get<Employee[]>(this.apiUrl);
  }

  Get(empid:number){
    return this.http.get<Employee>(this.apiUrl+'/'+empid);
  }

  Create(data: Employee){
    return this.http.post(this.apiUrl,data);
  }

  Update(data: Employee){
    return this.http.put(this.apiUrl+'/'+data.id,data);
  }

  Delete(empid:number){
    return this.http.delete(this.apiUrl+'/'+empid);
  }
}
