import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-validator-table',
    templateUrl: './validator-table.component.html',
    styleUrls: ['./validator-table.component.scss']
})
export class ValidatorTableComponent implements OnInit {
    @Input() tableData: any[] = [];
    @Output() newItemEvent = new EventEmitter<string>();
    displayedColumns: string[] = ['decorator'];
    desc = "";
    theIndex = 0;

    constructor() { }

    ngOnInit(): void {
    }

    onMouseOver(index: any) {
        // console.log('Got hover event: ' + e);
        this.desc = this.tableData[index].desc;
    }

    onClick(index: number) {
        console.log("In onClick - " + index);
        this.newItemEvent.emit(this.tableData[index].val);
        
    }



}
