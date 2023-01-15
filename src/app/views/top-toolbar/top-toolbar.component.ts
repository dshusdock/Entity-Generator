import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RECIEVERS } from 'src/app/constants/datatypes';
import { MessageItem } from 'src/app/constants/message-item';
import { AppMessageService } from 'src/app/services/app-message.service';
//import * as fs from 'fs';

@Component({
    selector: 'app-top-toolbar',
    templateUrl: './top-toolbar.component.html',
    styleUrls: ['./top-toolbar.component.scss']
})
export class TopToolbarComponent implements OnInit {
    entityClassName = "";

    constructor(
        private router: Router,
        private readonly messageService: AppMessageService
    ) { }

    ngOnInit(): void {
        this.messageService.messageQueueListener().subscribe((msg: any) => {
            this.processIncomingMessages(msg);
        });
    }

    processIncomingMessages(msg: MessageItem<any>) {
        if (msg.reciever === RECIEVERS.TOOLBAR) {
            this.entityClassName = msg.payload;
        }
        console.log("Got message: " + msg);
    }

    onCreateEntity() {
        this.router.navigate(['/app-entity-creator']);
    }

    public saveFileName = "test";
    public saveFileContent = '{ "name": "test"}';
    public saveFileExtension = 'json';


    public onSaveFile(): void {
        let fileName = this.saveFileName + '.' + this.saveFileExtension;
        let fileContent = this.saveFileContent;
        // let fileContent = JSON.stringify( {name: "test name"} );

        const file = new Blob([fileContent], { type: "text/plain" });

        const link = document.createElement("a");
        link.href = URL.createObjectURL(file);
        link.download = fileName;
        link.click();
        link.remove();

    }

    public onResetList() {

    }

    onTestClick() {
        alert("This is a test");
    }

}
