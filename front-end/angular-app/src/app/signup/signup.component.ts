import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ApiService } from '../core/api.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {

  form: FormGroup;
  message;
  messageClass;
  process = false;

  constructor(private  formBuilder: FormBuilder,
              private authService: ApiService,
              private router: Router) {

  }

  onRegisterSubmit() {
    this.process = true;
    this.disableForm()
    const user = {
      email: this.form.get('email').value,
      name: this.form.get('name').value,
      password: this.form.get('password').value
    }

    this.authService.registerUser(user).subscribe(data => {
      if (!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
        this.process = false;
        this.enableForm();
      } else {
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        this.process = true;
        setTimeout(() => {
          this.router.navigate(['/user']);
        }, 2000)
      }
    });
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['Andrey@i.ua', Validators.compose(
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(30),
          Validators.pattern(/^(\w|-)+@\w+\.[a-zA-Z]+$/i)
        ]
      )],
      name: ['Andrey', Validators.compose(
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
          Validators.pattern(/^[a-zA-Z0-9]+$/)
        ]
      )],
      password: ['123456789', Validators.compose(
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(32),
          Validators.pattern(/^[a-zA-Z0-9]+$/)
        ]
      )],
      confirm: ['123456789', Validators.compose(
        [
          Validators.required,
        ]
      )]
    }, {validator: this.matchingPasswords('password', 'confirm')})
  }

  disableForm() {
    this.form.controls['email'].disable();
    this.form.controls['name'].disable();
    this.form.controls['password'].disable();
    this.form.controls['confirm'].disable();
  }

  enableForm() {
    this.form.controls['email'].enable();
    this.form.controls['name'].enable();
    this.form.controls['password'].enable();
    this.form.controls['confirm'].enable();
  }


  matchingPasswords(password, confirm ){
    return (group: FormGroup) => {
      if (group.controls[password].value === group.controls[confirm].value){
        return null;
      } else {
        return {'matchingPasswords': true}
      }
    }
  }
}
