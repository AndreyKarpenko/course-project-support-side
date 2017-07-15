import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MdButtonModule, MdInputModule, MdSelectModule,
        MdTabsModule} from '@angular/material';

import {ChatComponent} from './chat/chat.component';
import {ClientInfoComponent} from './client-info/client-info.component';
import {DialogWiindowComponent} from './dialog-wiindow/dialog-wiindow.component';
import {DialogsHistoryComponent} from './dialogs-history/dialogs-history.component';
import {OperatorsComponent} from './operator.component';

@NgModule({
  declarations: [
    ChatComponent,
    ClientInfoComponent,
    DialogWiindowComponent,
    DialogsHistoryComponent,
    OperatorsComponent
  ],
  imports: [
    CommonModule,
    MdButtonModule,
    MdInputModule,
    MdSelectModule,
    MdTabsModule
  ]
})
export class OperatorsModule {
}
