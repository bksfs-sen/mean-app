import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignupRoutingModule } from './signup-routing.module';
import { SignupComponent } from './signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupValidationForm } from './signup-validation-form';


@NgModule({
  declarations: [
    SignupComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SignupRoutingModule,
    ReactiveFormsModule
  ],
  providers: [SignupValidationForm],
})
export class SignupModule { }
