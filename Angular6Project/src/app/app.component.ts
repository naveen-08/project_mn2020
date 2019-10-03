import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  // template: `<div>
  //                      <h1>{{name}} </h1>
  //                      <my-Employee></my-Employee>
  //           </div>`,
  template:`<div><h1>{{name}}</h1>
  <my-Employee></my-Employee>
  
  </div>`,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name: string = 'Employee Details';

}
