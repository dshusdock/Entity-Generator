import { Injectable } from '@angular/core';
import { EntityInfoService } from './entity-info.service';
import { AppInfoService } from './app-info.service';

const tmpltVals = {
    name: '',
    lowercaseName: ''
}

@Injectable({
    providedIn: 'root'
})
export class ModuleFileCreatorService {
    bitMask=0;
    
    constructor(private readonly entityInfoSvc: EntityInfoService,
                private readonly appInfoSvc: AppInfoService) { }

    generateFile(): Blob {
        this.bitMask=0;
        tmpltVals.name = this.entityInfoSvc.entityClassName;
        tmpltVals.lowercaseName = tmpltVals.name.toLocaleLowerCase();

        if (this.appInfoSvc.abstractRepositorySupport) {
            this.bitMask = this.bitMask | 4;
        }
        
        if (this.appInfoSvc.graphQLSupport) {
            this.bitMask = this.bitMask | 2;
        }

        if (this.appInfoSvc.mongoDBSupport) {
            this.bitMask = this.bitMask | 1;
        }

        const file = new Blob([moduleTmplt2(this.bitMask)], { type: "text/plain" });
        return file;

    }

}

function moduleTmplt() {
    return `    import { Module } from '@nestjs/common';
    import { ${tmpltVals.name}Service } from './${tmpltVals.lowercaseName}.service';
    import { ${tmpltVals.name}Controller } from './${tmpltVals.lowercaseName}.controller';

    import { ${tmpltVals.name} } from './entities/${tmpltVals.lowercaseName}.model';
    import { MongooseModule } from '@nestjs/mongoose';
    import { ${tmpltVals.name}Schema } from './entities/${tmpltVals.lowercaseName}.schema';
    import { ${tmpltVals.name}Repository } from './${tmpltVals.lowercaseName}.repository';
    import { ${tmpltVals.name}Resolver } from './${tmpltVals.lowercaseName}.resolver';
    
    
    @Module({
      imports: [
        MongooseModule.forFeature([{ name: ${tmpltVals.name}.name, schema: ${tmpltVals.name}Schema }]),
      ],
      providers: [${tmpltVals.name}Resolver, ${tmpltVals.name}Service, ${tmpltVals.name}Repository],
      exports: [${tmpltVals.name}Service],
    })
    export class ${tmpltVals.name}Module {}
    `;
}

function moduleTmplt2(bitMask: number) {
    let finalStr = "";

    const HEADER = {
        base: `    import { Module } from '@nestjs/common';
    import { ${tmpltVals.name}Service } from './${tmpltVals.lowercaseName}.service';
    import { ${tmpltVals.name}Controller } from './${tmpltVals.lowercaseName}.controller'; 
    `,
        mongoose: `import { MongooseModule } from '@nestjs/mongoose';
    import { ${tmpltVals.name}Schema, ${tmpltVals.name}Document } from './entities/${tmpltVals.lowercaseName}.schema';
    `,
        graphql: `import { ${tmpltVals.name}Resolver } from './${tmpltVals.lowercaseName}.resolver';
    `,
        abstractRepo: `import { ${tmpltVals.name}Repository } from './${tmpltVals.lowercaseName}.repository';`
    }

    const MODULE_IMPORTS = {
        imports: `

    @Module({
        imports: [`,
        mongoose: `MongooseModule.forFeature([
            { 
                name: ${tmpltVals.name}.name, 
                schema: ${tmpltVals.name}Schema 
            }
        ]),`,
        graphql: ``,
        abstractRepo: ``
    }

    const MODULE_CONTROLLER = {
        abstractRepo: `${tmpltVals.lowercaseName}.repository`
    }

    finalStr = HEADER.base;

    // Header Section
    if (bitMask&1) {
        finalStr = finalStr + HEADER.mongoose;
    }
    if (bitMask&2) {
        finalStr = finalStr + HEADER.graphql;
    }
    if (bitMask&4) {
        finalStr = finalStr + HEADER.abstractRepo;
    }

    finalStr = finalStr + MODULE_IMPORTS.imports;

    // Module Section - Imports
    if (bitMask&1) {
        finalStr = finalStr + MODULE_IMPORTS.mongoose;
    }
    if (bitMask&2) {
        finalStr = finalStr + MODULE_IMPORTS.graphql;
    }
    if (bitMask&4) {
        finalStr = finalStr + MODULE_IMPORTS.abstractRepo;
    }

    finalStr = finalStr + `],
        controllers: [${tmpltVals.name}Controller,`;

    // Module Section - Controllers
    if (bitMask&1) {
        // finalStr = finalStr + MODULE_IMPORTS.mongoose;
    }
    if (bitMask&2) {
        // finalStr = finalStr + MODULE_IMPORTS.graphql;
    }
    if (bitMask&4) {
        //finalStr = finalStr + MODULE_CONTROLLER.abstractRepo;
    }

    // Module Section - Providers
    finalStr = finalStr + `],
        providers: [${tmpltVals.name}Service, `;
        
    if (bitMask&1) {
        // finalStr = finalStr + MODULE_IMPORTS.mongoose;
    }
    if (bitMask&2) {
        // finalStr = finalStr + MODULE_IMPORTS.graphql;
    }
    if (bitMask&4) {
        finalStr = finalStr + `${tmpltVals.name}Repository`;
    }

    // Module Section - Exports
    finalStr = finalStr + `],
        exports: [${tmpltVals.name}Service, `;
    if (bitMask&1) {
        // finalStr = finalStr + MODULE_IMPORTS.mongoose;
    }
    if (bitMask&2) {
        // finalStr = finalStr + MODULE_IMPORTS.graphql;
    }
    if (bitMask&4) {
            finalStr = finalStr + `${tmpltVals.name}Repository`;
    }

    finalStr = finalStr + `]
    })
    export class ${tmpltVals.name}Module`;

    return finalStr;
}


