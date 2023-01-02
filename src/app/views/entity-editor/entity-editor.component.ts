import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EntityInfo } from 'src/app/constants/datatypes';

@Component({
    selector: 'app-entity-editor',
    templateUrl: './entity-editor.component.html',
    styleUrls: ['./entity-editor.component.scss']
})
export class EntityEditorComponent implements OnInit {
    entityItem: any;
    inputErrorforName = true;

    dataForm = this.formBuilder.group({
        dataClassName: [''],
    });

    entityForm = this.formBuilder.group({
        dataClassName: ['',],
        entityName: [''],
        entityDataType: [''],
        entityNullable: ['']
    });
    constructor(private readonly formBuilder: FormBuilder,
        private readonly dialogRef: MatDialogRef<EntityEditorComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit(): void {
        this.entityForm.get('entityName')?.setValue(this.data.entityName);
        this.entityForm.get('entityDataType')?.setValue(this.data.entityDataType);
        this.entityForm.get('entityNullable')?.setValue(this.data.entityNullable);
    }

    onUpdateClick() {
        this.dialogRef.close({
            entityName: this.entityForm.get('entityName')?.value,
            entityDataType: this.entityForm.get('entityDataType')?.value,
            entityNullable: this.entityForm.get('entityNullable')?.value
        });
    }

    onCancelClick() {
        this.dialogRef.close();
    }

}
