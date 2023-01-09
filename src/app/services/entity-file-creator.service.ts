import { Injectable } from '@angular/core';
import { EntityInfoService } from './entity-info.service';

@Injectable({
    providedIn: 'root'
})
export class EntityFileCreatorService {
    entityClassName = "";
    FIELD_STR_TYPE = "@Field({ nullable: true , description: '' })";
    // FIELD_NBR_TYPE = `@Field(() => Int, { nullable: ${nullableVal} , description: '' })`;
    FIELD_BOOL_TYPE = "@Field({ nullable: true , description: '' })";

    constructor(private readonly entityInfoSvc: EntityInfoService) { }

    generateFile(): Blob {
        let body: string = ``;
        this.entityClassName = "BoPbiReport";
        let nullableVal = "true";

        let list = this.entityInfoSvc.getEntityListArray();

        body = body + schema_header(this.entityClassName);
        list.forEach((el) => {
            if (el.entityDataType === "number") {
                body = body + numberType(el.entityNullable? "true": "false");
            } else if (el.entityDataType === "string") {
                body = body + stringOrBoolType(el.entityNullable? "true": "false");
            } else {
                body = body + this.FIELD_BOOL_TYPE;
            }

            body = body + `
    ${el.entityName}: ${el.entityDataType};
    
    `;
        });

        let fileContent = body + `
  }`;

        const file = new Blob([fileContent], { type: "text/plain" });
        return file;
    }
}


function schema_header(schemaClassName: string) {
    return `import { ObjectType, Field, Int } from '@nestjs/graphql';

  @ObjectType()
  export class ${schemaClassName} {
    
    `;

}

function numberType(nullableVal: string) {
    return `@Field(() => Int, { nullable: ${nullableVal} , description: '' })`;
}

function stringOrBoolType(nullableVal: string) {
    return `@Field(() => Int, { nullable: ${nullableVal} , description: '' })`;
}