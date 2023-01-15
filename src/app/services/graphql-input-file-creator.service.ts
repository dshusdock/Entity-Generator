import { Injectable } from '@angular/core';
import { EntityInfo } from '../constants/datatypes';
import { EntityInfoService } from './entity-info.service';

@Injectable({
    providedIn: 'root'
})
export class GraphqlInputFileCreatorService {
    entityClassName = "";
    caValidatorImportList: string[] = [];

    constructor(private readonly entityInfoSvc: EntityInfoService) { }

    generateFile(): Blob {
        let body: string = ``;
        this.entityClassName = "BoPbiReport";
        let nullableVal = "true";
        

        let list: EntityInfo[] = this.entityInfoSvc.getEntityListArray();
        this.buildValidatorImportList(list);
        //schema_class_header(this.caValidatorImportList);
        body = body + schema_import_header(this.caValidatorImportList);
        body = body + schema_class_header(this.entityClassName);

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

    buildValidatorImportList(list: any) {
        list.forEach((element: any) => {
            console.log(`Working on Element Array: ${element.entityValidators}`);
            let valList: string[] = element.entityValidators;
            valList.forEach((el) => {
                console.log(`Working on Element: ${el}`);
                
                let rx = /^@(\w+)\(/g;
                let arr = rx.exec(el);
            
                if (arr) {
                    this.caValidatorImportList.push(arr[1]);
                    console.log("Adding element [" + arr[1] + "]to array");
                }
                
            });
        });
    }
}


function schema_class_header(schemaClassName: string) {
    return `@InputType()
export class Create${schemaClassName}Input {
      
    `;

}

function schema_import_header(list: string[]) {
    let str1 = "`import { InputType, Int, Field } from '@nestjs/graphql';\n";
    let str2 = "";

    list.forEach((el) => {
        str2 += el.trim() + ","
    });

    console.log("str2 = " + str2);

    return str1 + `import { ${str2} } from 'class-validator';\n`
    
}
