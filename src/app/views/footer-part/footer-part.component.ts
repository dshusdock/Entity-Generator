import { Component, OnInit } from '@angular/core';
import { EntityFileCreatorService } from 'src/app/services/entity-file-creator.service';
// import { SchemaFileCreatorService } from 'src/app/services/schema-file-creator.service';
import { FormBuilder } from '@angular/forms';
import { SchemaFileCreatorService } from 'src/app/services/schema-file-creator.service';
import { GraphqlInputFileCreatorService } from 'src/app/services/graphql-input-file-creator.service';
import { EntityInfoService } from 'src/app/services/entity-info.service';
import { GraphqlArgsFileCreatorService } from 'src/app/services/graphql-args-file-creator.service';


@Component({
    selector: 'app-footer-part',
    templateUrl: './footer-part.component.html',
    styleUrls: ['./footer-part.component.scss']
})
export class FooterPartComponent implements OnInit {


    fileForm = this.formBuilder.group({
        fileChoice: ['',],
    });


    constructor(
        private readonly entityFileCreatorSvc: EntityFileCreatorService,
        private readonly schemaFileCreatorService: SchemaFileCreatorService,
        private readonly graphqlInputFileCreatorService: GraphqlInputFileCreatorService,
        private readonly graphqlArgsFileCreatorService: GraphqlArgsFileCreatorService,
        public readonly formBuilder: FormBuilder,
        public readonly entityInfoService: EntityInfoService
    ) { }

    ngOnInit(): void {
    }

    onGenerateClick() {
        let fileChoice = this.fileForm.get('fileChoice')?.value;
        let file;
        const link = document.createElement("a");
        let className = this.entityInfoService.entityClassName;

        switch (fileChoice) {
            case "entity.ts":
                file = this.entityFileCreatorSvc.generateFile();
                link.href = URL.createObjectURL(file);
                link.download = `${className.toLowerCase()}.entityfile.ts`;
                break;
            case "schema.ts":
                file = this.schemaFileCreatorService.generateFile();
                link.href = URL.createObjectURL(file);
                link.download = `${className.toLowerCase()}.schemafile.ts`;
                break;
            case "input.ts":
                file = this.graphqlInputFileCreatorService.generateFile();
                link.href = URL.createObjectURL(file);
                link.download = `create.${className.toLowerCase()}.input.ts`;
                break;
            case "args.ts":
                file = this.graphqlArgsFileCreatorService.generateFile();
                link.href = URL.createObjectURL(file);
                link.download = `create.${className.toLowerCase()}.args.ts`;
                break;

        };


        link.click();
        link.remove();
    }

    onSelectionChange(event: any) {
        console.log("Got change event: " + event);
    }

}
