import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-validator-table',
  templateUrl: './validator-table.component.html',
  styleUrls: ['./validator-table.component.scss']
})
export class ValidatorTableComponent implements OnInit {
  @Input() tableData: any[] = [];
  displayedColumns: string[] = ['decorator'];
  desc = "";
  theIndex = 0;

  constructor() { }

  ngOnInit(): void {
  }

  onMouseOver(e: any) {
    console.log('Got hover event: ' + e);
    this.desc = this.tableData[e].desc;

  //   let index = this.tableData.findIndex(el => {
  //     //console.log("el = " + JSON.stringify(el));
  //     el.val.trim().lastIndexOf(e);
  //     console.log("-->" + el.val.trim());
  //   })
  //   if (index>0) {
  //     console.log("index= " + index);
  //     this.desc = this.tableData[index].desc ;
  //   } else {
  //     this.desc = "Value not found";
  //   }
  }

}
