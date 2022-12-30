import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AppMessageService } from 'src/app/services/app-message.service';

@Component({
    selector: 'app-entity-creator',
    templateUrl: './entity-creator.component.html',
    styleUrls: ['./entity-creator.component.scss']
})
export class EntityCreatorComponent implements OnInit {
    entityItem = "This is a test";

    entityForm = this.formBuilder.group({
        entityName: [''],
        entityDataType: [''],
    });

    constructor(private readonly formBuilder: FormBuilder,
                private readonly messageService: AppMessageService) { }

    ngOnInit(): void {
        this.entityForm.valueChanges.subscribe((val) => {
            
        });
    }

    onAddClick() {
        let data: any = {};
        data.entityName = this.entityForm.get('entityName')?.value;
        data.entityDataType = this.entityForm.get('entityDataType')?.value;
        this.entityItem = data;

        this.messageService.sendMessage(data);
    }

}
