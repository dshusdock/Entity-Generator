import { Injectable } from '@angular/core';
import { EntityInfoService } from './entity-info.service';

const tmpltVals = {
    name: '',
    lowercaseName: ''
}

@Injectable({
    providedIn: 'root'
})
export class ModuleFileCreatorService {
    

    constructor(private readonly entityInfoSvc: EntityInfoService) { }

    generateFile(): Blob {
        tmpltVals.name = this.entityInfoSvc.entityClassName;
        tmpltVals.lowercaseName = tmpltVals.name.toLocaleLowerCase();
        const file = new Blob([moduleTmplt2(1)], { type: "text/plain" });
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
    let baseHeaderStr = `    import { Module } from '@nestjs/common';
    import { ${tmpltVals.name}Service } from './${tmpltVals.lowercaseName}.service';
    import { ${tmpltVals.name}Controller } from './${tmpltVals.lowercaseName}.controller';
    import { ${tmpltVals.name} } from './entities/${tmpltVals.lowercaseName}.model';    
    `;

    let mongooseHdrStr = `import { MongooseModule } from '@nestjs/mongoose';
    import { ${tmpltVals.name}Schema } from './entities/${tmpltVals.lowercaseName}.schema';
    import { ${tmpltVals.name}Repository } from './${tmpltVals.lowercaseName}.repository';
    `;

    let graphQLHdrStr = `import { ${tmpltVals.name}Resolver } from './${tmpltVals.lowercaseName}.resolver';
    `;

    finalStr = baseHeaderStr;

    if( bitMask & 1) {
        finalStr = finalStr + mongooseHdrStr;
    }

    return finalStr;
}
