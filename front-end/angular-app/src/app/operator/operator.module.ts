import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MdButtonModule, MdDialogModule, MdInputModule,
        MdProgressBarModule, MdSelectModule, MdTabsModule} from '@angular/material';
import {AccordionModule} from 'primeng/components/accordion/accordion';

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
    AccordionModule,
    CommonModule,
    FormsModule,
    MdButtonModule,
    MdDialogModule,
    MdInputModule,
    MdProgressBarModule,
    MdSelectModule,
    MdTabsModule
  ]
})
export class OperatorsModule {
}
