import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl:'./app.component.html' ,
 // templateUrl:'<app-root></app-root>  ',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name: string = 'Employee Details';
  isdisabled:boolean=true;

}
