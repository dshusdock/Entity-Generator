import { Injectable } from '@angular/core';
import { EntityInfoService } from './entity-info.service';

@Injectable({
    providedIn: 'root'
})
export class EntityFileCreatorService {
    entityClassName = "";
    FIELD_STR_TYPE = "@Field({ nullable: true , description: '' })";
    FIELD_NBR_TYPE = "@Field(() => Int, { nullable: true , description: '' })"
    FIELD_BOOL_TYPE = "@Field({ nullable: true , description: '' })";

    constructor(private readonly entityInfoSvc: EntityInfoService) { }

    generateFile(): Blob {
        let body: string = ``;
        this.entityClassName = "BoPbiReport";

        let list = this.entityInfoSvc.getEntityList();

        body = body + schema_header(this.entityClassName);
        list.forEach((el) => {
            if (el.entityDataType === "number") {
                body = body + this.FIELD_NBR_TYPE;
            } else if (el.entityDataType === "string") {
                body = body + this.FIELD_STR_TYPE;
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
