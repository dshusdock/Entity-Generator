import { Component, OnInit } from '@angular/core';
import { EntityFileCreatorService } from 'src/app/services/entity-file-creator.service';
// import { SchemaFileCreatorService } from 'src/app/services/schema-file-creator.service';

@Component({
  selector: 'app-footer-part',
  templateUrl: './footer-part.component.html',
  styleUrls: ['./footer-part.component.scss']
})
export class FooterPartComponent implements OnInit {

  constructor(private readonly entityFileCreatorSvc: EntityFileCreatorService) { }

  ngOnInit(): void {
  }

  onGenerateClick() {
    let file = this.entityFileCreatorSvc.generateFile();
    const link = document.createElement("a");
    link.href = URL.createObjectURL(file);
    link.download = "schemafile.ts";
    link.click();
    link.remove();
  }

}
