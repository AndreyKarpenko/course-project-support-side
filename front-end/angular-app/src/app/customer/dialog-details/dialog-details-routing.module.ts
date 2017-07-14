import {NgModule, Injectable} from '@angular/core';
import {Resolve, RouterModule, Routes, Router} from '@angular/router';
import {ApiService} from '../../core/api.service';
import {DialogDetailsComponent} from './dialog-details.component';

@Injectable()
export class DialogDetailsRoutingResolver implements Resolve<any> {
  constructor(
    private Api: ApiService,
    private router: Router
  ) {}

  resolve(): any {
    return this.Api.getDialogs()
      .then((dialogs) => {
        return dialogs;
      })
      .catch((err) => {
        console.log(err);
        this.router.navigate(['/error-message']);
      });
  }
}


const routes: Routes = [
  {
    path: '',
    component: DialogDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DialogDetailsRoutingModule {
}
