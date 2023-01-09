import { Injectable } from '@angular/core';
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
        

        let list: any[] = this.entityInfoSvc.getEntityListArray();

        //console.log("EntityList: " + JSON.stringify(list));
        //let valList = buildValidatorList(list);

        body = body + schema_header(this.entityClassName);

        // Loop Start
        list.forEach((el) => {
            if (el.entityDataType === "number") {
                body = body + numberType();
            } else {
                body = body + stringOrBoolType();
            }

            body = body + `
        ${el.entityName}: ${el.entityDataType};
    
    `;
        });
        // Loop End

        let fileContent = body + `
  }`;

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

function numberType() {
    return `    @Field()
        @IsNumber()`;
}

function stringOrBoolType() {
    return `    @Field()
        @IsNotEmpty()`;
}