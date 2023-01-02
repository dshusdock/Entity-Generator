import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-testthis',
  templateUrl: './testthis.component.html',
  styleUrls: ['./testthis.component.scss']
})
export class TestthisComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  func1(event: any) {
    console.log("clicked" + JSON.stringify(event));
  }

  someFunc2() {

  }

}
