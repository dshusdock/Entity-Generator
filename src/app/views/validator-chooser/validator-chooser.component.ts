import { Component, OnInit } from '@angular/core';
import { COMMON_VALS } from 'src/app/constants/validators';

@Component({
  selector: 'app-validator-chooser',
  templateUrl: './validator-chooser.component.html',
  styleUrls: ['./validator-chooser.component.scss']
})
export class ValidatorChooserComponent implements OnInit {
  commonData = COMMON_VALS;
  displayedColumns: string[] = ['decorator'];

  constructor() { }

  ngOnInit(): void {
  }

  onMouseOver(e: any) {
    console.log("Got hover event: " + e);
  }

  onMouseDown(event: any) {
    console.log(JSON.stringify(event));
  }

}
