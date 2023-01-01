
export  const schemaClassName = "";

export let schema_header = `
import { AbstractDocument } from '@app/database';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false })
export class ${schemaClassName}Document extends AbstractDocument {

`;

export let schema_footer = `
}
export const ${schemaClassName}Schema = SchemaFactory.createForClass(B${schemaClassName}Document);
`;
