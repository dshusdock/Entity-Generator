import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { EntityInfo, MSGTYPE, RECIEVERS } from 'src/app/constants/datatypes';
import { AppMessageService } from 'src/app/services/app-message.service';
import { Validators } from '@angular/forms';
import { ValidatorChooserComponent } from '../validator-chooser/validator-chooser.component';
import { MatDialog } from '@angular/material/dialog';
import { EntityInfoService } from 'src/app/services/entity-info.service';
import { MessageItem } from 'src/app/constants/message-item';
import { AppInfoService } from 'src/app/services/app-info.service';

@Component({
    selector: 'app-entity-creator',
    templateUrl: './entity-creator.component.html',
    styleUrls: ['./entity-creator.component.scss']
})
export class EntityCreatorComponent implements OnInit {
    caEntityItem: any;
    cbInputErrorforName = true;
    cbAddButtonDisable = true;

    dataForm = this.formBuilder.group({
        dataClassName: [''],
        abstractRepositorySupport: [''],
        mongoDBSupport: [''],
        graphQLSupport: ['']
    });

    entityForm = this.formBuilder.group({
        dataClassName: ['', Validators.required],
        entityName: [''],
        entityDataType: [''],
        entityNullable: [''],
        validators: ['']
    });

    dialogRight = "200px";
    validatorCheckbox = false;
    entityClassName = "";
    validators: string[] = [];

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly messageService: AppMessageService,
        private readonly dialog: MatDialog,
        private readonly entityInfoSvc: EntityInfoService,
        private readonly appInfoSvc: AppInfoService
    ) { }

    ngOnInit(): void {
        this.messageService.messageQueueListener().subscribe((msg: any) => {
            this.processIncomingMessages(msg);
        });

        // Set default
        this.entityForm.get('entityDataType')?.setValue('string');
        this.dataForm.get('abstractRepositorySupport')?.setValue('false');
        this.dataForm.get('mongoDBSupport')?.setValue('false');
        this.dataForm.get('graphQLSupport')?.setValue('false');
    }

    processIncomingMessages(msg: MessageItem<any>) {

        switch (msg.msgtype) {
            case MSGTYPE.EVENT_VALIDATOR_UPDATE: {
                this.handleValidatorUpdate(msg.payload);
                break;
            }
        }
    }

    onAddClick() {
        let data: any = {};

        data.entityName = this.entityForm.get('entityName')?.value;
        if (!data.entityName) { return };
        if (this.entityInfoSvc.check4Duplicate(data.entityName)) {
            alert("Duplicate Entity name");
            return;
        }

        data.entityDataType = this.entityForm.get('entityDataType')?.value;
        data.entityNullable = this.entityForm.get('entityNullable')?.value;
        

        if (!data.entityNullable) {
            data.entityNullable = false;
        }

        // validators
        data.entityValidators = this.validators;
        this.entityInfoSvc.entityList = data;

        // This updates the entity-display component
        this.caEntityItem = data;

        // this.messageService.sendMessage(data);
        this.onClearClick();
        if (!this.cbAddButtonDisable) {
            this.cbAddButtonDisable = true;
            this.validatorCheckbox = false;
        } 
    }

    onClearClick() {
        this.entityForm.get('entityName')?.setValue('');
        this.entityForm.get('entityDataType')?.setValue('string');
        this.entityForm.get('entityNullable')?.setValue('');
        this.entityForm.get('validators')?.setValue('');
        if (this.validatorCheckbox) {
            this.validatorCheckbox = false;
            this.validators = [];
            return;
        }
    }

    onValidatorClick() {

        if (this.validatorCheckbox) {
            this.validatorCheckbox = false;
            this.validators = [];
            return;
        }

        this.validatorCheckbox = true;

        const dialogRef = this.dialog.open(ValidatorChooserComponent, {
            width: "720px",
            height: "700px",
            data: {},
            position: { top: "50px", right: this.dialogRight },
            panelClass: 'custom-dialog-container'
        });

        dialogRef.afterClosed().subscribe((result) => {
            console.log("The dialog was closed:" + JSON.stringify(result));
        });
    }

    onUpdateClick() {
        let name = this.dataForm.get('dataClassName')?.value;
        if (name) {
            this.entityInfoSvc.entityClassName = name;
        }
    }

    onKeyUp(event: any) {
        let name = event;
        this.messageService.sendMessage(new MessageItem<any>(RECIEVERS.TOOLBAR,
                                        MSGTYPE.EVENT_UPDATE_TOOLBAR,
                                        name));
        this.entityInfoSvc.entityClassName = name;
    }

    handleValidatorUpdate(data: any) {
        console.log("In handleValidatorUpdate: " + JSON.stringify(data));
        this.validators = data;
    }

    onEntityNameKeyUp(event: any) {
        if (this.entityForm.get('entityName')?.value) {
            this.cbAddButtonDisable = false;
        } else {
            this.cbAddButtonDisable = true;
        }
    }

    inputChanged(element: HTMLElement) {
        console.log(element.getAttribute('formControlName')) // item_name 
    }

    onCBChange() {
        let val = this.dataForm.get('abstractRepositorySupport')?.value;
        
        if (val) {
            this.appInfoSvc.abstractRepositorySupport = true;
        } else {
            this.appInfoSvc.abstractRepositorySupport = false;
        }

        val = this.entityForm.get('mongoDBSupport')?.value;
        if (val === true) {
            this.appInfoSvc.mongoDBSupport = true;
        } else {
            this.appInfoSvc.mongoDBSupport = false;
        }

        val = this.entityForm.get('graphQLSupport')?.value;
        if (val === true) {
            this.appInfoSvc.graphQLSupport = true;
        } else {
            this.appInfoSvc.graphQLSupport = false;
        }
    }
}
