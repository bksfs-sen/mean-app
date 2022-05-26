import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  userForm: any = new FormGroup({
    firstName: new FormControl('')
  })
  submitted = false;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.configUserForm()
  }

  configUserForm() {
    this.userForm = this.fb.group(
      {
        firstName: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.pattern('^[a-zA-Z]+$'),
          ],
        ],
        lastName: [
          '',
          [
            Validators.required,
            Validators.minLength(3)
          ]
        ]
      }
    )
  }

  get invalidError() {
    return this.userForm.controls;
  }

  saveForm() {
    this.submitted = true;
    console.log("userForm.invalid======", this.userForm.valid)
    if (this.userForm.valid) {
      console.log("0000", JSON.stringify(this.userForm.value, null, 2));
      return;
    } else {
      console.log("1111", JSON.stringify(this.userForm.value, null, 2));

    }
  }


  validateInputKey(formKey: any) {
    if (this.userForm.get(formKey) && this.userForm.get(formKey).invalid) {
      return 'text-danger'
    } else {
      return 'text-success'
    }
  }

  resetForm() {
    this.configUserForm()
  }

}
