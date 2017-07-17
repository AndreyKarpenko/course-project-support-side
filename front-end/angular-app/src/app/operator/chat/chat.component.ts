import {Component, ElementRef, EventEmitter, Input, OnInit, Output,
        ViewChild} from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  @ViewChild('messagesBlock') messagesBlockRef: ElementRef;
  @Input() dialog;
  @Output() dialogFinished = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
    this.dialog.messages.push({
      date: Date.now(),
      role: 'operator',
      text: `Welcome, my name is ${this.dialog.operatorName}.\nAsk me something`,
    });
  }

  onChatFinished() {
    this.dialogFinished.emit(true);
  }

  receiveDummyMessage() {
    this.dialog.messages.push({
      date: Date.now(),
      role: 'client',
      text: 'No way I\'ll ask you anything, tell me something instead',
    });
    this.scrollMessagesBlockToBottom();
  }

  sendMessage(input, event?) {
    if (event) {
      event.preventDefault();
    }

    this.dialog.messages.push({
      date: Date.now(),
      role: 'operator',
      text: input.value,
    });

    input.value = '';
    this.scrollMessagesBlockToBottom();
  }

  private scrollMessagesBlockToBottom() {
    setTimeout(() => {
      this.messagesBlockRef.nativeElement.scrollTop =
        this.messagesBlockRef.nativeElement.scrollHeight;
    }, 0);
  }
}
