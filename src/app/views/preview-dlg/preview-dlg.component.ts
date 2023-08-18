import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-preview-dlg',
    templateUrl: './preview-dlg.component.html',
    styleUrls: ['./preview-dlg.component.scss'],
})
export class PreviewDlgComponent implements OnInit {
    dataForm = this.formBuilder.group({
        previewData: [''],
    });

    constructor(
        private readonly formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: Blob
    ) {}

    ngOnInit(): void {
        const reader = new FileReader();

        // This fires after the blob has been read/loaded.
        reader.addEventListener('loadend', (e) => {
            this.blobHandler(e);
            // if(e) {
            //     const text = e.target?.result;
            //     console.log(text);
            // }
           
        });

        reader.readAsText(this.data)
    }

    blobHandler(e: any) {
        if(e) {
            const text = e.target?.result;
            this.dataForm.get('previewData')?.setValue(text);
        }
    }
}
