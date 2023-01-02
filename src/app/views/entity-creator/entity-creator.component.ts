import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { EntityInfo } from 'src/app/constants/datatypes';
import { AppMessageService } from 'src/app/services/app-message.service';
import { Validators } from '@angular/forms';

@Component({
    selector: 'app-entity-creator',
    templateUrl: './entity-creator.component.html',
    styleUrls: ['./entity-creator.component.scss']
})
export class EntityCreatorComponent implements OnInit {
    entityItem: any;
    inputErrorforName =  true;

    dataForm = this.formBuilder.group({
        dataClassName: [''],
    });

    entityForm = this.formBuilder.group({
        dataClassName: ['', Validators.required],
        entityName: [''],
        entityDataType: [''],
        entityNullable: ['']
    });

    constructor(private readonly formBuilder: FormBuilder,
                private readonly messageService: AppMessageService) { }

    ngOnInit(): void {
        this.entityForm.valueChanges.subscribe((val) => {
            
        });
        this.entityForm.get('entityDataType')?.setValue('string');
    }

    onAddClick() {
        let data: any = {};
        
        data.entityName = this.entityForm.get('entityName')?.value;
        if (!data.entityName) { return };
        data.entityDataType = this.entityForm.get('entityDataType')?.value;
        data.entityNullable = this.entityForm.get('entityNullable')?.value;
        if (!data.entityNullable) {
            data.entityNullable = false;
        }

        this.entityItem = data;

        console.log("EntityInfo: " + JSON.stringify(data));

        this.messageService.sendMessage(data);
        this.onClearClick();
    }

    onClearClick() {
        this.entityForm.get('entityName')?.setValue('');
        this.entityForm.get('entityDataType')?.setValue('string');
        this.entityForm.get('entityNullable')?.setValue('');
    }

}
