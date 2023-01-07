import { Component, OnInit } from '@angular/core';
import { COMMON_VALS, DATE_VALS, NUMBER_VALS, STRINGTYPE_VALS, TYPE_VALS } from 'src/app/constants/validators';

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
    
    displayedColumns: string[] = ['decorator'];
    valdationChoices: string[] = [];

    constructor() {}

    ngOnInit(): void {}

    onMouseOver(e: any) {
        console.log('Got hover event: ' + e);
    }

   
}
