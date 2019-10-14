import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  employeeForm: FormGroup;
  constructor(private fb:FormBuilder) { }

  ngOnInit() {
    this.employeeForm =this.fb.group({
      fullName: ['',Validators.required],
      email: [''],
      skills:this.fb.group({
        skillsName:['',Validators.required],
        Experience:[''],
        proficiency:['beginner']
      })
    });

  }
  loadDataMethod():void{
    this.employeeForm.patchValue({
      fullName:"naveen",
      email:'naveen@gamail.cion',
      skills:{
        skillsName:'java',
        Experience:'1',
        proficiency:'Intermediate'
     }
    })
  }
  onSubmit(): void {
    console.log(this.employeeForm);
    console.log(this.employeeForm.get('fullName').value);
  }

}
