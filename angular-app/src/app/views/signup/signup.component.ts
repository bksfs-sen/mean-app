import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  userForm: any = new FormGroup({
    // firstName: new FormControl('')
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
        ],
        email: [
          '',
          [
            Validators.required,
            Validators.email,
            Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
          ]
        ],
        password: [
          '',
          Validators.compose(
            [
              Validators.required,
              Validators.minLength(8),
              Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*[^A-Za-z0-9])(?=.*?[0-9]).{8,}$')
            ]
          )
        ],
        confirmPassword: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*[^A-Za-z0-9])(?=.*?[0-9]).{8,}$')
          ]
        ],
        gender: 'male'
      },
      {
        validator: this.passwordConfirming
      }
    )
  }

  passwordConfirming(userFormInfo: any) {
    // console.log("userFormInfo", userFormInfo);
    if (userFormInfo.get('password').value !== userFormInfo.get('confirmPassword').value) {
      return { invalid: true }
    } else {
      return true;
    }
  }


  get invalidError() {
    return this.userForm.controls;
  }



  saveForm() {
    this.submitted = true;
    console.log("userForm.invalid======", this.userForm.value)
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

    setTimeout(() => {

      // checking edit form with reset from with validate
      this.userForm.value =
        this.userForm.reset({
          "firstName": "bharat",
          "lastName": "sen",
          "email": "bharat@gmail.com",
          "password": "Bharat@123",
          "confirmPassword": "Bharat@123",
          "gender": ""
        });
    }, 5000);
  }

}
