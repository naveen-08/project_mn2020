import {Component } from '@angular/core';
  
@Component({
    selector:'my-Employee',
    templateUrl:'./employee.html',
})


export class EmployeeComponent{
    firstName:string='Tom';
    lastName:string='kumar';
    gender:string='male';
    age:string='24';
}