


import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Resolve } from '@angular/router';
@Injectable()
export class SingupForm {

  constructor(private fb: FormBuilder) { }
  Resolve() {
    return {
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
      ]
    }
  }
}