import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MdButtonModule, MdDialogModule, MdInputModule,
        MdProgressBarModule, MdSelectModule, MdTabsModule} from '@angular/material';
import {AccordionModule} from 'primeng/components/accordion/accordion';

import {ChatComponent} from './chat/chat.component';
import {ClientInfoComponent} from './client-info/client-info.component';
import {DialogWiindowComponent} from './dialog-window/dialog-window.component';
import {DialogsHistoryComponent} from './dialogs-history/dialogs-history.component';
import {OperatorsComponent} from './operator.component';
import {PopupDialogComponent} from './dialog-window/popup-dialog.component';

@NgModule({
  declarations: [
    ChatComponent,
    ClientInfoComponent,
    DialogWiindowComponent,
    DialogsHistoryComponent,
    OperatorsComponent,
    PopupDialogComponent
  ],
  entryComponents: [
    PopupDialogComponent
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
