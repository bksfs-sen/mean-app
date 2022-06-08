import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiUserService } from 'src/app/services/api-user.service';
import { SignupValidationService } from './signup-validation.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  userForm: any = {}
  submitted = false;
  addHobby: string = '';
  skills: Array<any> = this.signupValidation.skills

  constructor(private fb: FormBuilder, private apiUserService: ApiUserService, private signupValidation: SignupValidationService) { }
  ngOnInit(): void {
    this.userForm = this.signupValidation.signupForm();
  }

  get checkInvalid() {
    return this.userForm.controls;
  }

  saveForm() {
    this.submitted = true;
    // const formCopy = Object.assign({}, this.userForm.getRawValue());

    if (this.userForm.valid) {
      // console.log('form is valid')
      this.apiUserService.SaveUser(this.userForm.value).subscribe({
        next: (res) => {
          this.userForm = this.signupValidation.signupForm();
          // this.userForm.reset();
        },
        error: (error) => {
          console.log("error===============", error);
        }
      })
    } else {
      console.log('form is invalid')
    }
  }


  validateInputKey(formKey: any) {
    if (this.userForm.get(formKey) && this.userForm.get(formKey).invalid) {
      return 'text-danger'
    } else {
      return 'text-success'
    }
  }

  addHobbies() {
    if (!this.addHobby) {
      alert('Please enter add hobby!');
    } else {
      if (this.getHobbies.controls.length) {
        const foundAlreadyExit = this.getHobbies.controls.find((hobbyEle: any) => this.addHobby === hobbyEle.value);
        if (!foundAlreadyExit) {
          this.getHobbies.push(new FormControl(this.addHobby))
        } else {
          alert('This Hobby already exits !');
        }
      } else {
        this.getHobbies.push(new FormControl(this.addHobby))
      }
    }
    this.addHobby = '';
  }

  get getHobbies(): FormArray {
    return this.userForm.get('hobbies') as FormArray;
  }

  removeHobbies(index: number) {
    this.getHobbies.removeAt(index)

  }

  setUnsetSkill($event: any, skill: any) {
    let allSkills: any = this.getSkills;
    if ($event.target.checked) {
      skill.value = true;
      allSkills.push(new FormControl(skill));
    } else {
      skill.value = false;
      this.getSkills.controls.forEach((ele: any, index) => {
        if (ele.value.name === skill.name) {
          this.getSkills.removeAt(index);
          return;
        }
      })
    }
  }

  get getSkills(): FormArray {
    return this.userForm.get('skills') as FormArray;
  }

  resetForm() {
    // this.configUserForm()

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
