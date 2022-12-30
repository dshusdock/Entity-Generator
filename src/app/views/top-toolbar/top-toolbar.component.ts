import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import * as fs from 'fs';

@Component({
    selector: 'app-top-toolbar',
    templateUrl: './top-toolbar.component.html',
    styleUrls: ['./top-toolbar.component.scss']
})
export class TopToolbarComponent implements OnInit {

    constructor(private router: Router) { }

    ngOnInit(): void {
    }

    onCreateEntity() {
        this.router.navigate(['/app-entity-creator']);
    }

    public saveFileName = "test";
    public saveFileContent = '{ "name": "test"}';
    public saveFileExtension = 'json';


    public onSaveFile(): void {
        let fileName = this.saveFileName + '.' + this.saveFileExtension;
        let fileContent = this.saveFileContent;
        // let fileContent = JSON.stringify( {name: "test name"} );

        const file = new Blob([fileContent], { type: "text/plain" });

        const link = document.createElement("a");
        link.href = URL.createObjectURL(file);
        link.download = fileName;
        link.click();
        link.remove();

    }

    public onResetList() {

    }

}
