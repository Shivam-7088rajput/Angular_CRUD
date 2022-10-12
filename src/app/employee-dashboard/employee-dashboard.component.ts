import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup} from '@angular/forms'
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './employee-dashboard.model';



@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {


  formValue !: FormGroup;
  employeeModelObj : EmployeeModel = new EmployeeModel();
  employeeData !:any; 
  showAdd! : boolean;
  showUpdate!:boolean;

  constructor(private formbuilder: FormBuilder, private api : ApiService) { }

  ngOnInit(): void {
    this.formValue =this.formbuilder.group({
      employeeName :[''],
      employeeAddress :[''],
      employeeEmail :[''],
      employeeDob :[''],
      employeeGender:[''],
      employeeDoj: [''],
      employeeStatus:[''],
      employeeContact :['']
      
    })
    this.getAllEmployee();
  }
  clickAddEmployee(){
    this.formValue.reset();
    this.showAdd=true;
    this.showUpdate = false;
  }
  postEmployeeDetails(){
    this.employeeModelObj.employeeName = this.formValue.value.employeeName;
    this.employeeModelObj.employeeAddress = this.formValue.value.employeeAddress;
    this.employeeModelObj.employeeEmail = this.formValue.value.employeeEmail;
    this.employeeModelObj.employeeDob = this.formValue.value.employeeDob;
    this.employeeModelObj.employeeGender = this.formValue.value.employeeGender;
    this.employeeModelObj.employeeDoj = this.formValue.value.employeeDoj;
    this.employeeModelObj.employeeStatus = this.formValue.value.employeeStatus;
    this.employeeModelObj.employeeContact = this.formValue.value.employeeContact;
    
    this.api.postEmployee(this.employeeModelObj).subscribe(res =>{
      console.log(res);
      alert("Employe Added Successfully")
      let ref = document.getElementById('cancel')
      ref?.click(); 
      this.formValue.reset();
      this.getAllEmployee();
    },err =>{
      console.log("Something Went Wrong")
    });
  }
  getAllEmployee(){
    this.api.getEmployee().subscribe(res =>{
      this.employeeData=res;
    })
  }
  deleteEmployee(row:any){
    this.api.deleteEmployee(row.id).subscribe(res=>{
      alert("Employee Deleted")
      this.getAllEmployee();
    })
  }
  onEdit(row: any){
    this.showAdd=false;
    this.showUpdate = true;
    this.employeeModelObj.id =row.id;
    this.formValue.controls['employeeName'].setValue(row.employeeName);
    this.formValue.controls['employeeAddress'].setValue(row.employeeAddress);
    this.formValue.controls['employeeEmail'].setValue(row.employeeEmail);
    this.formValue.controls['employeeDob'].setValue(row.employeeDob);
    this.formValue.controls['employeeGender'].setValue(row.employeeGender);
    this.formValue.controls['employeeDoj'].setValue(row.employeeDoj);
    this.formValue.controls['employeeStatus'].setValue(row.employeeStatus);
    this.formValue.controls['employeeContact'].setValue(row.employeeContact);
  }
  updateEmployeeDetails(){
    this.employeeModelObj.employeeName = this.formValue.value.employeeName;
    this.employeeModelObj.employeeAddress = this.formValue.value.employeeAddress;
    this.employeeModelObj.employeeEmail = this.formValue.value.employeeEmail;
    this.employeeModelObj.employeeDob = this.formValue.value.employeeDob;
    this.employeeModelObj.employeeGender = this.formValue.value.employeeGender;
    this.employeeModelObj.employeeDoj = this.formValue.value.employeeDoj;
    this.employeeModelObj.employeeStatus = this.formValue.value.employeeStatus;
    this.employeeModelObj.employeeContact = this.formValue.value.employeeContact;

    this.api.updateEmployee(this.employeeModelObj,this.employeeModelObj.id)
    .subscribe(res=>{
      alert("Updated Successfully")
      let ref = document.getElementById('cancel')
      ref?.click(); 
      this.formValue.reset();
      this.getAllEmployee();
    })
  }
}
