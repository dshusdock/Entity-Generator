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
        const file = new Blob([moduleTmplt()], { type: "text/plain" });
        return file;

    }

}

function moduleTmplt() {
    return `import { Module } from '@nestjs/common';
    import { MongooseModule } from '@nestjs/mongoose';
    import { ${tmpltVals.name} } from './models/${tmpltVals.lowercaseName}.model';
    import { ${tmpltVals.name}Schema } from './models/${tmpltVals.lowercaseName}.schema';
    import { ${tmpltVals.name}sRepository } from './${tmpltVals.lowercaseName}s.repository';
    import { ${tmpltVals.name}sResolver } from './${tmpltVals.lowercaseName}s.resolver';
    import { ${tmpltVals.name}sService } from './${tmpltVals.lowercaseName}s.service';
    
    @Module({
      imports: [
        MongooseModule.forFeature([{ name: ${tmpltVals.name}.name, schema: ${tmpltVals.name}Schema }]),
      ],
      providers: [${tmpltVals.name}sResolver, ${tmpltVals.name}sService, ${tmpltVals.name}sRepository],
      exports: [${tmpltVals.name}sService],
    })
    export class ${tmpltVals.name}sModule {}
    `;
}