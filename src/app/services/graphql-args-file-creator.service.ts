import { Injectable } from '@angular/core';
import { EntityInfo } from '../constants/datatypes';
import { EntityInfoService } from './entity-info.service';

@Injectable({
    providedIn: 'root'
})
export class GraphqlArgsFileCreatorService {
    caValidatorImportList: string[] = [];

    constructor(private readonly entityInfoSvc: EntityInfoService) { }

    generateFile(): Blob {
        let body: string = ``;
        let nullableVal = "true";

        let list: EntityInfo[] = this.entityInfoSvc.getEntityListArray();
        body = body + schema_import_header(this.entityInfoSvc.getValidatorImportStr());
        body = body + schema_class_header(this.entityInfoSvc.entityClassName);

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
}

function schema_class_header(schemaClassName: string) {
    return `@ArgsType()
export class Create${schemaClassName}Input {
      
    `;

}

function schema_import_header(importStr: string) {
    let str1 = "import { ArgsType, Int, Field } from '@nestjs/graphql';\n";
    return str1 + `import { ${importStr} } from 'class-validator';\n\n`
    
}
