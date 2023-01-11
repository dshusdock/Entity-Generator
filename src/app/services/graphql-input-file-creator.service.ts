import { Injectable } from '@angular/core';
import { EntityInfo } from '../constants/datatypes';
import { EntityInfoService } from './entity-info.service';

@Injectable({
    providedIn: 'root'
})
export class GraphqlInputFileCreatorService {
    entityClassName = "";

    constructor(private readonly entityInfoSvc: EntityInfoService) { }

    generateFile(): Blob {
        let body: string = ``;
        this.entityClassName = "BoPbiReport";
        let nullableVal = "true";
        

        let list: EntityInfo[] = this.entityInfoSvc.getEntityListArray();
        body = body + schema_header(this.entityClassName);

        // Loop Start
        list.forEach((el) => {
            body += `@Field()\n`
            el.entityValidators.forEach((val) => {
            body += `    ${val}\n`;
            });

            body = body + `    ${el.entityName}: ${el.entityDataType};\n\n    `;
        });
        // Loop End

        let fileContent = body + `\n}`;

        const file = new Blob([fileContent], { type: "text/plain" });
        return file;
    }

    buildValidatorList(list: any) {

    }
}


function schema_header(schemaClassName: string) {
    return `import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber } from 'class-validator';
    
@InputType()
export class Create${schemaClassName}Input {
      
    `;

}
