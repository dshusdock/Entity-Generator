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
        tmpltVals.name = this.entityInfoSvc.entityClassName;
        tmpltVals.lowercaseName = tmpltVals.name.toLocaleLowerCase();

        if (this.appInfoSvc.abstractRepositorySupport) {
            this.bitMask = this.bitMask | 4;
        }
        
        if (this.appInfoSvc.graphQLSupport) {
            this.bitMask = this.bitMask | 2;
        }

        if (this.appInfoSvc.mongoDBSupport) {
            this.bitMask = this.bitMask | 1
        }

        console.log("bitmask = " + this.bitMask);

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
    import { ${tmpltVals.name} } from './entities/${tmpltVals.lowercaseName}.model';    
    `,
        mongoose: `import { MongooseModule } from '@nestjs/mongoose';
    import { ${tmpltVals.name}Schema } from './entities/${tmpltVals.lowercaseName}.schema';
    import { ${tmpltVals.name}Repository } from './${tmpltVals.lowercaseName}.repository';
    `,
        graphql: `import { ${tmpltVals.name}Resolver } from './${tmpltVals.lowercaseName}.resolver';
    `,
        abstractRepo: ``
    }

    finalStr = HEADER.base;

    // Header Section
    if (bitMask&1) {finalStr = finalStr + HEADER.mongoose;}
    if (bitMask&2) {finalStr = finalStr + HEADER.graphql;}
    if (bitMask&4) {finalStr = finalStr + HEADER.abstractRepo;}
    
    return finalStr;
}


