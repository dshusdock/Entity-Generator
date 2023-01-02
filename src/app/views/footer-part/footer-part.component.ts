import { Component, OnInit } from '@angular/core';
import { EntityFileCreatorService } from 'src/app/services/entity-file-creator.service';
// import { SchemaFileCreatorService } from 'src/app/services/schema-file-creator.service';
import { FormBuilder } from '@angular/forms';
import { SchemaFileCreatorService } from 'src/app/services/schema-file-creator.service';
import { GraphqlInputFileCreatorService } from 'src/app/services/graphql-input-file-creator.service';


@Component({
    selector: 'app-footer-part',
    templateUrl: './footer-part.component.html',
    styleUrls: ['./footer-part.component.scss']
})
export class FooterPartComponent implements OnInit {


    fileForm = this.formBuilder.group({
        fileChoice: ['',],
    });


    constructor(private readonly entityFileCreatorSvc: EntityFileCreatorService,
                private readonly schemaFileCreatorService: SchemaFileCreatorService,
                private readonly graphqlInputFileCreatorService: GraphqlInputFileCreatorService,
                public readonly formBuilder: FormBuilder) { }

    ngOnInit(): void {
    }

    onGenerateClick() {
        let fileChoice = this.fileForm.get('fileChoice')?.value;
        let file;
        const link = document.createElement("a");

        switch (fileChoice) {
            case "entity.ts":
                file = this.entityFileCreatorSvc.generateFile();
                link.href = URL.createObjectURL(file);
                link.download = "entityfile.ts";
                break;
            case "schema.ts":
                file = this.schemaFileCreatorService.generateFile();
                link.href = URL.createObjectURL(file);
                link.download = "schemafile.ts";
                break;
            case "input.ts":
                file = this.graphqlInputFileCreatorService.generateFile();
                link.href = URL.createObjectURL(file);
                link.download = "input.ts";
                break;
                
        };

        
        link.click();
        link.remove();
    }

}
