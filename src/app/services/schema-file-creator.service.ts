import { Injectable } from '@angular/core';
import * as schema from "../templates/schema";
import { EntityInfoService } from './entity-info.service';

@Injectable({
    providedIn: 'root'
})
export class SchemaFileCreatorService {
    schemaClassName = "";

    constructor(private readonly entityInfoSvc: EntityInfoService) {
    }

    generateFile(): Blob {
        let body: string = `    `;
        this.schemaClassName = "TestSchema";

        let list = this.entityInfoSvc.getEntityListArray();

        list.forEach((el) => {
            body = body + `@Prop()
    ${el.entityName}: ${el.entityDataType};
    
    `;
        });

        let fileContent = schema_header(this.schemaClassName) + body + schema_footer(this.schemaClassName);

        const file = new Blob([fileContent], { type: "text/plain" });
        return file;
    }
}

function schema_header(schemaClassName: string) {
    return `import { AbstractDocument } from '@app/database';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
  
@Schema({ versionKey: false })
export class ${schemaClassName}Document extends AbstractDocument {
  
`;

}

function schema_footer(schemaClassName: string) {
    return `
}
export const ${schemaClassName}Schema = SchemaFactory.createForClass(${schemaClassName}Document);
`;
}

