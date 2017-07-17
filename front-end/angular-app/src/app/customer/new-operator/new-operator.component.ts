import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../core/api.service';
import {StorageService} from '../../core/storage.service';
import {Router} from '@angular/router'

@Component({
  selector: 'app-new-operator',
  templateUrl: './new-operator.component.html',
  styleUrls: ['./new-operator.component.scss']
})
export class NewOperatorComponent implements OnInit {

  form: FormGroup;
  message;
  process = false;
  id;

  constructor (private  formBuilder: FormBuilder,
              private api: ApiService,
              private router: Router,
              private storage: StorageService) {

  }

  onRegisterSubmit() {
    this.process = true;
    this.form.disable();
    const user = {
      email: this.form.get('email').value,
      name: this.form.get('name').value,
      password: this.form.get('password').value,
      avatarURL: this.form.get('avatarURL').value,
      id: this.id
    };

    this.api.registerOperator(user).then(data => {
      if (!data.success) {
        this.message = data.message;
        this.process = false;
        this.form.enable();
      } else {
        this.message = data.message;
        this.process = true;
        setTimeout(() => {
          this.router.navigate(['/customer/operators/:id']);
        }, 2000)
      }
    });
  }

  ngOnInit() {
    this.id = this.storage.user;
    this.form = this.formBuilder.group({
      email: ['Andrey@i.ua', Validators.compose(
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(30),
          Validators.pattern(/^(\w|-)+@\w+(\.[a-zA-Z]+)+$/i)
        ]
      )],
      name: ['Andrey', Validators.compose(
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(30),
          Validators.pattern(/^[a-zA-Z0-9]+$/)
        ]
      )],
      password: ['123456789', Validators.compose(
        [
          Validators.required,
          Validators.minLength(2),
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
  matchingPasswords(password, confirm ) {
    return (group: FormGroup) => {
      if (group.controls[password].value === group.controls[confirm].value) {
        return null;
      } else {
        return {'matchingPasswords': true}
      }
    }
  }
}
