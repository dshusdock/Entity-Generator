import { Component, Input, OnChanges, OnInit, QueryList, SimpleChanges, ViewChild, ViewChildren } from '@angular/core';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatTable } from '@angular/material/table';


type EntityInfo = {
    entityName: string;
    entityDataType: string;
    checked: boolean
}

@Component({
    selector: 'app-entity-display',
    templateUrl: './entity-display.component.html',
    styleUrls: ['./entity-display.component.scss']
})
export class EntityDisplayComponent implements OnInit, OnChanges {
    @Input() entityValue: any = {};
    @ViewChild(MatTable) table!: MatTable<any>;
    @ViewChildren("checkboxes") checkboxes!: QueryList<MatCheckbox>;
    @ViewChild("selectAllCB") selectAll!: MatCheckbox;
    entityList: EntityInfo[] = [];
    displayedColumns: string[] = ['entityName', 'entityDataType'];
    dataSource: any = [{ entityName: "test", entityDataType: "string" }];
    itemChecked = true;
    clearAllCB = false;


    constructor() { }

    ngOnInit(): void {

    }

    ngOnChanges() {
        if (!this.entityValue) { return }
        let entity: EntityInfo = {
            entityName: this.entityValue.entityName,
            entityDataType: this.entityValue.entityDataType,
            checked: false
        }


        this.entityList.push(entity);
        console.log("Adding entity: " + JSON.stringify(entity) + ":" + this.entityList.length);
        if (this.table) {
            this.table.renderRows();
        }
    }

    setAll(val: any) {

    }

    onSelectAll() {
        this.clearAllCB = !this.clearAllCB;
        this.toggleCBs(this.clearAllCB);
        this.entityList.forEach((el: EntityInfo) => {
            el.checked = this.clearAllCB;
            console.log("Checking element name:" + el.entityName + ":" + el.checked);
        });
        
        
        // this.ams.sendMessage(new MessageItem(RECIEVERS.BROADCAST, MSGTYPE.EVENT_USER_CHOSEN, el.loginName ));
    }

    toggleCBs(state: boolean) {
        this.checkboxes.forEach((element: any) => {

            if (state !== element.checked) {
                element.toggle();
                console.log("Toggling this");
            }
        });
    }

    onDelete() {
        this.entityList.forEach((el, index) => {
            if (el.checked) {
                this.entityList.splice(index);
            }
        });

        if (this.clearAllCB) {
            this.selectAll.toggle();
            this.clearAllCB = false;
        }

        if (this.table) {
            this.table.renderRows();
        }
    }



}
