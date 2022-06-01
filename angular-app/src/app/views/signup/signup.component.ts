import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiUserService } from 'src/app/services/api-user.service';

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
  addHobby: string = '';
  skills: Array<any> = [
    {
      name: 'node',
      value: false
    },
    {
      name: 'angular',
      value: false
    },
    {
      name: 'mongo',
      value: false
    },
    {
      name: 'express',
      value: false
    },
    {
      name: 'nestJS',
      value: false
    }
  ]
  constructor(private fb: FormBuilder, private apiUserService: ApiUserService) { }

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
        gender: 'male',
        hobbies: this.fb.array([], [Validators.required, Validators.minLength(1)]),
        skills: this.fb.array([], [Validators.required, Validators.minLength(1)])
      },
      {
        validator: this.passwordConfirming
      }
    )
  }

  passwordConfirming(userFormInfo: any) {
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
    if (this.userForm.valid) {
      // console.log('form is valid')
      this.apiUserService.SaveUser(this.userForm.value).subscribe({
        next: (res) => {
          console.log("res===============", res);
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

    // console.log("e.target=====", $event.target.checked)
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
