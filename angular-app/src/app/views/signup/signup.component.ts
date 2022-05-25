import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  userForm: FormGroup = new FormGroup({
    firstName: new FormControl('')
  })
  submitted = false;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    // this.configUserForm()
  }

  configUserForm() {
    // this.userForm = this.fb.group({
    //   firstName: [
    //     '',
    //     [
    //       Validators.required,
    //       Validators.minLength(3),
    //       Validators.maxLength(10),
    //       Validators.pattern('^[a-zA-Z]+$')
    //     ]
    //   ]
    // })
  }
  get f(): { [key: string]: AbstractControl } {
    return this.userForm.controls;
  }

  saveForm() {
    this.submitted = true;
    if (this.userForm.invalid) {
      console.log("0000", JSON.stringify(this.userForm.value, null, 2));
      return;
    } else {
      console.log("1111", JSON.stringify(this.userForm.value, null, 2));

    }
  }

}
