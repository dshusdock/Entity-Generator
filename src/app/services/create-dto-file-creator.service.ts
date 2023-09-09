import { Injectable } from '@angular/core';
import { EntityInfo } from '../constants/datatypes';
import { EntityInfoService } from './entity-info.service';

@Injectable({
    providedIn: 'root'
})
export class CreateDtoFileCreatorService {
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
            body += el.entityValidators.forEach((val) => {
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
    return `
export class Create${schemaClassName}DTO {
      
    `;

}

function schema_import_header(importStr: string) {
    return `import { ${importStr} } from 'class-validator';\n\n`
    
}
