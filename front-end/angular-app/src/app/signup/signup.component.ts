import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ApiService } from '../core/api.service';

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
              private authService: ApiService) {

  }

  onRegisterSubmit(){
    this.process = true;
    const user = {
      email: this.form.get('email').value,
      name: this.form.get('name').value,
      password: this.form.get('password').value
    }

    this.authService.registerUser(user).subscribe(data => {
      if(!data.success){
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
        this.process = false
      } else {
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        this.process = true;
      }
    })
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



  matchingPasswords(password, confirm ){
    return (group: FormGroup) => {
      if(group.controls[password].value === group.controls[confirm].value){
        return null;
      } else {
        return {'matchingPasswords': true}
      }
    }
  }
}
