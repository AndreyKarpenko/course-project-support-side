import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {DialogDetailsComponent} from './dialog-details.component';
import {DialogResolver} from './dialog-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: DialogDetailsComponent,
    resolve: {
      dialog: DialogResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [DialogResolver]
})
export class DialogDetailsRoutingModule {
}
