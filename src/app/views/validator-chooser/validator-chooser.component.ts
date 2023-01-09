import { Component, OnInit } from '@angular/core';
import { COMMON_VALS, DATE_VALS, NUMBER_VALS, STRINGTYPE_VALS, TYPE_VALS } from 'src/app/constants/validators';
import { AppMessageService } from 'src/app/services/app-message.service';
import { MessageItem } from 'src/app/constants/message-item';
import { MSGTYPE, RECIEVERS } from 'src/app/constants/datatypes';

@Component({
    selector: 'app-validator-chooser',
    templateUrl: './validator-chooser.component.html',
    styleUrls: ['./validator-chooser.component.scss'],
})
export class ValidatorChooserComponent implements OnInit {
    commonData = COMMON_VALS;
    typeVals = TYPE_VALS;
    numberVals = NUMBER_VALS;
    dateVals = DATE_VALS;
    stringTypeVals = STRINGTYPE_VALS;
    validatorList: string[] = [];
    
    displayedColumns: string[] = ['decorator'];
    valdationChoices: string[] = [];

    constructor(private readonly appMessageService: AppMessageService) {}

    ngOnInit(): void {}

    onMouseOver(e: any) {
        console.log('Got hover event: ' + e);
    }

    addItem(item: string) {
        this.validatorList.push(item.trim());
    }

    onApplyClick() {
        this.appMessageService.sendMessage(
            new MessageItem(
                RECIEVERS.ENTITY_CREATOR,
                MSGTYPE.EVENT_VALIDATOR_UPDATE,
                this.validatorList
            )
        )
    }

   
}
