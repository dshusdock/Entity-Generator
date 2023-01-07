import { AfterViewInit, Component, Input, OnChanges, OnInit, QueryList, SimpleChanges, ViewChild, ViewChildren } from '@angular/core';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { EntityInfo } from 'src/app/constants/datatypes';
import { EntityInfoService } from 'src/app/services/entity-info.service';
import { EntityEditorComponent } from '../entity-editor/entity-editor.component';


@Component({
    selector: 'app-entity-display',
    templateUrl: './entity-display.component.html',
    styleUrls: ['./entity-display.component.scss']
})
export class EntityDisplayComponent implements OnInit, OnChanges, AfterViewInit {
    @Input() entityValue: any = {};
    @ViewChild(MatTable) table!: MatTable<any>;
    @ViewChildren("checkboxes") checkboxes!: QueryList<MatCheckbox>;
    @ViewChild("selectAllCB") selectAll!: MatCheckbox;
    entityList: EntityInfo[] = [];
    displayedColumns: string[] = ['entityName', 'entityDataType', 'entityNullable', 'validators'];
    // dataSource: any = [{ entityName: "test", entityDataType: "string" }];
    itemChecked = true;
    clearAllCB = false;
    isEditDisabled = false;
    entityListCheckedCount = 0;

    constructor(private readonly entityInfoSvc: EntityInfoService,
                private readonly dialog: MatDialog) { 

    }

    ngOnInit(): void {

    }

    ngOnChanges() {
        if (!this.entityValue) { return }
       
        let entity: EntityInfo = {
            entityName: this.entityValue.entityName,
            entityDataType: this.entityValue.entityDataType,
            entityNullable: this.entityValue.entityNullable,
            checked: false
        }

        this.entityList.push(entity);
        console.log("Adding entity: " + JSON.stringify(entity) + ":" + this.entityList.length);
        if (this.table) {
            this.table.renderRows();
        }

        this.entityInfoSvc.updateEntityInfo(this.entityList);
        
    }

    ngAfterViewInit() {
    }

    setAll(val: any) {

    }

    onSelectIndividual(entityName: string) {

        let index = this.entityList.findIndex(el => el.entityName === entityName);
        if (!this.entityList[index].checked) {
            this.entityList[index].checked = true;
            if ((++this.entityListCheckedCount) >= 2) {
                console.log("entityListCheckedCount: " + this.entityListCheckedCount);
                this.isEditDisabled = true;
            }
        } else {
            console.log("In the deselect logic");
            this.entityList[index].checked = false;
            if (--this.entityListCheckedCount < 2) {
                this.isEditDisabled = false;
            }
        }
    }

    onSelectAll() {
        this.clearAllCB = !this.clearAllCB;
        if ((this.clearAllCB) && (this.entityList.length > 1)) {
            this.isEditDisabled = true;
        } else {
            this.isEditDisabled = false;
            this.entityListCheckedCount = 0;
        }
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
        for (var i = this.entityList.length - 1; i >= 0; i--) {
            if (this.entityList[i].checked) {
                this.entityList.splice(i, 1);
                this.entityListCheckedCount--;
            }
        }
           
        if (this.clearAllCB) {
            this.selectAll.toggle();
            this.clearAllCB = false;
        }

        this.isEditDisabled = false;

        if (this.table) {
            this.table.renderRows();
        }
    }

    onEdit() {
        let index = this.entityList.findIndex(el => el.checked);
            console.log("Got for editGuy: " + JSON.stringify(this.entityList[index]));
        
        const dialogRef = this.dialog.open(EntityEditorComponent, {
            width: "450px",
            data: this.entityList[index]
        });

        dialogRef.afterClosed().subscribe((result) => {
            console.log("The dialog was closed:" + JSON.stringify(result ) + ":" + index);
            this.entityList[index].entityName = result.entityName;
            this.entityList[index].entityDataType = result.entityDataType;
            this.entityList[index].entityNullable = result.entityNullable;
            
        
        });
    }

    check4check() {
        this.entityList.forEach((el) => {
            if (el.checked) {
                return true;
            } else {
                return false;
            }
        });
    }



}
