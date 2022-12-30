import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-entity-display',
  templateUrl: './entity-display.component.html',
  styleUrls: ['./entity-display.component.scss']
})
export class EntityDisplayComponent implements OnInit, OnChanges {
  @Input() entityValue: any = {};
  @ViewChild(MatTable) table!: MatTable<any>;
  
  entityList: any[] = [];
  displayedColumns: string[] = ['entityName', 'entityDataType'];
  dataSource: any = [{ entityName: "test", entityDataType: "string" }];


  constructor() { }

  ngOnInit(): void {
    //this.dataSource = new MatTableDataSource(this.entityList);
  }

  ngOnChanges() {

    console.log("Detected change: " + JSON.stringify(this.entityValue));
    if (!this.entityValue) { return }
    this.entityList.push(this.entityValue);
    if (this.table) {
      this.table.renderRows();
    }
    
    // this.dataSource = this.entityList;
    // this.dataSource = new MatTableDataSource(this.entityList);

    /* for (const propName in changes) {
      const chng = changes[propName];
      const cur  = JSON.stringify(chng.currentValue);
      // const prev = JSON.stringify(chng.previousValue);
      console.log(`${propName}: currentValue = ${cur}`);
      // console.log(`${propName}: currentValue = ${cur}, previousValue = ${prev}`);
      this.entityList.push(cur);
      console.log("entityList: " + this.entityList.length);

    } */
  }

}
