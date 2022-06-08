import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class SignupValidationService {
  skills: any[] = [{
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
  constructor(private fb: FormBuilder) { }
  signupForm() {
    this.skills.filter((ele: any) => ele.value = false);
    return this.fb.group(
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
        skills: this.fb.array([], [Validators.required, Validators.minLength(1)]),
        terms: [
          false,
          [
            Validators.requiredTrue
          ]
        ],
        address: this.fb.group({
          city: [
            '',
            [Validators.required]
          ],
          floorDtails: this.fb.group({
            floorN: [
              5,
              [Validators.required, Validators.maxLength(6), Validators.pattern(/^-?(0|[1-9]\d*)?$/)]
            ],
            floorDetails: [
              '',
              [Validators.required, Validators.maxLength(100), Validators.pattern('^[a-zA-Z]+$')]
            ],
            floorRoomN: [
              '',
              [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]
            ],
          }),
          zipCode: [
            '',
            [Validators.required, Validators.maxLength(6), Validators.pattern('^[1-9][0-9]{5}$')]
          ],
          state: [
            '',
            [Validators.required]
          ]
        })
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
}
