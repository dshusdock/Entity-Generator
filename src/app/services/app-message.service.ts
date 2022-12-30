import { Injectable } from '@angular/core';
//import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable()
export class AppMessageService {
    private messageSource = new Subject<string>();
    currentMessage = this.messageSource.asObservable();
    private msgSendCnt = 0;

    constructor() { }

    private changeMessage(message: string) {
        return this.messageSource.next(message);
    }

    sendMessage(message: any) {
        this.msgSendCnt++;
        return this.messageSource.next(message);
    }

    showStats() {
        console.log('Messages Sent: ' + this.msgSendCnt);
    }

    getObservable() {
        return this.currentMessage;
    }
}