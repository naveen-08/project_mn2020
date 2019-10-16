import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors, EmailValidator, FormArray, FormControl } from '@angular/forms';
import { Key } from 'protractor';
import { CustomValidator } from './shared/custom_validator';
@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  employeeForm: FormGroup;
  fullName: 0;
  formErrors = {

  };

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.employeeForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      contactPreference: ['email'],
      emailGroup: this.fb.group({
        email: ['', [Validators.required, CustomValidator.emailDomain('gmail.com')]],
        Confirmemail: ['', Validators.required],
      }, { validators: matchEmail }),
      phone: ['', Validators.required],
      skills: this.fb.array([
        this.addSkillFormGroup(),
      ]),
    });
    /////====value changes using value=====//////
    // this.employeeForm.valueChanges.subscribe((value: any) => {
    //   console.log(JSON.stringify(value))
    // });
    //////======end value change====/////
    this.employeeForm.valueChanges.subscribe((data) => {
      this.logValidationErrorMessage(this.employeeForm);
    })
  }
  ////===dynamic form array===///
  addSkillMethod(): void {
    (<FormArray>this.employeeForm.get('skills')).push(this.addSkillFormGroup());
  }
  ////====end======////
  ///======form array example======////
  addSkillFormGroup(): FormGroup {
    return this.fb.group({
      skillsName: ['', Validators.required],
      Experience: ['', Validators.required],
      proficiency: ['', Validators.required]
    })
  }

  /////====end====////
  logKeyValuePaire(group: FormGroup): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      if (abstractControl instanceof FormGroup) {

        this.logKeyValuePaire(abstractControl);

      } else {
        abstractControl.markAsDirty();
        // console.log("key ="+key+'value ='+abstractControl.value);
      }

    });
  }
  logValidationErrorMessage(group: FormGroup = this.employeeForm): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);

      this.formErrors[key] = ' ';
      if (abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty)) {
        const message = this.validateMessage[key];
        for (const errorKey in abstractControl.errors) {
          if (errorKey) {
            this.formErrors[key] += message[errorKey] + ' ';
          }
        }

      }
      if (abstractControl instanceof FormGroup) {
        this.logValidationErrorMessage(abstractControl);
      }

    });
  }
  onChangeValue(selectedValue: string) {
    const phone = this.employeeForm.get('phone');
    if (selectedValue === 'phone') {
      phone.setValidators(Validators.required);
    } else phone.clearValidators();
    phone.updateValueAndValidity();
  }
  loadDataMethod(): void {
    const formArray1 = new FormArray([
      new FormControl('JOHN', Validators.required),
      new FormControl('IT', Validators.required),
      new FormControl('', Validators.required),

    ]);
    const FormGroup = this.fb.group([
      new FormControl('JOHN', Validators.required),
      new FormControl('IT', Validators.required),
      new FormControl('', Validators.required),
    ]);
    console.log(formArray1);
    console.log(FormGroup);
    //this.logKeyValuePaire(this.employeeForm); 
    // this.logValidationErrorMessage(this.employeeForm);
    // console.log(this.formErrors);

  }

  validateMessage = {
    'fullName': {
      'required': 'Full Name is required',
      'minlength': '   Full Name is minimum of 2 character and maximum of 10 character',
      'maxlength': '   Full Name is minimum of 2 character and maximum of 10 character'
    },
    'email': {
      'required': 'email is required',
      'emailDomain': 'Email should be in required format'
    },
    'emailGroup': {
      'emailMismatch': 'Email and confirm Email do not match'
    },
    'Confirmemail': {
      'required': 'Confirm email is required',
    },
    'phone': { 'required': 'phone is required' }


  }

}
function matchEmail(group: AbstractControl): { [key: string]: any } | null {
  const emailControl = group.get('email');
  const confirmemailControl = group.get('Confirmemail');
  if (emailControl.value === confirmemailControl.value || confirmemailControl.pristine) {
    return null;
  } else return { 'emailMismatch': true }


}





